import React from 'react';
import { Coordinate, Direction } from '../types';

interface GameBoardProps {
  boardSize: number;
  snake: Coordinate[];
  food: Coordinate;
  direction: Direction;
  speed: number;
}

const getEyeContainerRotation = (direction: Direction): string => {
  switch (direction) {
    case Direction.UP:
      return 'rotate(-90deg)';
    case Direction.DOWN:
      return 'rotate(90deg)';
    case Direction.LEFT:
      return 'rotate(180deg)';
    case Direction.RIGHT:
    default:
      return 'rotate(0deg)';
  }
};

export const GameBoard: React.FC<GameBoardProps> = ({ boardSize, snake, food, direction, speed }) => {
  return (
    <div
      className="relative bg-black/50 border-2 border-cyan-800/50"
      style={{
        width: 'clamp(300px, 90vw, 600px)',
        height: 'clamp(300px, 90vw, 600px)',
        boxShadow: 'inset 0 0 20px rgba(6, 182, 212, 0.3)',
        backgroundSize: `calc(100% / ${boardSize}) calc(100% / ${boardSize})`,
        backgroundImage: `
          linear-gradient(to right, rgba(22, 78, 99, 0.4) 0.5px, transparent 0.5px),
          linear-gradient(to bottom, rgba(22, 78, 99, 0.4) 0.5px, transparent 0.5px)
        `,
      }}
    >
      {snake.map((segment, index) => (
        <div
          key={index}
          className={`absolute rounded-full ${
            index === 0 ? 'bg-cyan-400 shadow-[0_0_8px_#06b6d4] z-10' : 'bg-cyan-600'
          }`}
          style={{
            width: `calc(100% / ${boardSize} - 2px)`,
            height: `calc(100% / ${boardSize} - 2px)`,
            left: `calc(${(segment.x / boardSize) * 100}% + 1px)`,
            top: `calc(${(segment.y / boardSize) * 100}% + 1px)`,
            transition: `left ${speed}ms linear, top ${speed}ms linear`,
          }}
        >
          {index === 0 && (
            <div
              className="w-full h-full flex items-center justify-end pr-[20%]"
              style={{
                transform: getEyeContainerRotation(direction),
                transition: 'transform 150ms ease-in-out',
              }}
            >
              <div className="flex w-1/2 justify-around">
                <div className="w-1/3 h-1/3 bg-gray-900 rounded-full"></div>
                <div className="w-1/3 h-1/3 bg-gray-900 rounded-full"></div>
              </div>
            </div>
          )}
        </div>
      ))}

      <div
        className="absolute bg-red-500 rounded-[2px] animate-pulse"
        style={{
          width: `calc(100% / ${boardSize} - 2px)`,
          height: `calc(100% / ${boardSize} - 2px)`,
          left: `calc(${(food.x / boardSize) * 100}% + 1px)`,
          top: `calc(${(food.y / boardSize) * 100}% + 1px)`,
          boxShadow: '0 0 10px #ef4444',
        }}
      />
    </div>
  );
};
