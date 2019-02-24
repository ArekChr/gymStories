import { combineReducers, Action, AnyAction, Dispatch } from 'redux'
import progressReducer from './progress/reducer'
import authReducer from './auth/reducer'
import profileReducer from './profile/reducer'
import imageReducer from './image/reducer'
import postReducer from './post/reducer'
import userReducer from './user/reducer';

import { AuthState } from './auth/types'
import { ProgressState } from './progress/types';
import { ProfileState } from './profile/types';
import { ImageState } from './image/types';
import { PostsState } from './post/types';
import { UsersState } from './user/types';

export interface ApplicationState {
  Progress: ProgressState
  Auth: AuthState
  Profile: ProfileState
  Image: ImageState
  Posts: PostsState
  Users: UsersState
}

export const rootReducer = combineReducers<ApplicationState>({
  Progress: progressReducer,
  Auth: authReducer,
  Profile: profileReducer,
  Image: imageReducer,
  Posts: postReducer,
  Users: userReducer
})

export interface ConnectedReduxProps<A extends Action = AnyAction>{
  dispatch: Dispatch<A>
}