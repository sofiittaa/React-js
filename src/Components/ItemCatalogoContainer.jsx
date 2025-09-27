
import { useNavigate } from "react-router-dom";

  const ItemCatalogoContainer = ({ items = [] }) => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    navigate(`/vistaPrev/${item.id}`);
  };

  return (
    <div className="products-container2">
      {items.map(j => (
        <div key={j.id} className="product-card2">
          <img
            src={j.imageUrl || j.imagenUrl}
            alt={j.title}
            className="product-img2"
          />
          <h3>{j.title}</h3>
          <p className="product-description2">{j.description}</p>
          <button onClick={() => handleClick(j)} className="buy-btn2">
            Detalle del producto
          </button>
        </div>
      ))}
    </div>
  );
};

export default ItemCatalogoContainer;
