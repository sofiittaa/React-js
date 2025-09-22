import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const CatalogoContainer = () => {
  const { tag } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const productosCollection = collection(db, "productos");
      const consulta = await getDocs(productosCollection);
      const productos = consulta.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLoading(false);
    };
    fetchData();
  }, [tag]);

  if (loading) return <p className="loading">Cargando productos...</p>;
  if (!items.length) return <p className="loading">No hay productos para este tag.</p>;

const handleClick = (item) => {
    window.location.href = `/vistaPrev/${item.id}`;
  };

  return (
    <div className="products-container2">
      {items.map((j) => (
        <div key={j.id} className="product-card2">
          <img src={j.imageUrl || j.imagenUrl} alt={j.title} className="product-img2" />
          <h3>{j.title}</h3>
          <p className="product-description2">{j.description}</p>
          <button onClick={() => handleClick(j)} className="buy-btn2">Detalle del producto</button>
        </div>
      ))}
    </div>
  );
}


export default CatalogoContainer;

