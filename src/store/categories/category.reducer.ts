import { Category } from "./category.types";
import {  fetchCategoriesFailure, fetchCategoriesStart, fetchCategoriesSuccess } from "./category.action";
import { AnyAction } from "redux";



export type CategoriesState = {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null
}

// a discrimnator union example as CategoryAction
export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE,
     action:AnyAction) =>
{
    // At this point the action type is Action however
    // if leave the destructring once it hits its desired 
    // function below it will be of type with or without action type
    //const { type, payload } = action;
    if(fetchCategoriesStart.match(action)){
        return { ...state, isLoading: true}
    }

    if(fetchCategoriesSuccess.match(action)){
        return { ...state,categories:action.payload, isLoading: false }
    }

    if(fetchCategoriesFailure.match(action)){
        return { ...state, error: action.payload, isLoading:false }; 
    }

    return state;
}