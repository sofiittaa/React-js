import { createRoot } from 'react-dom/client'
import '../css/index.css'
import App from './App.jsx'
import { CartCustomProvider } from "./Components/CartCustomProvider.jsx"

createRoot(document.getElementById('root')).render(


  <CartCustomProvider>
    
      <App />
</CartCustomProvider>

)


