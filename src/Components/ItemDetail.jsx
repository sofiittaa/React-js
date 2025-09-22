import { useNavigate } from "react-router-dom";


function ItemDetail({ item }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/vistaPrev/${item.id}`);
    }
    
    return (
        <div className='flex'>
            <div className="card1">
                <img className="img1" src={item.imageUrl} />
                <h2 className="title">{item.title}</h2>
                <button onClick={handleClick} className="btn-c">Detalle del producto</button>
            </div>
        </div>
    )

}
export default ItemDetail;
