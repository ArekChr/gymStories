import {   
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_ERROR
  } from './types'

const initialState = {
  progress: [],
  progressLoading: true,
  error: null
}

const progressReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST: {
      return { 
        ...state,
        progressLoading: true,
        error: null
      }
    }
    case FETCH_SUCCESS: {
      return { 
        ...state, 
        progress: action.payload,
        progressLoading: false
      }
    }
    case FETCH_ERROR: {
      return {
        ...state,
        progress: [],
        progressLoading: false,
        error: action.payload
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