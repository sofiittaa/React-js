import CartWidget from './CartWidget'
import '../../css/App.css'
import ItemListContainer from './ItemListContainer';

function Navbar() {

    return (
        <nav>
            <div className='container'>
                <h1 className='logo'>GamerZOne</h1>

                <CartWidget />

            </div>
        </nav>
    );
}

export default Navbar;