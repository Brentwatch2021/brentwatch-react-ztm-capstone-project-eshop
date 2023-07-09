import { combineReducers } from "@reduxjs/toolkit";
//import { userReducer } from "./user/user.reducer";
import  categoriesSlice  from "./categories/categoriesSlice";
//import { cartReducer } from "./cart/cart.reducer";




export const rootReducer = combineReducers({
    //user: userReducer,
    categories:categoriesSlice.reducer,
    //cart:cartReducer,
});