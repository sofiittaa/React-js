import { useState } from "react";
import Swal from "sweetalert2";

const ItemDesc= ({ item }) => {
  const [cantidad, setCantidad] = useState(1);

  const incrementar = () => setCantidad(c => c + 1);
  const decrementar = () => setCantidad(c => (c > 1 ? c - 1 : 1));

  const handleClick = () => {
    Swal.fire({
      title: `Añadiste ${cantidad} ${item.title}${cantidad > 1 ? 's' : ''} al carrito`,
      icon: "success",
      showCancelButton: false,
      showConfirmButton: false,
      timer: 4900,
      background: 'url(/fondoSweet.jpg)',
      customClass: {
        title: 'title',
        text: 'text',
      },
      backdrop: 'rgba(255, 118, 207, 0.17)',
    });
    setCantidad(1);
  };
  if (!item) return <p className="loading">Producto no encontrado.</p>;

  return (
    <section className="product-detail">
      <div className="flex">
        <div className="product-card">
          {(item.imageUrl)} && (
          <img src={item.imageUrl}  alt={item.title} className="product-img" />
          )
          <h1 className="product-title">{item.title}</h1>
        </div>
        <div className="product-info">
          <p className="product-description">{item.description || item.descripcion || item.desc}</p>
          {item.price && <strong className="product-price">${item.price}</strong>}
          <div>
            <button className="btn-dec" onClick={decrementar}>-</button>
            <span className="product-quantity">{cantidad}</span>
            <button className="btn-inc" onClick={incrementar}>+</button>
            <button onClick={handleClick} className="buy-btn">Añadir al carrito</button>
          </div>
        </div>
      </div>
    </section>
  );
}


export default ItemDesc;
