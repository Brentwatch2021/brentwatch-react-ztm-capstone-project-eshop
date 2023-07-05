import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import './shop.styles.scss';
import { useEffect } from 'react';
import { getCategoriesAndDocumentsForReduxSelector } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesStartAsync, setCategories } from '../../store/categories/category.action'
const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      // const getCategoriesMap = async () => {
      // const categoriesArray = await getCategoriesAndDocumentsForReduxSelector('categories');
      //dispatch(setCategories(categoriesArray));
    //};

    //getCategoriesMap();
    dispatch(fetchCategoriesStartAsync())

  },[]);



  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
   );
};

export default Shop;