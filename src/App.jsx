import { useState } from 'react';

/**
 * Renders a square button for the game board.
 *
 * Props:
 * - value: The current value ('X', 'O', or null) to display inside the button.
 * - onSquareClick: Function to handle click events on the square.
 */

function Square({ value, onSquareClick }) {
  // On click, the handleClick function manages the X or O value
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
 

// squares -> Array with the current values of the squares



/**
 * Renders the game board with nine squares, and keeps track of the game's
 * state.
 *
 * Props:
 * - xIsNext: Boolean indicating whether it's X's turn or O's turn.
 * - squares: Array with the current values of the squares.
 * - onPlay: Function to handle moves on the board.
 */

function Board({ xIsNext, squares, onPlay }) {

  // manages the X or O value
  function handleClick(i) {
    // If there is a winner or there is already a value in the square, do not change the value of the square, because nothing is executed
    if (calculateWinner(squares) || squares[i]) {
      return;
    }


    // Creates a new array with the value of the square changed to not overwrite the original array
    const nextSquares = squares.slice();
    // xIsNext represents which player will play
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  
  // Winner, if it is X or O
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

/**
 * Renders the main game component, managing the state of the game history
 * and current move. Provides functionality to handle player moves and
 * navigate through the game's history.
 *
 * State:
 * - history: Array tracking the sequence of board states after each move.
 * - currentMove: Integer representing the index of the current move in history.
 * 
 * Functions:
 * - handlePlay: Updates the game history and current move based on the
 *   provided board state after a move.
 * - jumpTo: Sets the current move to a specified move in the history.
 * 
 * The component renders the game board and a list of buttons to navigate
 * through the game history.
 */

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  // The history start as a empry array, so currentSquares is the first one like the history
  const currentSquares = history[currentMove];


  /**
   * Updates the game history and current move based on the
   * provided board state after a move.
   *
   * @param {Array} nextSquares - The new state of the board after the move.
   */
  function handlePlay(nextSquares) {

    // Adds the new state of the board to the history
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  /**
   * Sets the current move to a specified move in the history.
   * @param {Number} nextMove - The index of the move in the history to jump to.
   */
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  /**
   * Renders a list of buttons to navigate through the game history.
   * Each button represents a move in the game and calls the jumpTo function
   * with the corresponding move index.
   *
   * @returns {JSX.Element} A list of buttons representing the game history.
   */
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

/**
 * Determines the winner of a tic-tac-toe game.
 *
 * Takes an array representing the current state of the board squares.
 * Each element in the array corresponds to a square on the board and
 * can contain 'X', 'O', or null if the square is empty.
 *
 * The function checks all possible winning combinations on a 3x3 board
 * and returns 'X' or 'O' if there is a winner. If there is no winner,
 * the function returns null.
 *
 * @param {Array} squares - An array of 9 elements representing the board state.
 * @return {string|null} - Returns 'X', 'O', or null if there is no winner.
 */

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
