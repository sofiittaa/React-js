import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { CartContext } from "./CartCustomProvider";
import { ItemCount } from "./ItemCount"; 

const ItemDesc = ({ item }) => {
  const { AddItemToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    AddItemToCart({ ...item, quantity });
    Swal.fire({
      title: `Añadiste ${quantity} ${item.title}${quantity > 1 ? 's' : ''} al carrito`,
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
      background: 'url(/fondoSweet.jpg)',
      backdrop: 'rgba(255, 118, 207, 0.17)',
    });
    setQuantity(1);
  };

  if (!item) return null;

  return (
    <section className="product-detail">
      <div className="flex">
        <div className="product-card">
          {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="product-img" />}
          <h1 className="product-title">{item.title}</h1>
        </div>

        <div className="product-info">
          <p className="product-description">{item.description}</p>
          {item.price && <strong className="product-price">${item.price}</strong>}

          <div>
            <ItemCount handle={setQuantity} />
            {quantity > 0 && (
              <button onClick={handleAddToCart} className="buy-btn">Añadir al carrito</button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDesc;
