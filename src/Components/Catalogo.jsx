import { useNavigate, useLocation } from 'react-router-dom'
export { MiLinea } from '../Components/MiLinea';

const Catalogo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='btn-div'>
      <button onClick={() => navigate("/catalogo")} className='buttonC'>Ver Catálogo</button>
    </div>
  )
}

export default Catalogo;