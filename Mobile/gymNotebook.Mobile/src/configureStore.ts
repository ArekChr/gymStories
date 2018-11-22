import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './store'
import { composeWithDevTools } from 'redux-devtools-extension';
const store = createStore(
  rootReducer
)

export default store
