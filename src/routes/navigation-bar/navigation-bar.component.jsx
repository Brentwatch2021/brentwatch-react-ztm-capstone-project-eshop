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
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector.js';
import { selectIsCartOpen } from '../../store/cart/cart.selector.js';
import { signOutStart } from '../../store/user/user.action.js';

const NavigationBar = () => {
    // This will caus a rerender when 
    // the user context is updated from the sign in
    //const { currentUser }  = useContext(UserContext)
    //console.log('navigation bar')
    //console.log(currentUser)

    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    //const { isCartOpen } = useContext(CartContext);
    const isCartOpen = useSelector(selectIsCartOpen);

    const signOutHandler = (event) => 
    {
      dispatch(signOutStart());
    }

    return (
        <Fragment>
        <NavigationContainer>
          <LogoContainer to='/'>
            <CrwnLogo />
          </LogoContainer>
          <NavLinks>
            <NavLink to='/shop'>SHOP</NavLink>
  
            {currentUser ? (
              <NavLink as='span' onClick={signOutHandler}>
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