import { combineReducers } from 'redux'
import progressReducer from './progress/reducer'
import authReducer from './auth/reducer'

export const rootReducer = combineReducers({
  progress: progressReducer,
  auth: authReducer
})