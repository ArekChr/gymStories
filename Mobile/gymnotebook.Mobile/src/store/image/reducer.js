import {
  FETCH_IMAGE_REQ,
  FETCH_IMAGE_SUC
} from './types'

const initialState = {
  loading: false,
  path: undefined
}

const imageReducer = (state = initialState, action) => {
  switch(action.type){
    case FETCH_IMAGE_REQ: {
      return {
        ...state,
        loading: true
      }
    }
    case FETCH_IMAGE_SUC: {
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

export default imageReducer;