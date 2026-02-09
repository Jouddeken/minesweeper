import { BoardState } from '../../domain/minesweeper';
import { Cell } from '../Cell';
import styles from './Board.module.css';

export type BoardProps = {
  board: BoardState;
  onReveal: (rowIndex: number, columnIndex: number) => void;
  onFlag: (rowIndex: number, columnIndex: number) => void;
};

export const Board = ({ board, onReveal, onFlag }: BoardProps) => {
  return (
    <div className={styles.board}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((cell, columnIndex) => (
            <Cell
              cell={cell}
              onClick={() => onReveal(rowIndex, columnIndex)}
              onRightClick={() => onFlag(rowIndex, columnIndex)}
              key={columnIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
