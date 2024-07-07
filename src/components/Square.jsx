export const Square = ({ children, updateBoard, index, isSelected }) => {
    // cuando alguien haga click en el div(lo que esta dentro de cada borde) va a ejecutar la funcion handleClick() y esta va a ejecutar la funcion updateBoard().
    // Le estamos pasando la función, no la ejecución de esta
    const className = `square ${isSelected ? "is-selected" : ""}`;
  
    const handleClick = () => {
      //cuando el usuario hace click, le pasamos el indice para saber dónde está clickeando, indices del 0 al 8. Así actualizamos el nuevo board con la nueva info
      updateBoard(index);
    };
  
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    );
  };