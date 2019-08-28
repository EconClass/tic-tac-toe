import React, { Component } from "react";
import Square from "./Square";

// This helper function decides the winner of the game
function calculateWinner(squares) {
  /**
   * This is a list of valid scenarios where a winner can be decided
   * Where each scenario contains indexes to check for values
   */
  const lines = [
    [0, 1, 2], // Smaller lists are the scenarios
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Loop through the list of scenarios
  for (let i = 0; i < lines.length; i++) {
    /**
     * Make sure that the items contained in the scenario's indexes
     * are the same, meaning that either three X's or O's are directly
     * next to each other on the tic-tac-toe board
     */
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return the winner if there is one
    }
  }
  return null; // Null if it's a tie
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  };

  handleClick(i) {
    const squares = this.state.squares.slice();

    // Break when there's a winner or,
    // if the square already has something
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // Put an X or O in the square based on current player 
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  };

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      const player = this.state.xIsNext ? "X" : "O";
      status = `Next player: ${player}`
    }



    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  };
};

export default Board;