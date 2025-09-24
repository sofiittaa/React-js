import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import ItemDesc from "./ItemDesc";

const ItemDetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      const docRef = doc(db, "descProductos", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setItem({ id: docSnap.id, ...docSnap.data() });
      }
      setLoading(false);
    };
    fetchItem();
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (!item) return <p>Producto no encontrado</p>;

  return <ItemDesc item={item} />;
};

export default ItemDetailPage;
