export type CellState = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

export type BoardState = CellState[][];

export const GameStatus = {
  Playing: 'playing',
  Won: 'won',
  Lost: 'lost',
} as const;

export type GameStatus = (typeof GameStatus)[keyof typeof GameStatus];

export type GameState = {
  board: BoardState;
  status: GameStatus;
  rows: number;
  columns: number;
  mines: number;
};

export const checkIsPlaying = (status: GameStatus) => status === GameStatus.Playing;
export const checkIsWon = (status: GameStatus) => status === GameStatus.Won;
export const checkIsLost = (status: GameStatus) => status === GameStatus.Lost;
