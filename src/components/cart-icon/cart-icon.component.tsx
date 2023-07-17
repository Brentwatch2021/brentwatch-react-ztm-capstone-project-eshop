import { CartIconContainer,ItemCount } from './cart-icon.styles'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartIcon = () => 
{   
    //const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);
    const dispatch = useDispatch();

    const toggleCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
    
    return (
        <CartIconContainer onClick={toggleCartOpen}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;