export const ProductosList = ({ children }) => {
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosCollection = collection(db, 'productos')
        const consulta = await getDocs(productosCollection)
        const productos = consulta.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        setItems(productos)
      } catch (error) {
        setError('Error al cargar productos')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && children(items)}
    </>
  )
}

export default ProductosContainer;