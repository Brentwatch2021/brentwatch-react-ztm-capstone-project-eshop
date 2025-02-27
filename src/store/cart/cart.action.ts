import { CategoryItem } from '../categories/category.types'
import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { CartItems } from '../../components/cart-drop-down/cart-drop-down.styles';


// Internal Action Helper methods
const addCartItem = (cartItems:CartItem[], productToAdd:CategoryItem):CartItem[] => 
{
        const existingCartItem = cartItems.find(
                (cartItem) => cartItem.id === productToAdd.id
        );


        if(existingCartItem)
        {
                return cartItems.map((cartItem) =>
                cartItem.id === productToAdd.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              );
        }

        return [...cartItems, {...productToAdd, quantity: 1}]
};


const removeCartItem = (cartItems:CartItem[],cartItemToRemove:CartItem):CartItem[] => {
        const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

        if(existingCartItem && existingCartItem.quantity === 1)
        {
                return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
        }

        return cartItems.map((cartItem) => {
                return cartItem.id === cartItemToRemove.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem;
        })
}

const clearCartItem = (cartItems:CartItem[], cartItemToClear:CartItem):CartItem[] => 
{
        return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}


// Action Types
export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN,boolean>;
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS,CartItem[]>;

export const setIsCartOpen = withMatcher(
        (boolean: boolean): SetIsCartOpen => 
                createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,boolean)
);

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems =>
         createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (cartItems:CartItem[], productToAdd:CategoryItem):SetCartItems => {
        const newCartItems = addCartItem(cartItems,productToAdd);
        return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems:CartItem[], cartItemToRemove:CartItem):SetCartItems => 
{
        const newCartItems = removeCartItem(cartItems,cartItemToRemove);
        return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems:CartItem[], cartItemToRemove:CartItem):SetCartItems =>
{
        const newCartItems = clearCartItem(cartItems,cartItemToRemove);
        return setCartItems(newCartItems);
};







