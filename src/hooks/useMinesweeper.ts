import { BoardState, GameState } from '../domain/minesweeper';

/**
 * Utility function to create a new Minesweeper board with the specified dimensions.
 *
 * @param rows {number} number of rows of the board
 * @param columns {number} number of columns of the board
 * @returns an initialized board with the given dimensions, where each cell is an object containing
 * properties to track its state (isMine, isRevealed, isFlagged, adjacentMines).
 */
const createBoard = (rows: number, columns: number, debug: boolean = false): BoardState => {
  const board: BoardState = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({
      isMine: false,
      isRevealed: debug ? true : false,
      isFlagged: false,
      adjacentMines: 0,
    })),
  );

  return board;
};

/**
 * Utility function to randomly place mines on the board. It takes the initialized board and the
 * total number of mines to be placed as arguments. The function uses a while loop to keep placing
 * mines until the desired number of mines is reached, ensuring that mines are not placed on the
 * same cell more than once.
 *
 * @param board {BoardState} the initialized board on which mines will be placed
 * @param totalMines {number} the total number of mines to be placed on the board
 * @returns the board with mines placed randomly according to the specified total number of mines.
 */
const placeMines = (board: BoardState, totalMines: number): BoardState => {
  let placedMines = 0;
  const maxMines = board.length * board[0].length;

  if (totalMines > maxMines) {
    throw new Error(`Cannot place ${totalMines} mines on a board with only ${maxMines} cells.`);
  }

  while (placedMines < totalMines) {
    const row = Math.floor(Math.random() * board.length);
    const col = Math.floor(Math.random() * board[0].length);

    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      placedMines++;
    }
  }

  return board;
};

/**
 * Utility function to check if a given cell's coordinates are within the bounds of the board. This
 * is important to prevent out-of-bounds errors when checking adjacent cells for mines. The function
 * takes the total number of rows and columns of the board, as well as the row and column indices of
 * the cell being checked, and returns a boolean indicating whether the cell is within the board its
 * limits.
 *
 * @param rows {number} number of rows of the board
 * @param columns {number} number of columns of the board
 * @param rowIndex {number} row index of the cell being checked
 * @param columnIndex {number} column index of the cell being checked
 * @returns boolean indicating whether the cell is within the board's limits
 */
const checkIsCellWithinBoard = (
  rows: number,
  columns: number,
  rowIndex: number,
  columnIndex: number,
): boolean => rowIndex >= 0 && rowIndex < rows && columnIndex >= 0 && columnIndex < columns;

/**
 * Utility function to calculate the number of adjacent mines for each cell on the board. It
 * iterates through each cell of the board and, for cells that are not mines, it checks all 8
 * possible adjacent positions (top-left, top, top-right, left, right, bottom-left, bottom,
 * bottom-right) to count how many of those positions contain mines. The function uses the
 * checkIsCellWithinBoard utility to ensure that it does not go out of bounds when checking adjacent
 * cells. The calculated number of adjacent mines is then stored in the adjacentMines property of
 * each cell.
 *
 * @param board {BoardState} the board on which to calculate adjacent mines for each cell
 * @returns the board with the adjacentMines property updated for each cell based on the number of
 * mines in adjacent cells.
 */
const calculateAdjacentMines = (board: BoardState): BoardState => {
  const rows = board.length;
  const columns = board[0].length;

  const directions = [
    [-1, -1], // top-left
    [-1, 0], // top
    [-1, 1], // top-right
    [0, -1], // left
    [0, 1], // right
    [1, -1], // bottom-left
    [1, 0], // bottom
    [1, 1], // bottom-right
  ];

  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < board[0].length; columnIndex++) {
      const cell = board[rowIndex][columnIndex];

      // Skip counting adjacent mines for cells that are mines themselves
      if (cell.isMine) {
        continue;
      }

      let adjacentMines = 0;

      directions.forEach(([rowOffset, columnOffset]) => {
        const adjacentRow = rowIndex + rowOffset;
        const adjacentColumn = columnIndex + columnOffset;
        const { isMine } = board[adjacentRow]?.[adjacentColumn] || {};

        if (checkIsCellWithinBoard(rows, columns, adjacentRow, adjacentColumn) && isMine) {
          adjacentMines++;
        }
      });

      cell.adjacentMines = adjacentMines;
    }
  }

  return board;
};

export type UseMinesweeperProps = {
  rows?: number;
  columns?: number;
  mines?: number;
  debug?: boolean;
};

/**
 * Hook to initialize the Minesweeper game state. It creates the board, places mines, and calculates
 * adjacent mines based on the provided dimensions and number of mines. The hook returns the
 * initialized game state, which includes the board and its dimensions.
 *
 * @param props {UseMinesweeperProps} optional parameters to customize the board dimensions and
 * number of mines. If not provided, it defaults to a 10x10 board with 20 mines.
 * @returns the initialized game state, including the board and its dimensions.
 */
export const useMinesweeper = (
  { rows = 10, columns = 10, mines = 20, debug = false }: UseMinesweeperProps = {
    rows: 10,
    columns: 10,
    mines: 20,
    debug: false,
  },
): GameState => {
  const initialBoard = createBoard(rows, columns, debug);
  const boardWithMines = placeMines(initialBoard, mines);
  const boardWithAdjacentMines = calculateAdjacentMines(boardWithMines);

  return {
    board: boardWithAdjacentMines,
    rows,
    columns,
    mines,
  };
};
