
import { createContext } from "react"
export const CartContext = createContext()
import { useState } from "react"


export function CartCustomProvider(props) {


    
const [totalQuantity, setTotalQuantity] = useState(0);


  const addItemToCart = (quantity) => {
      const finallQuantity = totalQuantity + quantity
      setTotalQuantity(finallQuantity )
  }
  
  const clearCart = () => {


  }

    const removeItemFromCart = () => {

}

      const elValorDelContexto = {
        //guardar el array de productos agregados al carrito y su info 
        Items: [],
        //guardar la cantidad de productos agregados al carrito
        cantidad: 0,
        //precio total de la compra 
        totalQuantity: totalQuantity,
        addItemToCart,
        removeItemFromCart,
        clearCart
}


  return (
    <CartContext.Provider value={elValorDelContexto}> 
        {props.children}
    </CartContext.Provider>
  )
}

export default CartCustomProvider;