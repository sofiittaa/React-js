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
        disabled={cantidad <= 1} 
      >
        -
      </button>

      <span className="product-quantity">{cantidad}</span> 

      <button 
        className="btn-inc" 
        onClick={incrementar} 
        disabled={cantidad >= max} 
      >
        +
      </button>
    </div>
  );
};

export default ItemCount;
