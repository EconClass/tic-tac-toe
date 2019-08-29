import React, { Component } from "react";
import Board from "./Board.js";
import { calculateWinner, setStatus } from "./utils/helpers.js";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  };

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1]
    const squares = current.squares.slice();

    // Break when there's a winner or,
    // if the square already has something
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // Put an X or O in the square based on current player 
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1]
    const winner = calculateWinner(current.squares);

    const moves = history.map((_, move) => {
      const desc = move ?
        `Go to move ${move}` :
        "Go to start";
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    })

    const status = setStatus(winner, this.state);

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;