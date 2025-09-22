/* ----------- COMPONENTS ----------- */
import '../css/App.css';

import FooterContainer from "./Components/FooterContainer";
import ItemListContainer from "./Components/ItemListContainer";
import NavbarContainer from "./Components/NavbarContainer";
import MiLineaContainer from "./Components/MiLineaContainer";
import CatalogoContainer from "./Components/CatalogoContainer";
import InicioContainer from "./Components/InicioContainer";
import ItemDesc from "./Components/ItemDesc";
import IframeContainer from "./Components/IframeContainer";
import BestplayContainer from "./Components/BestplayContainer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* ------------ FONTS -------------- */
import "@fontsource/quicksand";
import "@fontsource/cormorant-garamond";
/* ------------- APP --------------- */
function App() {
 
  return (
    <BrowserRouter>
      <NavbarContainer/>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
            <Route exact path="/home" element={<InicioContainer />} />
            <Route exact path="/" element={<IframeContainer />} />
            <Route exact  path="/" element={<BestplayContainer />} />
            <Route exact  path="/" element={<MiLineaContainer titulo="Videojuegos populares" />} />
            <Route exact path="/catalogo" element={<ItemListContainer />} />
            <Route path="/catalogo/:tag" element={<CatalogoContainer />} />
            <Route exact  path="/vistaPrev/:id" element={<ItemDesc/>} />
      </Routes>
      <FooterContainer />
    </BrowserRouter>
  );
}

export default App;