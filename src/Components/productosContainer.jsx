// ProductosContainer.jsx
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ItemCatalogoContainer from "./ItemCatalogoContainer";
import { useParams } from "react-router-dom";

const ProductosContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { tag } = useParams(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosCollection = collection(db, "productos");
        const consulta = await getDocs(productosCollection);
        let productos = consulta.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (tag) {
          productos = productos.filter(p => 
            p.tags && p.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
          );
        }

        const uniqueProductos = Array.from(
          new Map(productos.map(p => [p.id, p])).values()
        );

        uniqueProductos.sort((a, b) => Number(a.id) - Number(b.id));

        setItems(uniqueProductos);
      } catch (err) {
        console.error(err);
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tag]); // 👈 se vuelve a ejecutar si cambia el tag

  if (loading) return <p className="loading">Cargando productos...</p>;
  if (error) return <p className="loading">{error}</p>;

  return <ItemCatalogoContainer items={items} />;
};

export default ProductosContainer;
