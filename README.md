# Minesweeper game

A short description taken from the minesweeper site:

“Minesweeper rules are very simple. The board is divided into cells, with mines randomly
distributed. To win, you need to open all the cells. The number on a cell shows the number of mines
adjacent to it. Using this information, you can determine cells that are safe, and cells that
contain mines. Cells suspected of being mines can be marked with a flag using the right mouse
button.”

## Prerequisites

- Node
- NPM

## Getting started

1. Run `npm install`
2. Run `npm run dev`

## Quick requirement notes

- A board with cells
- Random distributed mines
- Number in cell displaying adjacent mines
- Cells can be flagged as bomb
- The game is "won" when all the cells are opened or flagged correctly

## Reflective notes

I build this project in a way that is quite simple. A minewseeper game is basically a board with
cells that all have a coordinate. You can use these coordinates to determine wether or not more
cells should be opened when clicked, where the mines (bombs, since there was no mine emoji) are and
how many adjacent mines there are to a certain cell.

Most of the logic is split into small chunks of utility functions that are easily testable. The
logic is wrapped in a hook that handles the rest of the interaction. Again, this hook is quite
simple to test as you can see in its test file.

The core business logic of the minesweeper game can be found in a domain logic folder. This is where
the type definitions of the business logic are defined as well, they are used in the components,
hooks and utility functions again, but they live in a dedicated and centralized area.

The UI of this project is quite straight forward and really basic, for that reason I also did not
opt for a whole framework to solve the styling issues here, simple CSS modules are more than enough
already and work out of the box with Vite.

Some quick testing was done to at least reach 80% branch coverage. This was done using vitest, which
can also spit out the coverage to visually be looked at.
