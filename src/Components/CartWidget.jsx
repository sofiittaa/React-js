import Swal from "sweetalert2";
import { useContext } from "react";
import { CartContext } from "./CartCustomProvider";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export const CartWidget = () => {
  const { Items, totalQuantity, addItemToCart, decreaseItemFromCart, clearCart } =
    useContext(CartContext);

  const generarID = () => "ORD-" + Date.now().toString(36).toUpperCase();

  const leerID = (id) => {
    const mensaje = new SpeechSynthesisUtterance(
      `Gracias por tu compra de ${totalQuantity} productos. Tu ID de compra es ${id}`
    );
    mensaje.rate = 0.1;
    window.speechSynthesis.speak(mensaje);
  };

  const renderHTML = () => {
    const totalPrecio = Items.reduce(
      (acc, item) => acc + item.price * item.cantidad,
      0
    );

    return Items.map(
      (item) => `
        <div style="display:flex; align-items:center; gap:10px; margin:8px 0;">
          <img src="${item.imageUrl}" style="width:50px; height:50px; object-fit:cover; border-radius:6px;" />
          <p style="margin:0; flex:1;">${item.title} x ${item.cantidad} - $${item.price * item.cantidad}</p>
          <button onclick="window.cartDecrease(${item.id})" style="background:#b91c1c; color:white; border:none; padding:4px 8px; border-radius:6px; cursor:pointer;">-1</button>
          <button onclick="window.cartAdd(${item.id})" style="background:#16a34a; color:white; border:none; padding:4px 8px; border-radius:6px; cursor:pointer;">+1</button>
        </div>
      `
    ).join("") + `<hr><p><strong>Total: $${totalPrecio}</strong></p>`;
  };

  const handleClick = () => {
    Swal.fire({
      title: `🛒 Tu carrito`,
      icon: "info",
      html: renderHTML(),
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Realizar compra",
      denyButtonText: "Vaciar carrito",
      cancelButtonText: "Seguir comprando",
      confirmButtonColor: "rgb(172, 6, 86)",
      denyButtonColor: "#b91c1c",
      cancelButtonColor: "rgb(172, 6, 86)",
      background: "url(/fondoSweet.jpg)",
      customClass: { title: "title", text: "text", htmlContainer: "text" },
      backdrop: "rgba(255, 118, 207, 0.17)",
      didOpen: () => {
        window.cartAdd = (id) => {
          const product = Items.find((p) => p.id === id);
          if (product) addItemToCart(product, 1);
          Swal.update({ html: renderHTML() }); 
        };
        window.cartDecrease = (id) => {
            decreaseItemFromCart(id);
            Swal.update({ html: renderHTML() }); 
            Swal.close();
        };
      },
    }).then(async (res) => {
      if (res.isConfirmed) {

        Swal.fire({
          title: "Ingresa los datos de pago y envío",
          html: `
            <input id="nombre" class="swal2-input" placeholder="Nombre del titular">
            <input id="tarjeta" class="swal2-input" placeholder="Número de tarjeta">
            <input id="vencimiento" class="swal2-input" placeholder="Fecha de vencimiento">
            <input id="cvv" class="swal2-input" placeholder="CVV">
            <input id="direccion" class="swal2-input" placeholder="Número de puerta">
            <input id="calles" class="swal2-input" placeholder="Calles">
            <input id="persona" class="swal2-input" placeholder="Nombre de quien recibe">
          `,
          icon: "success",
          confirmButtonText: "Comprar",
          confirmButtonColor: "rgb(172, 6, 86)",
        }).then(async (res2) => {
          if (res2.isConfirmed) {
            const idCompra = generarID();
            const nombre = document.getElementById("nombre").value;
            const tarjeta = document.getElementById("tarjeta").value;
            const vencimiento = document.getElementById("vencimiento").value;
            const cvv = document.getElementById("cvv").value;
            const direccion = document.getElementById("direccion").value;
            const calles = document.getElementById("calles").value;
            const persona = document.getElementById("persona").value;

            try {
              await addDoc(collection(db, "compras"), {
                idCompra,
                fecha: serverTimestamp(),
                productos: Items,
                total: Items.reduce((acc, i) => acc + i.price * i.cantidad, 0),
                tarjeta: { nombre, tarjeta, vencimiento, cvv },
                direccion: { direccion, calles, persona },
              });

              leerID(idCompra);
              clearCart();

              Swal.fire({
                title: "Compra realizada",
                html: `<p>Gracias por tu compra</p><p>ID: <strong>${idCompra}</strong></p>`,
                icon: "success",
                confirmButtonColor: "rgb(172, 6, 86)",
              });
            } catch (e) {
              console.error("Error guardando la compra:", e);
              Swal.fire("Error", "No se pudo guardar la compra", "error");
            }
          }
        });
      } else
          if (res.isDenied) {
        clearCart();
          Swal.fire({
            title: "Carrito vaciado",
            icon: "success",
              confirmButtonColor: "rgb(172, 6, 86)",
            background: "url(/fondoSweet.jpg)",
              backdrop: "rgba(255, 118, 207, 0.17)",
              customClass: { title: "title", text: "text" },
            
        })
      }
    });
  };

  return (
    <div>
      <img
        onClick={handleClick}
        className="carrito"
        src="/carrito.png"
        alt="Carrito"
      />
      <p className="cantidad">{totalQuantity}</p>
    </div>
  );
};

export default CartWidget;
