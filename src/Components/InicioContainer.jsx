import IframeContainer   from "./IframeContainer";
import MiLineaContainer  from "./MiLineaContainer";
import ItemListContainerPop from "./ItemListContainerPop";
import CatalogoButtonContainer from "./CatalogoButtonContainer";
import BestplayContainer from "./BestplayContainer";



export const InicioContainer = () => {
  return (
    <>
      <BestplayContainer />
      <CatalogoButtonContainer />
      <IframeContainer />
      <MiLineaContainer titulo="Videojuegos populares" />
      <ItemListContainerPop />
    </>
  )
}

export default InicioContainer;
