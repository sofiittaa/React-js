import { Iframe } from "./Components/Iframe";
import Foot from "./Components/Foot";
import ItemDetailContainer from "./Components/ItemDetailContainer";
import Navbar from "../src/Components/Navbar"
import MiLinea from "../src/Components/MiLinea";
import React, { useState } from 'react';
import { Moon, Sun } from "lucide-react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Swal from 'sweetalert2'


/* ------------ FONTS -------------- */
import "@fontsource/quicksand";  
import "@fontsource/cormorant-garamond";


/* ------------- APP --------------- */

function App() {
 /*  const [dark, setDark] = useState(true);

  const toggle = () => setDark(!dark); */
  return (
    <>  
      <BrowserRouter>
    {/*   <button className={`boton ${dark ? "btn-dark" : "btn-light"}`} onClick={toggle}>
        {dark ? <Moon size={35} color="white" /> : <Sun size={35} color="white" />}
      </button> */}
      <Navbar />
      <Iframe />
      <MiLinea titulo="Catalogo" />
      <ItemDetailContainer />
        <Foot />
      </BrowserRouter>

    </>
  )
}

export default App
