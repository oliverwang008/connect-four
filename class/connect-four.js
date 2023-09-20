const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    Screen.addCommand('up', 'cursor up', this.cursor.up.bind(this.cursor));
    Screen.addCommand('down', 'cursor down', this.cursor.down.bind(this.cursor));
    Screen.addCommand('left', 'cursor left', this.cursor.left.bind(this.cursor));
    Screen.addCommand('right', 'cursor right', this.cursor.right.bind(this.cursor));
    Screen.addCommand('return', 'place move', this.placeMove.bind(this));

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  placeMove() {
    let r = this.cursor.row;
    let c = this.cursor.col;
    if (this.grid[r][c] === ' ') {
      if (this.playerTurn === 'O') {
        this.grid[r][c] = 'O';
        this.playerTurn = 'X';
        Screen.setGrid(r, c, 'O');
        Screen.render();
      } else {
        this.grid[r][c] = 'X';
        this.playerTurn = 'O'
        Screen.setGrid(r, c, 'X');
        Screen.render();
      }
    }
    let winner = ConnectFour.checkWin(this.grid);
    if (winner) {
      ConnectFour.endGame(winner);
    }

  };

  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (grid[r][c] === 'X' && grid[r][c + 1] === 'X' && grid[r][c + 2] === 'X' && grid[r][c + 3] === 'X') {
          return 'X';
        }
        if (grid[r][c] === 'O' && grid[r][c + 1] === 'O' && grid[r][c + 2] === 'O' && grid[r][c + 3] === 'O') {
          return 'O';
        }
      }
    }
    for (let c = 0; c < 7; c++) {
      for (let r = 0; r < 3; r++) {
        if (grid[r][c] === 'X' && grid[r + 1][c] === 'X' && grid[r + 2][c] === 'X' && grid[r + 3][c] === 'X') {
          return 'X';
        }
        if (grid[r][c] === 'O' && grid[r + 1][c] === 'O' && grid[r + 2][c] === 'O' && grid[r + 3][c] === 'O') {
          return 'O';
        }
      }
    }
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        if (grid[r][c] === 'X' && grid[r + 1][c + 1] === 'X' && grid[r + 2][c + 2] === 'X' && grid[r + 3][c + 3] === 'X') {
          return 'X';
        }
        if (grid[r][c] === 'O' && grid[r + 1][c + 1] === 'O' && grid[r + 2][c + 2] === 'O' && grid[r + 3][c + 3] === 'O') {
          return 'O';
        }
      }
    }
    for (let r = 0; r < 3; r++) {
      for (let c = 3; c < 7; c++) {
        if (grid[r][c] === 'X' && grid[r + 1][c - 1] === 'X' && grid[r + 2][c - 2] === 'X' && grid[r + 3][c - 3] === 'X') {
          return 'X';
        }
        if (grid[r][c] === 'O' && grid[r + 1][c - 1] === 'O' && grid[r + 2][c - 2] === 'O' && grid[r + 3][c - 3] === 'O') {
          return 'O';
        }
      }
    }
    
    let tie = true;
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        if (grid[r][c] === ' ') {
          tie = false;
        }
      }
    }
    if (tie) {
      return 'T';
    } else {
      return false;
    }

  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;
