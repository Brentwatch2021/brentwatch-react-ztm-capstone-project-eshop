////////////////////// REDUX TOOLKIT //////////////////////////////

import { takeLatest,put,call,all } from 'redux-saga/effects';
import { getCategoriesAndDocumentsForReduxSelector  } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesStart,fetchCategoriesSuccess,fetchCategoriesFailed } from './categoriesSlice';

export function* fetchCategoriesAsync(){
    try{
        const categoriesArray = yield call(getCategoriesAndDocumentsForReduxSelector, 'categories');
        yield put(fetchCategoriesSuccess(categoriesArray));
    }
    catch(error)
    {
        yield put(fetchCategoriesFailed(error));
    }
}

export function* onFetchCategories()
{
    yield takeLatest(fetchCategoriesStart.type,fetchCategoriesAsync);
}


export function* categoriesReduxToolkitSaga()
{
    yield all([call(onFetchCategories)]);
}
