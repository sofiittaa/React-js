// ProductosContainer.jsx
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import CatalogoContainer from "./ItemCatalogoContainer";

const ProductosContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosCollection = collection(db, "productos");
        const consulta = await getDocs(productosCollection);
        let productos = consulta.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const uniqueProductos = Array.from(
          new Map(productos.map(p => [p.id, p])).values()
        );

        // ordenar por id numérico
        uniqueProductos.sort((a, b) => Number(a.id) - Number(b.id));

        setItems(uniqueProductos);
      } catch (err) {
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="loading">Cargando productos...</p>;
  if (error) return <p className="loading">{error}</p>;

  return <CatalogoContainer items={items} />;
};

export default ProductosContainer;