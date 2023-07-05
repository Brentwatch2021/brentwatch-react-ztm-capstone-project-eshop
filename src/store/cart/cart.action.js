import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

// Internal Action Helper methods
const addCartItem = (cartItems, productToAdd) => 
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


const removeCartItem = (cartItems,cartItemToRemove) => {
        const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

        if(existingCartItem.quantity === 1)
        {
                return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
        }

        return cartItems.map((cartItem) => {
                return cartItem.id === cartItemToRemove.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem;
        })
}

const clearCartItem = (cartItems, cartItemToClear) => 
{
        return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

// Public Helper functions

export const addItemToCart = (cartItems, productToAdd) => {
        const newCartItems = addCartItem(cartItems,productToAdd);
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, productToRemove) => 
{
        const newCartItems = removeCartItem(cartItems,productToRemove);
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToRemove) =>
{
        const newCartItems = clearCartItem(cartItems,cartItemToRemove);
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const setIsCartOpen = (isOpen) => 
{
        return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen)
}





