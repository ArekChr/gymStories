import {applyMiddleware, compose, createStore} from 'redux'
import { rootReducer } from './store'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(...middleware),
  // other store enhancers if any
));

const initialState = {};
const enhancers = [];
const middleware = [];

if (process.env.NODE_ENV === 'development') {
  const __REDUX_DEVTOOLS_EXTENSION__ = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof __REDUX_DEVTOOLS_EXTENSION__ === 'function') {
    enhancers.push(__REDUX_DEVTOOLS_EXTENSION__())
  }
}

const composedEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//   rootReducer,
//   initialState,
//   composedEnhancers
// );

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(...middleware),
  // other store enhancers if any
));

export default store
