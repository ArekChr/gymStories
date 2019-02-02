import { combineReducers } from 'redux'
import progressReducer from './progress/reducer'
import authReducer from './auth/reducer'
import profileReducer from './profile/reducer'
import imageReducer from './image/reducer'
import postReducer from './post/reducer'

export const rootReducer = combineReducers({
  Progress: progressReducer,
  Auth: authReducer,
  Profile: profileReducer,
  Image: imageReducer,
  Posts: postReducer
})