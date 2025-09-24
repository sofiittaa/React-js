import { useProductosDesc } from "./UseProductosDesc";
import { useParams } from "react-router-dom";
import ItemDescDetail from "./ItemDescDetail";

const ItemDescContainer = () => {
  const { id } = useParams();
  const { items, loading, error } = useProductosDesc();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;


  const item = items.find(p => p.id.toString() === id.toString());
  if (!item) return <p>Producto no encontrado</p>;

  return <ItemDescDetail item={item} />;
};

export default ItemDescContainer;
