import { Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';


import './shop.styles.tsx';
import { Suspense, lazy, useEffect } from 'react';
//import { getCategoriesAndDocumentsForReduxSelector } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesStart } from '../../store/categories/category.action'
import Spinner from '../../components/spinner/spinner.component';
//import { fetchCategoriesStart } from '../../store/categories/categoriesSlice'
//import redux_toolkit_store from '../../store/redux_toolkit_store';

const CategoriesPreview = lazy(() => import('../categories-preview/categories-preview.component'));
const Category = lazy(() => import('../category/category.component'));


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
    <Suspense fallback={<Spinner/>}>
    <Routes>
        <Route index element={<CategoriesPreview />} />
        <Route path=':category' element={<Category />} />
    </Routes>
    </Suspense>
   );
};

export default Shop;