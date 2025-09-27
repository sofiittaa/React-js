
import CartWidget from './CartWidget';
import  MenuContainer  from './MenuContainer';
import  PerfilContainer from './PerfilContainer';
import IrAInicioContainer from './IrAInicioContainer';

export const NavbarContainer = () => {


  return (
    <>
      
      <nav>
        <div className='container'>
          <h1 className='logo'>GamerZOne</h1>
          <IrAInicioContainer/>
          <PerfilContainer />
          <CartWidget />
          <MenuContainer />
        </div>
      </nav>
    </>
  );
};

export default NavbarContainer;
