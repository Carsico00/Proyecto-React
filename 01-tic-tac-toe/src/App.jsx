import { useState } from 'react';
import Confetti from 'react-confetti';
import './App.css';

// Componente Square que representa una casilla del tablero
const Square = ({ value, onClick }) => {
  return (
    <div className='casilla' onClick={onClick}>
      {value}
    </div>
  );
};

function App() {
  // Estado para controlar el turno actual ('X' o 'O')
  const [turno, setTurno] = useState(() => {
    const savedTurno = localStorage.getItem('turno');
    return savedTurno ? savedTurno : 'X';
  });
  // Estado para controlar el tablero, inicialmente lleno de valores null
  const [board, setBoard] = useState(() => {
    const savedBoard = localStorage.getItem('board');
    return savedBoard ? JSON.parse(savedBoard) : Array(9).fill(null);
  });
  // Estado para controlar el ganador
  const [winner, setWinner] = useState(() => {
    const savedWinner = localStorage.getItem('winner');
    return savedWinner ? savedWinner : null;
  });

  // Función para verificar si hay un ganador
  const checkWinner = (board) => {
    // Líneas ganadoras posibles
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

    // Verificar cada línea ganadora
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  // Función que maneja el clic en una casilla
  const handleClick = (index) => {
    // Si la casilla ya tiene un valor o hay un ganador, no hacer nada
    if (board[index] || winner) return;

    // Crear una copia del tablero
    const newBoard = board.slice();
    // Asignar el valor del turno actual a la casilla clicada
    newBoard[index] = turno;
    // Actualizar el estado del tablero con la nueva copia
    setBoard(newBoard);
    localStorage.setItem('board', JSON.stringify(newBoard));

    // Verificar si hay un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      localStorage.setItem('winner', newWinner);
    } else {
      // Verificar si hay un empate
      const empate = newBoard.every((casilla) => casilla !== null);
      if (empate) {
        setWinner('Empate');
        localStorage.setItem('winner', 'Empate');
      } else {
        // Cambiar el turno al siguiente jugador
        const nextTurno = turno === 'X' ? 'O' : 'X';
        setTurno(nextTurno);
        localStorage.setItem('turno', nextTurno);
      }
    }
  };

  // Función para reiniciar el juego
  const resetGame = () => {
    const initialBoard = Array(9).fill(null);
    setBoard(initialBoard);
    setTurno('X');
    setWinner(null);
    localStorage.setItem('board', JSON.stringify(initialBoard));
    localStorage.setItem('turno', 'X');
    localStorage.removeItem('winner');
  };

  return (
    <>
      <div>
        <h1>Tic Tac Toe</h1>
        <h2>Turno: {turno}</h2>
        {winner && <h2>Ganador: {winner}</h2>}
        {winner !== 'Empate' && winner !== null && <Confetti />}
        <main className='board'>
          {/* Mapear cada valor del tablero a un componente Square */}
          {board.map((value, index) => (
            <Square key={index} value={value} onClick={() => handleClick(index)} />
          ))}
        </main>
        <button style={{marginTop: 20, padding:10}} onClick={resetGame}>Reiniciar Juego</button>
      </div>
    </>
  );
}

export default App;