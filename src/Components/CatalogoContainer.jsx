import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const CatalogoContainer = () => {
  const { tag } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosCollection = collection(db, "productos");
        const snapshot = await getDocs(productosCollection);
        const productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (tag) {
          const decodedTag = decodeURIComponent(tag).toLowerCase().trim();

          const filtered = productos.filter(p =>
            p.tags && p.tags.some(t => t.toLowerCase().trim() === decodedTag)
          );

          setItems(filtered);
        } else {
          setItems(productos);
        }

      } catch (err) {
        console.error(err);
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tag]);

  const handleClick = (item) => {
    window.location.href = `/VistaPrev/${item.id}`;
  };

  if (loading) return <p className="loading">Cargando productos...</p>;
  if (error) return <p className="loading">{error}</p>;

  return (
    <div className="products-container2">
      {items.map((j) => (
        <div key={j.id} className="product-card2">
          <img
            src={j.imageUrl || j.imagenUrl}
            alt={j.title}
            className="product-img2"
          />
          <h3>{j.title}</h3>
          <p className="product-description2">{j.description}</p>
          <button onClick={() => handleClick(j)} className="buy-btn2">
            Detalle del producto
          </button>
        </div>
      ))}
    </div>
  );
};

export default CatalogoContainer;
