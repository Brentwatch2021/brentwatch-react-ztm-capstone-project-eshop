import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { addItemToCart } from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { FC } from 'react';
import { CategoryItem } from '../../store/categories/category.types';
import { Footer, Name, Price, ProductCardContainer } from './product-card.styles';

type ProductCardProps = {
    product:CategoryItem;
}


const ProductCard: FC<ProductCardProps> = ({product}) => 
{
    const {name,price,imageUrl} = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);


    const AddProductToCart = () =>  {
        dispatch(addItemToCart(cartItems,product));
    }

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={name} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button onClick={AddProductToCart} buttonType={BUTTON_TYPE_CLASSES.inverted}>Add to Cart</Button>
            </ProductCardContainer>
    );
}

export default ProductCard;