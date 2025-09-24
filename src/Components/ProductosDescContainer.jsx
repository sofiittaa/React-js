
import { useProductosDesc } from "./UseProductosDesc";


const ProductosDescContainer = () => {
  const { items, loading, error } = useProductosDesc();

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="productosDescContainer">
      {items.map(item => (
        <div key={item.id} className="product-card2">
          <img src={item.imageUrl} alt={item.title} className="product-img2" />
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <strong>${item.price}</strong>
        </div>
      ))}
    </div>
  );
};

export default ProductosDescContainer;
