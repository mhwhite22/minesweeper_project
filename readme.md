/*
Minesweeper Project
Marshal White

0. The game begins with a rectangular board of blank or 'covered' squares.

1.0 To begin the game, render the board
  1.1 Randomly generate locations of mines on X percentage of board squares.
  1.2 Create a nested array of numbers for rows/squares of the board.  If one or more mines are located in an adjacent square, the number will reflect the number of adjacent mines.

2.0 Handling Square Clicks
  2.1 If a square has a number, uncover it.
  2.2 if a square holds a mine, game over.
  2.3 May try to create a condition where the first click is always safe.

3.0 Flagging
  3.1 A player may right click on a square to place a flag (or change to a third color) if they believe the square contains a mine.

4.0 Win condition: no remaining uncovered squares which do not hold a mine.

5.0 Game over - if a player clicks on a mine, all mines uncover.  Game over message.

6.0 Timer - counting timer displayed above board.

7.0 Replay Button - reset board.