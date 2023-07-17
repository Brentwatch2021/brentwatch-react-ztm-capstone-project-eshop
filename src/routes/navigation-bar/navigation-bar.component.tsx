import { Outlet } from 'react-router-dom';
import { Fragment } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-drop-down/cart-drop-down.component';
import { LogoContainer, NavLink, NavLinks, NavigationContainer } from './navigation-bar.styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user.action';

const NavigationBar = () => {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);

    const signOutHandler = () => dispatch(signOutStart());
    

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