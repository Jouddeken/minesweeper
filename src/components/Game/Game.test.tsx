import { screen, render } from '@testing-library/react';
import { Game } from './Game';

const renderComponent = () => {
  const utils = render(<Game />);

  return {
    ...utils,
    game: screen.getByTestId('game'),
  };
};

describe('Game component', () => {
  it('renders the game board', () => {
    const { game } = renderComponent();

    expect(game).toBeInTheDocument();
  });
});
