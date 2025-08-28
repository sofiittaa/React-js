/* ----------- COMPONENTS ----------- */
import { Iframe } from "./Components/Iframe";
import Foot from "./Components/Foot";
import ItemDetailContainer from "./Components/ItemDetailContainer";
import Navbar from "./Components/Navbar";
import MiLinea from "./Components/MiLinea";
import Casa from "./Components/Casa";
import Bestplay from "./Components/Bestplay";
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
            <Route path="/home" element={<Casa />} />
           <Route path="/" element={<Iframe />} />
            <Route path="/" element={<Bestplay />} />
            <Route path="/" element={<MiLinea titulo="Videojuegos populares" />} />
            <Route path="/Catalogo" element={<ItemDetailContainer />} />
          </Routes>
        <Foot />
    </BrowserRouter>
  );
}

export default App;