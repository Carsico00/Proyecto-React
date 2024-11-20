import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Square from "../components/Square";
import "./ConnectFour.css";

const ConnectFour = () => {
  const fichas = {
    Red: "🔴",
    Yellow: "🟡",
  };

  const [board, setBoard] = useState(() => {
    const savedBoard = localStorage.getItem("board");
    return savedBoard
      ? JSON.parse(savedBoard)
      : Array(6)
          .fill(null)
          .map(() => Array(7).fill(null));
  });

  const [currentPlayer, setCurrentPlayer] = useState(() => {
    const savedPlayer = localStorage.getItem("currentPlayer");
    return savedPlayer ? savedPlayer : fichas.Red;
  });

  const [winner, setWinner] = useState(() => {
    const savedWinner = localStorage.getItem("winner");
    return savedWinner ? savedWinner : null;
  });

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
    localStorage.setItem("currentPlayer", currentPlayer);
    localStorage.setItem("winner", winner);
  }, [board, currentPlayer, winner]);

  const handleClick = (colIndex) => {
    if (winner) return;

    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => row.slice());
      for (let rowIndex = newBoard.length - 1; rowIndex >= 0; rowIndex--) {
        if (newBoard[rowIndex][colIndex] === null) {
          newBoard[rowIndex][colIndex] = currentPlayer;
          if (checkWinner(newBoard, rowIndex, colIndex)) {
            setWinner(currentPlayer);
            alert(`Player ${currentPlayer} wins!`);
          } else {
            if (!newBoard.flat().includes(null)) {
              setWinner("Empate");
              alert("Es un empate!");
            }
          }
          break;
        }
      }
      return newBoard;
    });

    setCurrentPlayer((prevPlayer) =>
      prevPlayer === fichas.Red ? fichas.Yellow : fichas.Red
    );
  };

  const checkDirection = (board, x, y, dx, dy) => {
    let count = 0;
    let player = board[x][y];
    if (!player) return false;

    for (let i = -3; i <= 3; i++) {
      const nx = x + i * dx;
      const ny = y + i * dy;
      if (nx >= 0 && nx < 6 && ny >= 0 && ny < 7 && board[nx][ny] === player) {
        count++;
        if (count === 4) return true;
      } else {
        count = 0;
      }
    }
    return false;
  };

  const checkWinner = (board, x, y) => {
    const directions = [
      [0, 1], // Horizontal
      [1, 0], // Vertical
      [1, 1], // Diagonal derecha
      [1, -1], // Diagonal izquierda
    ];

    for (let [dx, dy] of directions) {
      if (checkDirection(board, x, y, dx, dy)) {
        return true;
      }
    }
    return false;
  };

  const resetGame = () => {
    const initialBoard = Array(6)
      .fill(null)
      .map(() => Array(7).fill(null));
    setBoard(initialBoard);
    setCurrentPlayer(fichas.Red);
    setWinner(null);
    localStorage.removeItem("board");
    localStorage.removeItem("currentPlayer");
    localStorage.removeItem("winner");
  };

  return (
    <>
      <h1>Connect Four</h1>
      <p>Current Player: {currentPlayer}</p>
      {winner && <p>Winner: {winner}</p>}
      {winner && <Confetti />}
      <main className="board">
        {board.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <Square
              key={`${rowIndex}-${colIndex}`}
              value={value}
              onClick={() => handleClick(colIndex)}
            />
          ))
        )}
      </main>
      <button
        style={{ padding: "10px", marginTop: "20px" }}
        onClick={resetGame}
      >
        Reiniciar Juego
      </button>
    </>
  );
};

export default ConnectFour;
