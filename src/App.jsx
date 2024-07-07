import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import confetti from "canvas-confetti";
import "./App.css";
import { Square } from "./components/Square.jsx";
import { TURNS } from "./constans.js";
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  const [winner, setWinner] = useState(null); //null es que no hay ganador, false es que hay empate


  //reseteamos el estado del componente, no la página q sería un location reload
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }


  const updateBoard = (index) => {
    if (board[index] || winner) return; //si en el índice(board) hay algo, no actualizamos la posición. Evitamos el cambio de x->o
    //si tenemos asignada una ficha en la posición, o tenemos un ganador, ya se termina el juego.

    //actualizar el tablero
    const newBoard = [...board]; // aquí copiamos el board con el spread operator, ya que creamos un nuevo array con el valor nuevo y no lo mutamos,
    // ya que los estados DEBEN SER INMUTABLES. Así no hay problemas de renderizado. Los datos del renderizado, al ser modificados, deben ser nuevos.
    // por esto es la copia, para evitar modificar el original

    //como tenemos un nuevo board, que recibe el índice, le vamos a poner el valor del turno actual
    newBoard[index] = turn;
    setBoard(newBoard); // y aquí actualizamos el board actualizando el estado del board.

    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //revisar si hay algún ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti()
      setWinner(newWinner); //actualiza el estado
    }

    //chequear si hay un empate para terminar el juego
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false) //empate
    }
  };

  return (
    <main className="board">
      <h1>Juguemos al gato</h1>
      <button onClick={resetGame}>Reiniciar el juego</button>
      <section className="game">
        {board.map((_, index) => {
          // estamos renderizando cada uno de los squares dentro del tablero
          return (
            <Square
              // cada square tenemos el indice y el updateBoard que se lo estamos pasando como propiedad al componente square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>
    </main>
  );
}

export default App;
