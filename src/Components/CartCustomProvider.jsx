import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

export const CartContext = createContext();

export function CartCustomProvider({ children }) {
  const [Items, setItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setItems(storedCart);
    const total = storedCart.reduce((acc, item) => acc + item.cantidad, 0);
    setTotalQuantity(total);
  }, []);

 
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(Items));
  }, [Items]);

  const updateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.cantidad, 0);
    setTotalQuantity(total);
  };

  const addItemToCart = (product, quantity) => {
    const existingIndex = Items.findIndex(item => item.id === product.id);
    let newItems = [...Items];

    if (existingIndex >= 0) {
      newItems[existingIndex].cantidad += quantity;
    } else {
      newItems.push({ ...product, cantidad: quantity });
    }

    setItems(newItems);
    updateTotal(newItems);

    if (quantity > 0) {
      Swal.fire({
        title: `Añadiste ${quantity} ${product.title}${quantity > 1 ? "s" : ""} al carrito`,
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        background: "url(/fondoSweet.jpg)",
        backdrop: "rgba(255, 118, 207, 0.17)",
        customClass: {
          title: "title",
          text: "text",
        }
      });
    }
  };

  const decreaseItemFromCart = (productId) => {
    let newItems = Items.map(item => {
      if (item.id === productId) {
        return { ...item, cantidad: item.cantidad - 1 };
      }
      return item;
    }).filter(item => item.cantidad > 0); 

    setItems(newItems);
     updateTotal(newItems);
  
 
};


  const clearCart = () => {
    setItems([]);
    setTotalQuantity(0);
    localStorage.removeItem("cartItems"); 
  };

  const removeItemFromCart = (productId) => {
    const newItems = Items.filter(item => item.id !== productId);
    setItems(newItems);
    updateTotal(newItems);
  };

  return (
    <CartContext.Provider value={{ Items,  totalQuantity,  addItemToCart,  decreaseItemFromCart,removeItemFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartCustomProvider;
