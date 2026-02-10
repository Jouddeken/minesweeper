import { act } from 'react';
import { useMinesweeper, UseMinesweeperProps } from '../useMinesweeper';
import { renderHook as renderHookBase } from '@testing-library/react';

const renderHook = (props: Partial<UseMinesweeperProps>) =>
  renderHookBase(() => useMinesweeper(props));

describe('useMinesweeper', () => {
  test('should initialize the game state with the correct board dimensions and number of mines', () => {
    const { result } = renderHook({ rows: 5, columns: 5, mines: 5 });

    expect(result.current).toBeDefined();
    expect(result.current).toStrictEqual({
      board: expect.any(Array),
      columns: 5,
      mines: 5,
      rows: 5,
      status: 'playing',
      flagCell: expect.any(Function),
      revealCell: expect.any(Function),
      reset: expect.any(Function),
    });
  });

  test('should handle flagging a cell correctly', () => {
    const { result } = renderHook({ rows: 3, columns: 3, mines: 1 });

    // Flag the cell at (0, 0)
    act(() => {
      result.current.flagCell(0, 0);
    });

    expect(result.current.board[0][0].isFlagged).toBe(true);

    // Unflag the cell at (0, 0)
    act(() => {
      result.current.flagCell(0, 0);
    });

    expect(result.current.board[0][0].isFlagged).toBe(false);
  });

  test('should handle revealing a cell correctly', () => {
    const { result } = renderHook({ rows: 3, columns: 3, mines: 1 });
    // Reveal the cell at (0, 0)
    act(() => {
      result.current.revealCell(0, 0);
    });

    expect(result.current.board[0][0].isRevealed).toBe(true);
  });

  test('should reset the game state correctly', () => {
    const { result } = renderHook({ rows: 3, columns: 3, mines: 1 });

    // Reveal a cell and then reset the game
    act(() => {
      result.current.revealCell(0, 0);
    });

    expect(result.current.board[0][0].isRevealed).toBe(true);

    act(() => {
      result.current.reset();
    });

    expect(result.current.board[0][0].isRevealed).toBe(false);
    expect(result.current.status).toBe('playing');
  });
});
