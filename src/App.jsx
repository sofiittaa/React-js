/* ----------- COMPONENTS ----------- */
import '../css/App.css';
import FooterContainer from "./Components/FooterContainer";
import ItemListContainer from "./Components/ItemListContainer";
import NavbarContainer from "./Components/NavbarContainer";
import MiLineaContainer from "./Components/MiLineaContainer";
import ProductosContainer from './Components/ProductosContainer';
import InicioContainer from "./Components/InicioContainer";
import ItemDescContainer from "./Components/ItemDescContainer";
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
            <Route exact  element={<IframeContainer />} />
            <Route exact  element={<BestplayContainer />} />
            <Route exact  element={<MiLineaContainer titulo="Videojuegos populares" />} />
            <Route exact path="/catalogo" element={<ItemListContainer />} />
            <Route exact path="/catalogo/:tag" element={<ProductosContainer />} />
        <Route path="/vistaPrev/:id" element={<ItemDescContainer />} />

      </Routes>
      <FooterContainer />
    </BrowserRouter>
  );
}

export default App;