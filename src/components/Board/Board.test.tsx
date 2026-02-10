import { screen, render } from '@testing-library/react';
import { Board, BoardProps } from './Board';

const renderComponent = (props: Partial<BoardProps> = {}) => {
  const defaultProps: BoardProps = {
    board: [],
    onReveal: vi.fn(),
    onFlag: vi.fn(),
  };

  const combinedProps = { ...defaultProps, ...props };

  const utils = render(<Board {...combinedProps} />);

  return {
    ...utils,
    board: screen.getByTestId('board'),
    rows: screen.getAllByTestId('row'),
    props: combinedProps,
  };
};

describe('Board component', () => {
  it('renders the board with the correct number of rows and columns', () => {
    const { board, rows } = renderComponent({
      board: [
        [
          { isRevealed: false, isFlagged: false, isMine: false, adjacentMines: 0 },
          { isRevealed: false, isFlagged: false, isMine: false, adjacentMines: 0 },
        ],
        [
          { isRevealed: false, isFlagged: false, isMine: false, adjacentMines: 0 },
          { isRevealed: false, isFlagged: false, isMine: false, adjacentMines: 0 },
        ],
      ],
    });

    expect(board).toBeInTheDocument();
    expect(rows).toHaveLength(2);

    rows.forEach((row) => {
      expect(row.children).toHaveLength(2);
    });
  });
});
