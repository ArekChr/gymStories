import {
  FETCH_POST_REQ,
  FETCH_POST_SUC
} from './types'

const initialState = {
  loading: false,
  posts: undefined
}


const postReducer = (state = initialState, action) => {
  switch(action.type){
    case FETCH_POST_REQ: {
      return {
        ...state,
        loading: true
      }
    }
    case FETCH_POST_SUC: {
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