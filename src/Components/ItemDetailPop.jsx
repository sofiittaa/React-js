import { useNavigate } from "react-router-dom";

function ItemDetailPop({ item }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/vistaPrev/${item.id}`);
    }
    return (
        <div className='flex'>
          
            <div className="card2">

                <img className="img1" src={item.imageUrl} />
                <h2 className="title">{item.title}</h2>
                <button onClick={handleClick} className="btn-c">Detalle del producto</button>
            </div>
        </div>

    )

}
export default ItemDetailPop; 