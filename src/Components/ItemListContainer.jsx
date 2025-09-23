
import ItemDetail from "./ItemDetail.jsx";
import ProductosContainer from "./productosContainer.jsx";

function ItemListContainer({ items = [] }) {
    return (
        <ProductosContainer>
        <div className="item-list">
            {items.map(item => <ItemDetail key={item.id} item={item} />)}
        </div>
            );
            </ProductosContainer>
    );
    
}

export default ItemListContainer;