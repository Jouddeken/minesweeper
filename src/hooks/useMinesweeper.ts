import { useCallback, useState } from 'react';
import { BoardState, GameState, GameStatus } from '../domain/minesweeper';
import {
  calculateAdjacentMines,
  checkWinCondition,
  createBoard,
  placeMines,
  revealAdjacentCells,
} from '../utils/minesweeper';

export type UseMinesweeperProps = {
  rows?: number;
  columns?: number;
  mines?: number;
  debug?: boolean;
};

export type UseMinesweeperReturn = GameState & {
  revealCell: (rowIndex: number, columnIndex: number) => void;
  flagCell: (rowIndex: number, columnIndex: number) => void;
  reset: () => void;
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
): UseMinesweeperReturn => {
  const [status, setStatus] = useState<GameStatus>(GameStatus.Playing);

  const [board, setBoard] = useState<BoardState>(() => {
    const initialBoard = createBoard(rows, columns, debug);
    const boardWithMines = placeMines(initialBoard, mines);
    const boardWithAdjacentMines = calculateAdjacentMines(boardWithMines);

    return boardWithAdjacentMines;
  });

  const revealCell = useCallback(
    (rowIndex: number, columnIndex: number) => {
      // If the game is not in the playing state or the cell is flagged, do nothing
      if (status !== GameStatus.Playing || board[rowIndex][columnIndex].isFlagged) {
        return;
      }

      setBoard((prevBoard) => {
        // Create a new board to avoid mutating the state directly
        const newBoard = prevBoard.map((row) => row.map((cell) => ({ ...cell })));
        const cell = newBoard[rowIndex][columnIndex];

        // Reveal the mine and end the game if a mine is clicked
        if (cell.isMine) {
          cell.isRevealed = true;
          setStatus(GameStatus.Lost);
        } else {
          cell.isRevealed = true;

          // Recursively reveal adjacent cells if the revealed cell has no adjacent mines
          if (cell.adjacentMines === 0) {
            revealAdjacentCells(newBoard, rowIndex, columnIndex);
          }

          // Check if the player has won after revealing the cell
          if (checkWinCondition(newBoard)) {
            setStatus(GameStatus.Won);
          }
        }

        return newBoard;
      });
    },
    [status, board],
  );

  const flagCell = useCallback(
    (rowIndex: number, columnIndex: number) => {
      // If the game is not in the playing state or the cell is already revealed, do nothing
      if (status !== GameStatus.Playing || board[rowIndex][columnIndex].isRevealed) {
        return;
      }

      setBoard((prevBoard) => {
        // Create a new board to avoid mutating the state directly
        const newBoard = prevBoard.map((row) => row.map((cell) => ({ ...cell })));
        const cell = newBoard[rowIndex][columnIndex];

        // Toggle the flagged state of the cell if it's not revealed
        if (!cell.isRevealed) {
          cell.isFlagged = !cell.isFlagged;
        }

        // Check if the player has won after flagging the cell
        if (checkWinCondition(newBoard)) {
          setStatus(GameStatus.Won);
        }

        return newBoard;
      });
    },
    [status, board],
  );

  const reset = () => {
    const initialBoard = createBoard(rows, columns, debug);
    const boardWithMines = placeMines(initialBoard, mines);
    const boardWithAdjacentMines = calculateAdjacentMines(boardWithMines);

    setBoard(boardWithAdjacentMines);
    setStatus(GameStatus.Playing);
  };

  return {
    board,
    status,
    rows,
    columns,
    mines,
    revealCell,
    flagCell,
    reset,
  };
};
