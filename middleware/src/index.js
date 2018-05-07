import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';
import './index.css';
import App from './containers/App';

import Async from './middleware/async';

// const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(Async));
// const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
