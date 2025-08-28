
import CartWidget from './CartWidget';
import '../../css/App.css';
import  Mburger  from './Mburger';
import  Perfil  from './Perfil';
import IraHome from './IraHome';

export const Navbar = () => {


  return (
    <>
      
      <nav>
        <div className='container'>
          <h1 className='logo'>GamerZOne</h1>
          <IraHome/>
          <Perfil />
          <CartWidget />
          <Mburger />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
