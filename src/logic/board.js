import { WINNER_COMBOS } from "../constans.js";

export const checkWinnerFrom = (boardToCheck) => {
    //revisamos todas las combinaciones ganadoras
    //para ver si X o U, ganó
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] && // aqui miramos si en la primera posición [0] hay una x o una o
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
        //si la a = b y a = c, significa que hay un ganador
      ) {
        return boardToCheck[a];
        // devolvemos al ganador
      }
    }
    //si no hay ganador
    return null;
  };

  export const checkEndGame = (newBoard) => {
    //revisamos si hay empate
    // si no hay más espacios vacíos en el tablero
    return newBoard.every((square) => square != null)
  }