import Swal from "sweetalert2";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"; 

export const CartWidget = ({ carrito = [] }) => {

    const generarID = () => "ORD-" + Date.now().toString(36).toUpperCase();


    const leerID = (id) => {
        const mensaje = new SpeechSynthesisUtterance(`Gracias por tu compra de ${carrito.length} productos. Tu ID de compra es ${id}`);
        window.speechSynthesis.speak(mensaje);

        mensaje.rate = 0.1;
    };
console.log(window.speechSynthesis.getVoices())
    const handleClick = () => {
        Swal.fire({
            title: `Tienes ${carrito.length} productos en el carrito`,
            icon: 'info',
            confirmButtonText: 'Realizar compra',
            confirmButtonColor: ' rgb(172, 6, 86)',
            background: 'url(/fondoSweet.jpg)',
            customClass: { title: 'title', text: 'text' },
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
                    customClass: { title: 'title', text: 'text' },
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
                                customClass: { title: 'title', text: 'text' },
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
            <img 
                onClick={handleClick} 
                className='carrito' 
                src="/carrito.png" 
                alt="Carrito" 
            />
            <p className='cantidad'>
                {carrito.reduce((acc) => acc + 1, 0)}
            </p>
        </div>
    );
};

export default CartWidget;
