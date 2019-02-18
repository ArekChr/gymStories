import { ImageActionTypes, ImageState } from './types'
import { Reducer } from 'redux';

const initialState: ImageState = {
  loading: false,
  path: undefined
}

const imageReducer: Reducer<ImageState>  = (state = initialState, action) => {
  switch(action.type){
    case ImageActionTypes.FETCH_IMAGE_REQ: {
      return {
        ...state,
        loading: true
      }
    }
    case ImageActionTypes.FETCH_IMAGE_SUC: {
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