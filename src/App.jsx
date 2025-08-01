import ItemListContainer from "./Components/ItemListContainer";
import Navbar from "./Components/Navbar"


function App() {
  const nombre = prompt("Hola, Como te llamas?");

  const mensaje = "Bienevindx " + nombre;
  return (
    <>
      <Navbar />
      <ItemListContainer mensaje={mensaje} />
    </>
  )
}


export default App
