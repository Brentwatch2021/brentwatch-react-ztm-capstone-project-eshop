import { CartIconContainer,ItemCount } from './cart-icon.styles'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';


const CartIcon = () => 
{   
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const toggleCartOpen = (event) => 
    {
        setIsCartOpen(!isCartOpen);
    }

    return (
        <CartIconContainer onClick={toggleCartOpen}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;