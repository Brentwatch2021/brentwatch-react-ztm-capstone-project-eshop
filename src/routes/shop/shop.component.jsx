import { Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import './shop.styles.tsx';
import { useEffect } from 'react';
//import { getCategoriesAndDocumentsForReduxSelector } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesStart } from '../../store/categories/category.action'
//import { fetchCategoriesStart } from '../../store/categories/categoriesSlice'
//import redux_toolkit_store from '../../store/redux_toolkit_store';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      // const getCategoriesMap = async () => {
      // const categoriesArray = await getCategoriesAndDocumentsForReduxSelector('categories');
      //dispatch(setCategories(categoriesArray));
    //};

    //getCategoriesMap();
    dispatch(fetchCategoriesStart())
    //dispatch(fetchCategoriesStart());

  },[]);



  return (
    
    <Routes>
        <Route index element={<CategoriesPreview />} />
        <Route path=':category' element={<Category />} />
    </Routes>
    
   );
};

export default Shop;