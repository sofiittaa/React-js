import { descProductos } from "../descProductos";
import { Link } from "react-router-dom";
import '../../css/App.css'

const ProductList = () => {
    return (
            <main className="product-list">
                    {descProductos.map((p) => (
                            
                        <div>
                             <img className="product-img" src={p.imageUrl} alt={p.title} />
                                <h2>{p.title}</h2>
                                <p >{p.description}</p>
                                <strong >${p.price}</strong>
                                <Link to={`/vistaPrev/${p.id}`}>
                                <button className="buy-btn">Añadir al carrito</button>
                                </Link>
                        </div>
                    ))}
            </main>
    );
};

export default ProductList;
