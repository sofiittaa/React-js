import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export const MenuContainer = () => {
  const [open, setOpen] = useState(false); 
  const [search, setSearch] = useState(""); 
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleClick = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tagsCollection = collection(db, "tags");
        const consulta = await getDocs(tagsCollection);
        const tags = consulta.docs.map(doc => doc.data().nombre);
        setItems(tags);
      } catch (err) {
        console.error(err);
        setError("Error al cargar tags");
      } finally {
        setLoading(null);
      }
    };
    fetchData();
  }, []);

  const filteredTags = items
    .filter(t => t.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 13);

  return (
    <>
      <img  onClick={handleClick} className="mburger"  src="/public/menu-hamburguesa.png" alt="Menu" 
      />

      {open && (
        <div className="menu-container">
          <button onClick={handleClose} className="menu-close">X</button>

          <label className="menu-label">Buscar 🔎
            <input type="text" placeholder="categoría..."value={search}onChange={(e) => setSearch(e.target.value)} className="menu-search"/>
          </label>

          {search && (
            <ul>
              {filteredTags.length > 0 ? (
                filteredTags.map((tag, i) => (
                  <li key={i} className="tag-item" onClick={handleClose}>
                    <Link className="tag-link"to={`/catalogo/${encodeURIComponent(tag.toLowerCase())}`}>{tag}</Link>
                  </li>
                ))
              ) : (
                <li className="no-results">No hay resultados</li>
              )}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default MenuContainer;
