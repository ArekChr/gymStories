import { PostActionTypes, PostsState } from './types'
import { Reducer } from 'redux';

const initialState: PostsState = {
  loading: false,
  posts: undefined
}

const postReducer: Reducer<PostsState> = (state = initialState, action) => {
  switch(action.type){
    case PostActionTypes.FETCH_POST_REQ: {
      return {
        ...state,
        loading: true
      }
    }
    case PostActionTypes.FETCH_POST_SUC: {
      return {
        ...state,
        loading: false,
        posts: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export default postReducer;