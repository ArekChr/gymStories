import {
  FETCH_POST_REQ,
  FETCH_POST_SUC
} from './types'

const initialState = {
  loading: false,
  path: undefined
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
      debugger;
      return {
        ...state,
        loading: false,
        path: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export default postReducer;