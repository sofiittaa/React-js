import { useParams } from "react-router-dom";
import { descProductos } from "../descProductos";
import Swal from "sweetalert2";

const ProductPage = () => {
  
  const handleClick = () => {
    Swal.fire({
      title: "Producto añadido al carrito",
      icon: "success",
      showCancelButton: false,
      showConfirmButton: false,
      timer: 900,
      background: 'url(/fondoSweet.jpg)',
    });
  }

  const { id } = useParams();
  const producto = descProductos.find((p) => p.id === parseInt(id));
  
  return (
    <section className="product-detail">
        <div className="flex">
            <div className="product-card">
            <img src={producto.imageUrl} alt={descProductos.title} className="product-img" />
          <h1 className="product-title">{producto.title}</h1>
            </div>
          <div className="product-info">
              <p className="product-description">{producto.description}</p>
              <strong className="product-price">${producto.price}</strong>
              <button onClick={handleClick} className="buy-btn">Añadir al carrito</button>
          </div>
      </div>
    </section>
   
  );
};

export default ProductPage;
