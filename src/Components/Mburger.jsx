import { useState } from "react";
import { tags } from "../tags"; 
import { Link } from "react-router-dom";

export const Mburger = () => {
  const [open, setOpen] = useState(false); 

  const [search, setSearch] = useState(""); 

  const handleClick = () => setOpen(!open); // abrir/cerrar menú
  const handleClose = () => setOpen(false); // cerrar menú con la X

  const filteredTags = tags.filter(t =>
    t.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 15); 
  return (
    <>
      <img
        onClick={handleClick}
        className="mburger"
        src="/public/menu-hamburguesa.png"
        alt="Menu"
      />

      {open && (
        <div className="menu-container">
          <button onClick={handleClick} className="menu-close">X</button>
          <label className="menu-label"> Buscar 🔎
            <input type="text" placeholder="categoría..." value={search} onChange={(e) => setSearch(e.target.value)} className="menu-search" />
          </label>
          {search && (
            <ul>
              {filteredTags.length > 0 ? (
                filteredTags.map((tag, i) => (
                  <li key={i} className="tag-item" onClick={handleClose}>
                    <Link className="tag-link" to={`/catalogo/${encodeURIComponent(tag.toLowerCase())}`}>{tag}</Link>
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

export default Mburger;
