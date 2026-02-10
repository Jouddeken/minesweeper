import { checkIsPlaying, checkIsWon, checkIsLost } from '../minesweeper';

describe('Minesweeper Game Status Utils', () => {
  test('checkIsPlaying should return true for playing status', () => {
    expect(checkIsPlaying('playing')).toBe(true);
    expect(checkIsPlaying('won')).toBe(false);
    expect(checkIsPlaying('lost')).toBe(false);
  });

  test('checkIsWon should return true for won status', () => {
    expect(checkIsWon('won')).toBe(true);
    expect(checkIsWon('playing')).toBe(false);
    expect(checkIsWon('lost')).toBe(false);
  });

  test('checkIsLost should return true for lost status', () => {
    expect(checkIsLost('lost')).toBe(true);
    expect(checkIsLost('playing')).toBe(false);
    expect(checkIsLost('won')).toBe(false);
  });
});
