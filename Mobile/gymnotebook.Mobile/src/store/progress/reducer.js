import {   
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_ERROR,
  SELECTED } from './types'

const progressReducer = (state, action) => {
  switch (action.type) {
    case FETCH_REQUEST: {
      return { 
        ...state, 
      }
    }
    case FETCH_SUCCESS: {
      return { 
        ...state, 
        progress: action.payload 
      }
    }
    default: {
      if (state === undefined) {
        return {
          progress: []
        }
      }

      return state;
    }
  }
}

export default progressReducer