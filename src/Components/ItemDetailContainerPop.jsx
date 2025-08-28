import { useState, useEffect } from "react";
import ItemDetailPop from "./ItemDetailPop.jsx";
import { productosPop } from "../productosPop.jsx";


function ItemDetailContainerPop() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setItems(productosPop);
        }, 500);
    }, []);

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

export default ItemDetailContainerPop;