import { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
import { productos } from "../productos.js";


function ItemDetailContainer() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setItems(productos);
        }, 500);
    }, []);

    return (
        <div className="item-list">
            {items.length > 0 ? (
                items.map(item => <ItemDetail key={item.id} item={item} />)
            ) : (
                <p>Cargando productos...</p>
            )}
        </div>
    );
}

export default ItemDetailContainer;