import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from './utils/stripe/stripe.utils';

ReactDOM.render(
  <React.StrictMode>
    {/* Loading can be loading sign when state is loading before rehydrating the app */}
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* By having two stores the entire app crashes TODO Investigate */}
    {/* <Provider store={redux_toolkit_store}> */}
    <BrowserRouter>
      {/* Stripe Elements */}
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </BrowserRouter>
    </PersistGate>
    </Provider>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
