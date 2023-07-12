import { compose, createStore, applyMiddleware, Middleware} from 'redux';
//import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import storage from 'redux-persist/lib/storage'
import { PersistConfig, persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk';

import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga'



export type RootState = ReturnType<typeof rootReducer>

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
}

const sagaMiddleware = createSagaMiddleware();

// This is not good practise however I need to move on with the course
const loggerMiddleware = (store:any) => (next:any) => (action:any) => {
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
const middleWares = [
  process.env.NODE_ENV !== 'production' && loggerMiddleware,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

