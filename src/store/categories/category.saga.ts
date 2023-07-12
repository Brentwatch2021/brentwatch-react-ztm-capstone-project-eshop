//import { takeLatest, call, put, all } from 'redux-saga/effects';
// using TS 
import { takeLatest, call, put, all } from 'typed-redux-saga/macro';

import { getCategoriesAndDocumentsForReduxSelector  } from '../../utils/firebase/firebase.utils';

import { fetchCategoriesSuccess, fetchCategoriesFailure  } from './category.action'

import { CATEGORIES_ACTION_TYPES } from './category.types';


export function* fetchCategoriesAsync(){
    try{
        const categoriesArray = yield* call(getCategoriesAndDocumentsForReduxSelector);
        yield put(fetchCategoriesSuccess(categoriesArray));
    }
    catch(error)
    {
        yield put(fetchCategoriesFailure(error as Error));
    }
}



export function* onFetchCategories()
{
    yield takeLatest(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
        fetchCategoriesAsync
    );
}

export function* categoriesSaga()
{
    yield all([call(onFetchCategories)]);
}