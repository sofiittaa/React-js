
export const ItemCount = (props) => {

    const [contador, setContador] = useState(0)

        const incrementar = () => {
            const cuentaFinal = count + 1
            setContador(cuentaFinal)
            props.handle(cuentaFinal)
        }
    
        
    const decrementar = () => {
        const cuentaFinal = count - 1
        setContador(cuentaFinal)
        props.handle(cuentaFinal)
    }

  return (
    <div> <button className="btn-dec" onClick={decrementar}>-</button>
            <span className="product-quantity">{cantidad}</span>
          <button className="btn-inc" onClick={incrementar}>+</button>
      </div>
  )
}
