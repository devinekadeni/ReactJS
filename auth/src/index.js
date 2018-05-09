import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';
import './index.css';
import App from './containers/App';
import { AUTH_USER } from './actions/types';

// const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// const store = createStore(rootReducer);
const token = localStorage.getItem('token');
if(token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
