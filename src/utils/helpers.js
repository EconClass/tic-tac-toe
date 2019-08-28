
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

export {
  calculateWinner,
}