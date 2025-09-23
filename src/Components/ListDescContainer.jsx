import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ItemDesc from "./ItemDesc";

const ListDescContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosCollection = collection(db, "descProductos");
        const consulta = await getDocs(productosCollection);

        const productos = consulta.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        productos.sort((a, b) => (a.id > b.id ? 1 : -1));
        setItems(productos);
      } catch (err) {
        setError("Error al cargar productos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="loading">Cargando productos...</p>;
  if (error) return <p className="loading">{error}</p>;

  return (
    <div className="productosDescContainer">
      {items.map(item => (
        <ItemDesc key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ListDescContainer;
