import { checkIsLost, checkIsPlaying, checkIsWon } from '../../domain/minesweeper';
import { useMinesweeper } from '../../hooks/useMinesweeper';
import { Board } from '../Board';
import styles from './Game.module.css';

export const Game = () => {
  const { board, status, revealCell, flagCell, reset } = useMinesweeper();

  return (
    <div className={styles.game}>
      {checkIsPlaying(status) && <div className={styles.status}>Game in progress... 🙈</div>}
      {checkIsWon(status) && <div className={styles.status}>You won! 🎉</div>}
      {checkIsLost(status) && <div className={styles.status}>You lost! 💥</div>}
      <Board board={board} onReveal={revealCell} onFlag={flagCell} />
      <button className={styles.resetButton} onClick={reset}>
        Reset Game
      </button>
    </div>
  );
};
