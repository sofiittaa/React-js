import { useState, useContext } from "react";
import Swal from "sweetalert2";
import ItemCount from "./ItemCount";
import { CartContext } from "./CartCustomProvider"; 

const ItemDescDetail = ({ item }) => {
  const [cantidad, setCantidad] = useState(1); 
  

  if (!item) return <p>Producto no encontrado</p>;
    const { addItemToCart } = useContext(CartContext);

  const AddItemToCart = () => {
   addItemToCart(item, cantidad);// <--- agrega el producto al contexto
    setCantidad(1);

    Swal.fire({
      title: `Añadiste ${cantidad} ${item.title}${cantidad > 1 ? "s" : ""} al carrito`,
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
      customClass: {
        title: "title",
        text: "text",
      },
      background: "url(/fondoSweet.jpg)",
      backdrop: "rgba(255, 118, 207, 0.17)",
    });
    setCantidad(1); 
  };

  return (
    <section className="product-detail">
      <div className="flex">
        <div className="product-card">
          {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="product-img" />}
          <h1 className="product-title">{item.title}</h1>
        </div>
        <div className="product-info">
          <p className="product-description">{item.description}</p>
          <strong className="product-price">${item.price}</strong>
           {item.unidad <= 5 && (
          <p className="stock-warning">
            ¡Ultimas Unidades!
          </p>
  )}
          <div className="flex">
            <ItemCount  cantidad={cantidad} setCantidad={setCantidad} max={item.unidad}/>
            <button onClick={AddItemToCart} className="buy-btn">Añadir al carrito</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDescDetail;
