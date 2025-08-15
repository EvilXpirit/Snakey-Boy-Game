import { useState, useEffect, useReducer, useCallback } from 'react';
import { Direction, Coordinate, GameState } from '../types';
import {
  BOARD_SIZE,
  INITIAL_DIRECTION,
  INITIAL_SNAKE_POSITION,
  INITIAL_SPEED_MS,
  SPEED_INCREMENT,
  MAX_SPEED_MS,
} from '../constants';

type GameAction =
  | { type: 'MOVE_SNAKE' }
  | { type: 'CHANGE_DIRECTION'; payload: Direction }
  | { type: 'GAME_OVER' }
  | { type: 'RESTART' }
  | { type: 'EAT_FOOD' };

const createInitialState = (): GameState => ({
  snake: INITIAL_SNAKE_POSITION,
  food: generateRandomFood(INITIAL_SNAKE_POSITION),
  direction: INITIAL_DIRECTION,
  score: 0,
  isGameOver: false,
  speed: INITIAL_SPEED_MS,
});

function generateRandomFood(snake: Coordinate[]): Coordinate {
  let newFoodPosition: Coordinate;
  do {
    newFoodPosition = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (snake.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y));
  return newFoodPosition;
}

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'MOVE_SNAKE': {
      const newSnake = [...state.snake];
      const head = { ...newSnake[0] };

      switch (state.direction) {
        case Direction.UP: head.y -= 1; break;
        case Direction.DOWN: head.y += 1; break;
        case Direction.LEFT: head.x -= 1; break;
        case Direction.RIGHT: head.x += 1; break;
      }

      newSnake.unshift(head);

      // Wall collision check
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        return { ...state, isGameOver: true };
      }

      // Self collision check
      for (let i = 1; i < newSnake.length; i++) {
        if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
          return { ...state, isGameOver: true };
        }
      }
      
      const ateFood = head.x === state.food.x && head.y === state.food.y;
      if (!ateFood) {
        newSnake.pop();
      }

      return { ...state, snake: newSnake };
    }
    case 'CHANGE_DIRECTION': {
        const { direction } = state;
        if (
            (action.payload === Direction.UP && direction === Direction.DOWN) ||
            (action.payload === Direction.DOWN && direction === Direction.UP) ||
            (action.payload === Direction.LEFT && direction === Direction.RIGHT) ||
            (action.payload === Direction.RIGHT && direction === Direction.LEFT)
        ) {
            return state;
        }
        return { ...state, direction: action.payload };
    }
    case 'EAT_FOOD': {
        const newScore = state.score + 10;
        const newSpeed = Math.max(MAX_SPEED_MS, state.speed - SPEED_INCREMENT);
        return {
            ...state,
            food: generateRandomFood(state.snake),
            score: newScore,
            speed: newSpeed,
        };
    }
    case 'GAME_OVER':
      return { ...state, isGameOver: true };
    case 'RESTART':
      return createInitialState();
    default:
      return state;
  }
};

export const useGameLogic = () => {
  const [gameState, dispatch] = useReducer(gameReducer, createInitialState());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const togglePause = useCallback(() => {
    if (isPlaying && !gameState.isGameOver) {
      setIsPaused(prev => !prev);
    }
  }, [isPlaying, gameState.isGameOver]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    let newDirection: Direction | null = null;
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        newDirection = Direction.UP;
        break;
      case 'ArrowDown':
      case 's':
        newDirection = Direction.DOWN;
        break;
      case 'ArrowLeft':
      case 'a':
        newDirection = Direction.LEFT;
        break;
      case 'ArrowRight':
      case 'd':
        newDirection = Direction.RIGHT;
        break;
      case ' ':
      case 'p':
        togglePause();
        break;
    }
    if (newDirection !== null) {
      e.preventDefault();
      if (isPaused) setIsPaused(false);
      dispatch({ type: 'CHANGE_DIRECTION', payload: newDirection });
    } else if (e.key === ' ' || e.key === 'p') {
      e.preventDefault();
    }
  }, [togglePause, isPaused]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (!isPlaying || gameState.isGameOver || isPaused) {
      return;
    }

    const gameInterval = setInterval(() => {
      dispatch({ type: 'MOVE_SNAKE' });
    }, gameState.speed);

    return () => clearInterval(gameInterval);
  }, [isPlaying, gameState.isGameOver, gameState.speed, gameState.snake, isPaused]);

  useEffect(() => {
    const head = gameState.snake[0];
    if (head.x === gameState.food.x && head.y === gameState.food.y) {
      dispatch({ type: 'EAT_FOOD' });
    }
  }, [gameState.snake, gameState.food]);

  const startGame = () => {
    setIsPlaying(true);
    setIsPaused(false);
    if (gameState.isGameOver) {
        dispatch({ type: 'RESTART' });
    }
  };

  const restartGame = () => {
    dispatch({ type: 'RESTART' });
    setIsPaused(false);
    setIsPlaying(true);
  };

  return { gameState, isPlaying, isPaused, startGame, restartGame, togglePause };
};
