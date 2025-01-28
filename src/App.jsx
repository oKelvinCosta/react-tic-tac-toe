import { useState } from "react";

// You’ll need to create a way for the Square to update the Board’s
// state. Since state is private to a component that defines it,
//  you cannot update the Board’s state directly from Square.
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Componente principal
function Board({ xIsNext, squares, onPlay }) {
  
  function handleClick(index) {
    if(squares[index] || calculateWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();
    if (xIsNext) {
      newSquares[index] = "X";
    } else {
      newSquares[index] = "O";
    }
    onPlay(newSquares);

  }

  const winner = calculateWinner(squares);
  let status;
  if(winner) {
    status = `Winner: ${winner}`;
  }else{
    status = `Next player: ${xIsNext ? "X" : "O"}`;
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

export default function Game() {

  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {

    // Destructuring
    // const a = lines[i][0];
    // const b = lines[i][1];
    // const c = lines[i][2];

    // explanation: 
    // const [a, b, c] = [0, 1, 2] => a = 0, b = 1, c = 2
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}