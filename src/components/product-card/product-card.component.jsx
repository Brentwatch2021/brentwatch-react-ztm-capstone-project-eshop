import { useContext } from 'react';
import Button from '../button/button.component';
import './product-card.styles.scss'
import { CartContext } from '../../contexts/cart.context';
import { addItemToCart,removeItemFromCart,clearItemFromCart } from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

const ProductCard = ({product}) => 
{
    const {name,price,imageUrl} = product;
    //const {addItemToCart } = useContext(CartContext);
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);


    const AddProductToCart = (event) => {
        dispatch(addItemToCart(cartItems,product));
    }

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={name} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>R{price}</span>  
            </div>
            <Button onClick={AddProductToCart} buttonType='inverted'>Add to Cart</Button>
        </div>
    );
}

export default ProductCard;