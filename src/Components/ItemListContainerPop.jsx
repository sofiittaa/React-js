import { useState, useEffect } from "react";
import ItemDetailPop from "./ItemDetailPop.jsx";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Toastify } from "toastify";

function ItemListContainerPop() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productosCollection = collection(db, "productosPop");
                const consulta = await getDocs(productosCollection);
                const productos = consulta.docs.map(doc => {

                    return { id: doc.id, ...doc.data() };
                });
                setItems(productos);
            } catch (error) {
                Toastify({
                    text: "Error al cargar productos",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: 'URL("/public/fondoSweet.jpg")',
                }).showToast();
                setError("Error al cargar productos");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <p className="loading">Cargando productos...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="item-list2">
            {items.length > 0 ? (
                items.map(item => <ItemDetailPop key={item.id} item={item} />)
            ) : (
                <p>Cargando productos...</p>
            )}
        </div>
    );
}

export default ItemListContainerPop;