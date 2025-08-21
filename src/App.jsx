import { Iframe } from "./Components/Iframe";
import Foot from "./Components/Foot";
import ItemDetailContainer from "./Components/ItemDetailContainer";
import Navbar from "../src/Components/Navbar"
import MiLinea from "../src/Components/MiLinea";
/* ------------ FONTS -------------- */

import '@fontsource/almendra';




function App() {

  return (
    <>
      <Navbar />
      <Iframe />
      <MiLinea titulo="Catalogo" />
      <ItemDetailContainer />
      <Foot />
    </>
  )
}

export default App
