import { screen, render } from '@testing-library/react';
import { Cell, CellProps } from './Cell';

const renderComponent = (props: Partial<CellProps> = {}) => {
  const defaultProps: CellProps = {
    cell: {
      isRevealed: false,
      isFlagged: false,
      isMine: false,
      adjacentMines: 0,
    },
    onClick: vi.fn(),
    onRightClick: vi.fn(),
  };

  const combinedProps = { ...defaultProps, ...props };

  const utils = render(<Cell {...combinedProps} />);

  return {
    ...utils,
    cell: screen.getByTestId('cell'),
    props: combinedProps,
  };
};

describe('Cell component', () => {
  it('renders a hidden cell', () => {
    const { cell } = renderComponent();

    expect(cell).toHaveTextContent('');
  });

  it('renders a flagged cell', () => {
    const { cell } = renderComponent({
      cell: {
        isRevealed: false,
        isFlagged: true,
        isMine: false,
        adjacentMines: 0,
      },
    });

    expect(cell).toHaveTextContent('🚩');
  });

  it('renders a revealed mine cell', () => {
    const { cell } = renderComponent({
      cell: {
        isRevealed: true,
        isFlagged: false,
        isMine: true,
        adjacentMines: 0,
      },
    });

    expect(cell).toHaveTextContent('💣');
  });

  it('renders a revealed cell with adjacent mines', () => {
    const { cell } = renderComponent({
      cell: {
        isRevealed: true,
        isFlagged: false,
        isMine: false,
        adjacentMines: 3,
      },
    });

    expect(cell).toHaveTextContent('3');
  });

  it('renders a revealed cell with no adjacent mines', () => {
    const { cell } = renderComponent({
      cell: {
        isRevealed: true,
        isFlagged: false,
        isMine: false,
        adjacentMines: 0,
      },
    });

    expect(cell).toHaveTextContent('');
  });
});
