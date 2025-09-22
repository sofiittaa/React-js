import { useNavigate, useLocation } from 'react-router-dom'
export { MiLineaContainer } from './MiLineaContainer';

const  CatalogoButtonContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='btn-div'>
      <button onClick={() => navigate("/catalogo")} className='buttonC'>Ver Catálogo</button>
    </div>
  )
}

export default CatalogoButtonContainer;