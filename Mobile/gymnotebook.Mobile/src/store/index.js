import { combineReducers } from 'redux'
import progressReducer from './progress/reducer'
import authReducer from './auth/reducer'
import profileReducer from './profile/reducer'

export const rootReducer = combineReducers({
  Progress: progressReducer,
  Auth: authReducer,
  Profile: profileReducer
})