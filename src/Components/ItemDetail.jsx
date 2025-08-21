import '../../css/App.css'

function ItemDetail({ item }) {
    return (
        <div className='flex'>
          
            <div className="card1">

                <img className="img1" src={item.imageUrl} alt="stardew" />
                <h2 className="title">{item.title}</h2>
                <p className='desc'>{item.description}</p>
                <p className='price'>Precio ${item.price}</p>
            </div>
        </div>

    )

}
export default ItemDetail; 