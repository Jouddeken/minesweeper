export type CellState = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

export type BoardState = CellState[][];

export type GameState = {
  board: BoardState;
  rows: number;
  columns: number;
  mines: number;
};
