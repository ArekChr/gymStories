import { PostActionTypes, PostsState } from './types'
import { Reducer } from 'redux';

const initialState: PostsState = {
  loading: false,
  loadingComments: false,
  posts: [],
  myPosts: [],
  comments: undefined
}

const postReducer: Reducer<PostsState> = (state = initialState, action) => {
  switch(action.type){
    case PostActionTypes.CREATE_POST_REQ: {
      return {
        ...state,
        loading: true
      }
    }
    case PostActionTypes.CREATE_POST_SUC: {
      return {
        ...state,
        myPosts: [
          ...state.myPosts,
          action.payload
        ],
        loading: false
      }
    }
    case PostActionTypes.FETCH_POST_REQ: {
      return {
        ...state,
        loading: true
      }
    }
    case PostActionTypes.FETCH_MY_POST_REQ: {
      return {
        ...state,
        loading: true
      }
    }
    case PostActionTypes.FETCH_MY_POST_SUC: {
      return {
        ...state,
        loading: false,
        myPosts: action.payload
      }
    }
    case PostActionTypes.FETCH_COMMENT_REQ: {
      return {
        ...state,
        loadingComments: true
      }
    }
    case PostActionTypes.FETCH_COMMENT_SUC: {
      return {
        ...state,
        loadingComments: false,
        comments: action.payload
      }
    }
    case PostActionTypes.CREATE_COMMENT_REQ: {
      if(state.comments === undefined){
        return {
          ...state,
          comments: [
            {...action.payload}
          ]
        }
      }
      return {
        ...state,
        comments: state.comments.concat([{
          ...action.payload
        }])
      }
    }
    case PostActionTypes.CREATE_COMMENT_SUC: {
      if(state.comments === undefined){
        return {
          ...state,
          comments: [
            {...action.payload}
          ]
        }
      }
      return {
        ...state,
        comments: [
          ...state.comments.filter(x => x.id !== undefined),
          action.payload
        ]
      }
    }
    case PostActionTypes.CLEAR_COMMENTS: {
      return {
        ...state,
        comments: undefined
      }
    }
    default: {
      return state
    }
  }
}

export default postReducer;