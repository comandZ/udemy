import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import './index.css';
// import App from './Containers/App';
import App from './Containers/AppNoHook';
import reportWebVitals from './reportWebVitals';
import { searchRobots, requestRobots } from './reducers';
import 'tachyons';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

const logger = createLogger();

const rootReducer = combineReducers({searchRobots, requestRobots});
const store = 
  createStore(rootReducer, applyMiddleware(thunkMiddleware));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Provider store={store}>
      <App/>
    </Provider>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
