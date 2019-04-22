import { combineReducers, Action, AnyAction, Dispatch } from 'redux'
import progressReducer from './progress/reducer'
import authReducer from './auth/reducer'
import profileReducer from './profile/reducer'
import imageReducer from './image/reducer'
import postReducer from './post/reducer'
import followReducer from './follow/reducer'
import createTrainingReducer from './createTraining/reducer'

import { AuthState } from './auth/types'
import { ProgressState } from './progress/types';
import { ProfileState } from './profile/types';
import { ImageState } from './image/types';
import { PostsState } from './post/types';
import { FollowState } from './follow/types';
import { CreateTrainingState } from './createTraining/types';

export interface AppState {
  Progress: ProgressState
  Auth: AuthState
  Profile: ProfileState
  Image: ImageState
  Posts: PostsState
  Follow: FollowState
  CreateTraining: CreateTrainingState
}

export const rootReducer = combineReducers<AppState>({
  Progress: progressReducer,
  Auth: authReducer,
  Profile: profileReducer,
  Image: imageReducer,
  Posts: postReducer,
  Follow: followReducer,
  CreateTraining: createTrainingReducer
})

export interface ConnectedReduxProps<A extends Action = AnyAction>{
  dispatch: Dispatch<A>
}