import { createContext, useState } from "react";
import Swal from "sweetalert2";

export const CartContext = createContext();

export function CartCustomProvider({ children }) {
  const [Items, setItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const addItemToCart = (product, quantity) => {
    // buscar si ya existe el producto en el carrito
    const existingIndex = Items.findIndex(item => item.id === product.id);
    let newItems = [...Items];

    if (existingIndex >= 0) {
      // si existe, sumar la cantidad
      newItems[existingIndex].cantidad += quantity;
    } else {
      // si no existe, agregarlo
      newItems.push({ ...product, cantidad: quantity });
    }

    setItems(newItems);

    // actualizar cantidad total
    const total = newItems.reduce((acc, item) => acc + item.cantidad, 0);
    setTotalQuantity(total);

    Swal.fire({
      title: `Añadiste ${quantity} ${product.title}${quantity > 1 ? "s" : ""} al carrito`,
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
      background: "url(/fondoSweet.jpg)",
      backdrop: "rgba(255, 118, 207, 0.17)",
    });
  };

  const clearCart = () => {
    setItems([]);
    setTotalQuantity(0);
  };

  const removeItemFromCart = (productId) => {
    const newItems = Items.filter(item => item.id !== productId);
    setItems(newItems);
    const total = newItems.reduce((acc, item) => acc + item.cantidad, 0);
    setTotalQuantity(total);
  };

  return (
    <CartContext.Provider value={{ Items, totalQuantity, addItemToCart, removeItemFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartCustomProvider;
