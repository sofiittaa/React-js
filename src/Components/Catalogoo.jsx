import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { productos } from "../productos";

const Catalogoo = () => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    navigate(`/vistaPrev/${item.id}`);
  };

  const { tag } = useParams();
  const tagDecoded = tag ? decodeURIComponent(tag) : null;

  const juegosFiltrados = tagDecoded
    ? productos.filter(p =>
        p.tags.some(t => t.toLowerCase() === tagDecoded.toLowerCase())
      )
    : productos;

  return (
    <div className="products-container2"> {/* contenedor flex */}
      {juegosFiltrados.map((j) => (
        <div key={j.id} className="product-card2"> {/* cada tarjeta */}
          <img src={j.imageUrl} alt={j.title} className="product-img2" />
          <h3>{j.title}</h3>
          <p className="product-description2">{j.description}</p>
          <button onClick={handleClick} className="buy-btn2">Detalle del producto</button>
        </div>
      ))}
    </div>
  );
};

export default Catalogoo;
