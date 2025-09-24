
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const useProductosDesc = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosCollection = collection(db, "descProductos");
        const snapshot = await getDocs(productosCollection);
        const productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        productos.sort((a, b) => (a.id || 0) - (b.id || 0));

        setItems(productos);
      } catch (err) {
        console.error(err);
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { items, loading, error };
};

export default useProductosDesc;
