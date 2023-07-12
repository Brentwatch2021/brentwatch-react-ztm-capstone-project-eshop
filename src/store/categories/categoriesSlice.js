import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    isLoading: false,
    error: null,
};

const categoriesSlice = createSlice({
    name:'categories',
    initialState,
    reducers: {
        fetchCategoriesStart: (state) => {
            state.isLoading = true;
        },
        fetchCategoriesSuccess: (state, action) =>
        {
            state.isLoading = false;
            state.categories = action.payload;
        },
        fetchCategoriesFailed: (state, action) =>
        {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

//export const { fetchCategoriesStart,fetchCategoriesSuccess,fetchCategoriesFailed } = categoriesSlice.actions;

export default categoriesSlice;
