import { useLocation, useNavigate } from "react-router-dom"

export const VolverAlCatalogo = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // Detecta si estas en /vistaPrevia/:id
  const isVistaPrevia = location.pathname.startsWith("/vistaPrevia/")

  if (!isVistaPrevia) return null

  return (
    <div onClick={() => navigate("/catalogo")} >
      <img className="deshacer" src="../../public/deshacer.png" alt="Volver al catálogo" />
    </div>
  )
}

export default VolverAlCatalogo
