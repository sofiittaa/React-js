
import CartWidget from './CartWidget';
import '../../css/App.css';
import { Mburger } from './Mburger';
import { Perfil } from './Perfil';

export const Navbar = () => {


  return (
    <>
      
      <nav>
        <div className='container'>
          <h1 className='logo'>GamerZOne</h1>
          <a className='links' href=""></a>
          <a className='links' href=""></a>
          <a className='links' href=""></a>
          <Perfil />
          <CartWidget />
          <Mburger />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
