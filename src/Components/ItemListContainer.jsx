import React from 'react'
import App from '../App'
import '../../css/App.css'

export const ItemListContainer = ({ mensaje }) => {
    return (
        <div className='mensaje'>
            <p>{mensaje}</p>
        </div>
    )
}

export default ItemListContainer