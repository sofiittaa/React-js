import  Iframe  from "./Iframe";
import MiLinea from "./MiLinea";
import ItemDetailContainerPop from "./ItemDetailContainerPop";
import Bestplay from './Bestplay';
import Catalogo from './Catalogo';



export const Casa = () => {
  return (
    <>
      <Bestplay />
      <Catalogo />
      <Iframe />
      <MiLinea titulo="Videojuegos populares" />
      <ItemDetailContainerPop />
    </>
  )
}

export default Casa;
