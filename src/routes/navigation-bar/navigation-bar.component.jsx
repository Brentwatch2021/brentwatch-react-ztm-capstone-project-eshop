import { Link, Outlet } from 'react-router-dom';
import './navigation-bar.styles.jsx'
import { Fragment, useContext } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { UserContext } from '../../contexts/user.context.jsx';
import { signOutUser } from '../../utils/firebase/firebase.utils.js';
import CartIcon from '../../components/cart-icon/cart-icon.component.jsx';
import CartDropDown from '../../components/cart-drop-down/cart-drop-down.component.jsx';
import { CartContext } from '../../contexts/cart.context.jsx';
import { LogoContainer, NavLink, NavLinks, NavigationContainer } from './navigation-bar.styles.jsx';

const NavigationBar = () => {
    // This will caus a rerender when 
    // the user context is updated from the sign in
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext);


    return (
        <Fragment>
        <NavigationContainer>
          <LogoContainer to='/'>
            <CrwnLogo />
          </LogoContainer>
          <NavLinks>
            <NavLink to='/shop'>SHOP</NavLink>
  
            {currentUser ? (
              <NavLink as='span' onClick={signOutUser}>
                SIGN OUT
              </NavLink>
            ) : (
              <NavLink to='/auth'>SIGN IN</NavLink>
            )}
            <CartIcon />
          </NavLinks>
          {isCartOpen && <CartDropDown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    );
}

export default NavigationBar;