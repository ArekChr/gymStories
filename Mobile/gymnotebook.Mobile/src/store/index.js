import { combineReducers } from 'redux'
import progressReducer from './progress/reducer'

export const rootReducer = combineReducers({
  progress: progressReducer
})