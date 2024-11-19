const Square = ({ value, onClick }) => {
    return (
      <div className='casilla' onClick={onClick}>
        {value}
      </div>
    );
  };

export default Square;