
import { Direction, Coordinate } from './types';

export const BOARD_SIZE: number = 20;
export const INITIAL_SPEED_MS: number = 200;
export const SPEED_INCREMENT: number = 5;
export const MAX_SPEED_MS: number = 80;


export const INITIAL_SNAKE_POSITION: Coordinate[] = [
  { x: Math.floor(BOARD_SIZE / 2), y: Math.floor(BOARD_SIZE / 2) },
  { x: Math.floor(BOARD_SIZE / 2) - 1, y: Math.floor(BOARD_SIZE / 2) },
  { x: Math.floor(BOARD_SIZE / 2) - 2, y: Math.floor(BOARD_SIZE / 2) },
];

export const INITIAL_DIRECTION: Direction = Direction.RIGHT;
