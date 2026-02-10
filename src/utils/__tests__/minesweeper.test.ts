import {
  createBoard,
  placeMines,
  checkIsCellWithinBoard,
  calculateAdjacentMines,
  checkWinCondition,
  revealAdjacentCells,
} from '../minesweeper';

describe('Minesweeper Utils', () => {
  describe('createBoard', () => {
    test('should create a board with the specified dimensions', () => {
      const rows = 5;
      const columns = 5;
      const board = createBoard(rows, columns);

      expect(board.length).toBe(rows);
      expect(board[0].length).toBe(columns);
    });

    test('should initialize all cells with default properties', () => {
      const board = createBoard(3, 3);

      for (let row of board) {
        for (let cell of row) {
          expect(cell).toEqual({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            adjacentMines: 0,
          });
        }
      }
    });

    test('should create a board with all cells revealed when debug is true', () => {
      const board = createBoard(3, 3, true);

      for (let row of board) {
        for (let cell of row) {
          expect(cell.isRevealed).toBe(true);
        }
      }
    });
  });

  describe('placeMines', () => {
    test('should place the specified number of mines on the board', () => {
      const rows = 4;
      const columns = 4;
      const totalMines = 5;
      const board = createBoard(rows, columns);
      const boardWithMines = placeMines(board, totalMines);

      let mineCount = 0;
      for (let row of boardWithMines) {
        for (let cell of row) {
          if (cell.isMine) {
            mineCount++;
          }
        }
      }

      expect(mineCount).toBe(totalMines);
    });

    test('should not place more mines than available cells', () => {
      const rows = 2;
      const columns = 2;
      const totalMines = 5; // More mines than cells
      const board = createBoard(rows, columns);

      expect(() => placeMines(board, totalMines)).toThrowError(
        `Cannot place ${totalMines} mines on a board with only ${rows * columns} cells.`,
      );
    });
  });

  describe('checkIsCellWithinBoard', () => {
    test('should return true for valid cell coordinates', () => {
      const board = createBoard(3, 3);
      const rows = board.length;
      const columns = board[0].length;

      expect(checkIsCellWithinBoard(rows, columns, 0, 0)).toBe(true);
      expect(checkIsCellWithinBoard(rows, columns, 2, 2)).toBe(true);
    });

    test('should return false for out-of-bounds cell coordinates', () => {
      const board = createBoard(3, 3);
      const rows = board.length;
      const columns = board[0].length;

      expect(checkIsCellWithinBoard(rows, columns, -1, 0)).toBe(false);
      expect(checkIsCellWithinBoard(rows, columns, 0, -1)).toBe(false);
      expect(checkIsCellWithinBoard(rows, columns, 3, 0)).toBe(false);
      expect(checkIsCellWithinBoard(rows, columns, 0, 3)).toBe(false);
    });
  });

  describe('calculateAdjacentMines', () => {
    test('should correctly calculate the number of adjacent mines for each cell', () => {
      const board = createBoard(3, 3);
      board[0][0].isMine = true;
      board[1][1].isMine = true;

      /**
       * Configuration of the board:
       * Row 0: M 2 1
       * Row 1: 2 M 1
       * Row 2: 1 1 1
       */

      const boardWithAdjacentMines = calculateAdjacentMines(board);

      // Row 0
      expect(boardWithAdjacentMines[0][0].adjacentMines).toBe(0); // Mine, not calculated
      expect(boardWithAdjacentMines[0][1].adjacentMines).toBe(2);
      expect(boardWithAdjacentMines[0][2].adjacentMines).toBe(1);

      // Row 1
      expect(boardWithAdjacentMines[1][0].adjacentMines).toBe(2);
      expect(boardWithAdjacentMines[1][1].adjacentMines).toBe(0); // Mine, not calculated
      expect(boardWithAdjacentMines[1][2].adjacentMines).toBe(1);

      // Row 2
      expect(boardWithAdjacentMines[2][0].adjacentMines).toBe(1);
      expect(boardWithAdjacentMines[2][1].adjacentMines).toBe(1);
      expect(boardWithAdjacentMines[2][2].adjacentMines).toBe(1);
    });
  });

  describe('checkWinCondition', () => {
    test('should return true when all non-mine cells are revealed and all mine cells are flagged', () => {
      const board = createBoard(2, 2);
      board[0][0].isMine = true;
      board[0][1].isRevealed = true;
      board[1][0].isRevealed = true;
      board[1][1].isRevealed = true;
      board[0][0].isFlagged = true;

      expect(checkWinCondition(board)).toBe(true);
    });

    test('should return false when there are non-mine cells that are not revealed', () => {
      const board = createBoard(2, 2);
      board[0][0].isMine = true;
      board[0][1].isRevealed = false; // Not revealed
      board[1][0].isRevealed = true;
      board[1][1].isRevealed = true;
      board[0][0].isFlagged = true;

      expect(checkWinCondition(board)).toBe(false);
    });

    test('should return false when there are mine cells that are not flagged', () => {
      const board = createBoard(2, 2);

      // Mine cell is not flagged
      board[0][0].isMine = true;
      board[0][1].isRevealed = true;
      board[1][0].isRevealed = true;
      board[1][1].isRevealed = true;

      expect(checkWinCondition(board)).toBe(false);
    });
  });

  describe('revealAdjacentCells', () => {
    test('should reveal adjacent cells recursively when a cell with 0 adjacent mines is revealed', () => {
      const board = createBoard(3, 3);
      board[0][0].isMine = true;
      board[0][1].adjacentMines = 1;
      board[1][0].adjacentMines = 1;

      /**
       * Configuration of the board:
       * Row 0: M 1 0
       * Row 1: 1 1 0
       * Row 2: 0 0 0
       */

      revealAdjacentCells(board, 2, 2);

      // All cells except the mine should be revealed
      expect(board[0][0].isRevealed).toBe(false); // Mine, should not be revealed
      expect(board[0][1].isRevealed).toBe(true);
      expect(board[0][2].isRevealed).toBe(true);
      expect(board[1][0].isRevealed).toBe(true);
      expect(board[1][1].isRevealed).toBe(true);
      expect(board[1][2].isRevealed).toBe(true);
      expect(board[2][0].isRevealed).toBe(true);
      expect(board[2][1].isRevealed).toBe(true);
      expect(board[2][2].isRevealed).toBe(true);
    });
  });
});
