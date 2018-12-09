import {   
  FETCH_REQUEST,
  FETCH_SUCCESS
  } from './types'

const initialState = {
  progress: [],
  progressLoading: true
}

const progressReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST: {
      return { 
        ...state,
        progressLoading: true
      }
    }
    case FETCH_SUCCESS: {
      return { 
        ...state, 
        progress: action.payload,
        progressLoading: false
      }
    }
    default: {
      if (state === undefined) {
        return {
          progress: [],
          progressLoading: false
        }
      }
      return state;
    }
  }
}

export default progressReducer