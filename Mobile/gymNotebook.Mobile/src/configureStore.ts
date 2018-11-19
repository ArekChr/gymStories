import { Store, createStore } from 'redux'
import { ApplicationState, rootReducer } from './store'

  const store = createStore<ApplicationState>(
    rootReducer
  )
  export default store
