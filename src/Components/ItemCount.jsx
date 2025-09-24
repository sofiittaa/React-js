export const ItemCount = ({ cantidad, setCantidad, max }) => {

  const incrementar = () => {
    if (cantidad < max) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    setCantidad(cantidad > 1 ? cantidad - 1 : 1);
  };

  return (
    <div className="product-quantity-container">
      <button 
        className="btn-dec" 
        onClick={decrementar} 
        disabled={cantidad <= 1} // deshabilita si está en el mínimo
      >
        -
      </button>

      <span className="product-quantity">{cantidad}</span> 

      <button 
        className="btn-inc" 
        onClick={incrementar} 
        disabled={cantidad >= max} // deshabilita si llegó al stock
      >
        +
      </button>
    </div>
  );
};

export default ItemCount;
