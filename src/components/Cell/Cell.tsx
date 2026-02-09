import { CellState } from '../../domain/minesweeper';
import styles from './Cell.module.css';

export type CellProps = {
  cell: CellState;
};

export const Cell = ({ cell }: CellProps) => {
  return (
    <div
      className={`${styles.cell} ${cell.isRevealed ? `${styles[`number-${cell.adjacentMines}`] || ''}` : ''}`}
    >
      {cell.isRevealed
        ? cell.isMine
          ? '💣'
          : cell.adjacentMines > 0
            ? cell.adjacentMines
            : ''
        : ''}
    </div>
  );
};
