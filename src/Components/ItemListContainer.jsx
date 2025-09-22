import { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail.jsx";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { Toastify } from "toastify";

function ItemListContainer() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productosCollection = collection(db, "productos");
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
        return <p>Cargando productos...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <div className="item-list">
            {items.map(item => <ItemDetail key={item.id} item={item} />)}
        </div>
    );
}

export default ItemListContainer;