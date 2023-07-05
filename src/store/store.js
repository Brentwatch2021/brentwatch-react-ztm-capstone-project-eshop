import { compose, createStore, applyMiddleware} from 'redux';
//import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk';

import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga'

const sagaMiddleware = createSagaMiddleware();

const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type)
    {
        return next(action);
    }

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    //console.log('currentState: ', action.getState());


    next(action);

    console.log('next state: ', store.getState());

}

// const persistConfig = {
//     key: 'root',
//     storage,
//     blacklist:['user']
// }

const persistConfig = {
       key: 'root',
       storage,
       whitelist:['cart']
   }

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;


const persistedReducer = persistReducer(persistConfig, rootReducer)

// There is more middlewares to apply for now we just using this one
const middleWares = [process.env.NODE_ENV === 'development' && loggerMiddleware, thunk, sagaMiddleware].filter(Boolean);

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

