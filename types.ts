
export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export type Coordinate = {
  x: number;
  y: number;
};

export type GameState = {
  snake: Coordinate[];
  food: Coordinate;
  direction: Direction;
  score: number;
  isGameOver: boolean;
  speed: number;
};
