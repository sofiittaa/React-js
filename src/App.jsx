/* ----------- COMPONENTS ----------- */
import  Iframe  from "./Components/Iframe";
import Foot from "./Components/Foot";
import ItemDetailContainer from "./Components/ItemDetailContainer";
import Navbar from "./Components/Navbar";
import MiLinea from "./Components/MiLinea";
import Casa from "./Components/Casa";
import Bestplay from "./Components/Bestplay";
import ProductPage from "./Components/productPage";
import Catalogoo from "./Components/Catalogoo";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* ------------ FONTS -------------- */
import "@fontsource/quicksand";
import "@fontsource/cormorant-garamond";




/* ------------- APP --------------- */
function App() {

  return (
    <BrowserRouter>
      
        <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
            <Route exact path="/home" element={<Casa />} />
            <Route exact path="/" element={<Iframe />} />
            <Route exact  path="/" element={<Bestplay />} />
            <Route exact  path="/" element={<MiLinea titulo="Videojuegos populares" />} />
            <Route exact path="/catalogo" element={<ItemDetailContainer />} />
            <Route path="/catalogo/:tag" element={<Catalogoo />} />
            <Route exact  path="/vistaPrev/:id" element={<ProductPage />} />
      </Routes>
      <Foot />
    </BrowserRouter>
  );
}

export default App;