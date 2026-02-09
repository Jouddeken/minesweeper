import { BoardState } from '../../domain/minesweeper';
import { Cell } from '../Cell';
import styles from './Board.module.css';

export type BoardProps = {
  board: BoardState;
};

export const Board = ({ board }: BoardProps) => {
  return (
    <div className={styles.board}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((cell, columnIndex) => (
            <Cell cell={cell} key={columnIndex} />
          ))}
        </div>
      ))}
    </div>
  );
};
