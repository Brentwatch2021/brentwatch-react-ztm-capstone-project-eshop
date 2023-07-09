///////////////////////////// REDUX TOOLKIT /////////////////////////////
///////////////////////////// REDUX TOOLKIT /////////////////////////////
///////////////////////////// REDUX TOOLKIT /////////////////////////////
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from './redux_toolkit_rootReducer';
import createSagaMiddleware from 'redux-saga';
import { reduxtoolkit_rootSaga } from './redux_toolkit_rootSaga';

const sagaMiddleware = createSagaMiddleware();

// const loggerMiddleware = (store) => (next) => (action) => 
// {
//   if(!action.type) {
//     return next(action);
//   }

//   console.log('type: ', action.type)
//   console.log('type: ', action.payload)


//   next(action);
// }

const middlewares = [sagaMiddleware];

if(process.env.NODE_ENV === 'development')
{
 // middlewares.push(loggerMiddleware);
}

const redux_toolkit_store = configureStore({
  reducer:rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      thunk:true,
      serializableCheck: false,
    }).concat(middlewares),
    devTools:
      process.env.NODE_ENV !== 'production' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__,
});

sagaMiddleware.run(reduxtoolkit_rootSaga);

export default redux_toolkit_store;
