import CartWidget from './CartWidget'
import '../../css/App.css'

export const Navbar = () => {

    return (
        <nav>
            <div className='container'>
                <h1 className='logo'>GamerZOne</h1>
                <a className='links' href=""></a>
                <a className='links' href=""></a>
                <a className='links' href=""></a>
                <CartWidget />
            </div>
        </nav>
    );
}

export default Navbar;