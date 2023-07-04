import { useContext } from 'react';
import Button from '../button/button.component';
import './product-card.styles.scss'
import { CartContext } from '../../contexts/cart.context';


const ProductCard = ({product}) => 
{
    const {name,price,imageUrl} = product;
    const {addItemToCart } = useContext(CartContext);

    const AddProductToCart = (event) => {
        addItemToCart(product);
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