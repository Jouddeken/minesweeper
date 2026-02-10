import { CellState } from '../../domain/minesweeper';
import styles from './Cell.module.css';

export type CellProps = {
  cell: CellState;
  onClick: () => void;
  onRightClick: () => void;
};

export const Cell = ({ cell, onClick, onRightClick }: CellProps) => {
  return (
    <div
      role="button"
      onClick={cell.isFlagged ? undefined : onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick();
      }}
      data-testid="cell"
      className={`${styles.cell} ${cell.isRevealed ? `${styles.revealed} ${styles[`number-${cell.adjacentMines}`] || ''}` : ''} ${cell.isFlagged ? styles.flagged : ''}`.trim()}
    >
      {cell.isFlagged
        ? '🚩'
        : cell.isRevealed
          ? cell.isMine
            ? '💣'
            : cell.adjacentMines > 0
              ? cell.adjacentMines
              : ''
          : ''}
    </div>
  );
};
