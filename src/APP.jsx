import { useState } from "react";

// You’ll need to create a way for the Square to update the Board’s
// state. Since state is private to a component that defines it,
//  you cannot update the Board’s state directly from Square.
function Square({ value, onSquareClick }) {
  // const [value, setValue] = useState(null);

  // function handleClick() {
  //   setValue('X');
  // }

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Componente principal
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  // Instead, you’ll pass down a function from the Board component to the Square component, and you’ll have Square call that function when a square is clicked.
  function handleClick(index) {
    const newSquares = squares.slice();
    newSquares[index] = "X";
    setSquares(newSquares);
  }

  return (
    <>
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
