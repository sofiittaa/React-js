import CartWidget from './CartWidget'
import '../../css/App.css'

export const Navbar = () => {

    return (
        <nav>
            <div className='container'>
                <h1 className='logo'>GamerZOne</h1>
                <a className='links' href="">Home</a>
                <a className='links' href="">Comprar</a>
                <a className='links' href="">Contacto</a>
                <CartWidget />
            </div>
        </nav>
    );
}

export default Navbar;