import { useMinesweeper } from '../../hooks/useMinesweeper';
import { Board } from '../Board';
import styles from './Game.module.css';

export const Game = () => {
  const { board } = useMinesweeper({ debug: true });

  return (
    <div className={styles.game}>
      <Board board={board} />
    </div>
  );
};
