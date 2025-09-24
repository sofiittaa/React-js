import Swal from "sweetalert2";
import { useContext } from "react";
import { CartCustomProvider, CartContext } from "./CartCustomProvider";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"; ;

export const CartWidget = ({ carrito = [] }) => {
    const { Items, totalQuantity } = useContext(CartContext);

    const elValorDelContexto = useContext(CartCustomProvider);

    useContext(CartCustomProvider);
    

    const addItemToCart = (quantity) => {

}
    const generarID = () => "ORD-" + Date.now().toString(36).toUpperCase();


    const leerID = (id) => {
        const mensaje = new SpeechSynthesisUtterance(`Gracias por tu compra de ${totalQuantity} productos. Tu ID de compra es ${id}`);
        window.speechSynthesis.speak(mensaje);

        mensaje.rate = 0.1;
    };
    

    const handleClick = () => {
          const productosHTML = Items.map(
        (item) => `<p>${item.title} x ${item.cantidad} - $${item.price * item.cantidad}</p>`
        ).join("");

        const totalPrecio = Items.reduce((acc, item) => acc + item.price * item.cantidad, 0);

        Swal.fire({
            title: ``,
            icon: 'info',
            html: `<p>El precio total es de $${totalQuantity}</p>`, 
            html: `${productosHTML}
            <hr><p><strong>Total: $${totalPrecio}</strong></p>`,
            confirmButtonText: 'Realizar compra',
            confirmButtonColor: ' rgb(172, 6, 86)',
            background: 'url(/fondoSweet.jpg)',
            customClass: { title: 'title', text: 'text', htmlContainer: 'text' },

            backdrop: 'rgba(255, 118, 207, 0.17)',
        }).then((res) => {
            if (res.isConfirmed) {
                Swal.fire({
                    title: 'Ingresa los datos',
                    html: `
                        <input id="nombre" class="swal2-input" placeholder="Nombre del titular">
                        <input id="tarjeta" class="swal2-input" placeholder="Número de tarjeta">
                        <input id="vencimiento" class="swal2-input" placeholder="Fecha de vencimiento">
                        <input id="cvv" class="swal2-input" placeholder="CVV">
                    `,
                    icon: 'success',
                    confirmButtonText: 'Comprar',
                    confirmButtonColor: ' rgb(172, 6, 86)',
                    background: 'url(/fondoSweet.jpg)',
                    customClass: { title: 'title', text: 'text', htmlContainer: 'text' },
                    backdrop: 'rgba(255, 118, 207, 0.17)',
                }).then(async (res) => {
                    if (res.isConfirmed) {

                        const idCompra = generarID();
                        try {
                            await addDoc(collection(db, "compras"), {
                                idCompra,
                                fecha: serverTimestamp(),
                                productos: carrito,
                            });


                            leerID(idCompra);

                            Swal.fire({
                                title: 'Compra realizada',
                                html: `
                                    <p>Gracias por tu compra</p>
                                    <p>ID de compra: <strong>${idCompra}</strong></p>
                                    <input id="direccion" class="swal2-input" placeholder="Número de puerta">
                                    <input id="calles" class="swal2-input" placeholder="Calles">
                                    <input id="persona" class="swal2-input" placeholder="Nombre de quien recibe">
                                `,
                                icon: 'success',
                                confirmButtonText: 'Aceptar',
                                confirmButtonColor: ' rgb(172, 6, 86)',
                                background: 'url(/fondoSweet.jpg)',
                                customClass: { title: 'title', text: 'text', htmlContainer: 'text' },
                                backdrop: 'rgba(255, 118, 207, 0.17)',
                            });
                        } catch (e) {
                            console.error("Error guardando la compra:", e);
                            Swal.fire("Error", "No se pudo guardar la compra", "error");
                        }
                    }
                });
            }
        });
    };
   
    return (
        <div>
            <img onClick={handleClick} className='carrito' src="/carrito.png" alt="Carrito" />
            <p className='cantidad'>{totalQuantity } </p>
        </div>
    );
};

export default CartWidget;
