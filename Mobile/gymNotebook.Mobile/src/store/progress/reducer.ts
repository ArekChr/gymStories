import { ProgressState, ProgressActionTypes } from './types'
import { Actions } from './types'

const progressReducer = (state: ProgressState | undefined, action: Actions): ProgressState => {
  switch (action.type) {
    case ProgressActionTypes.FETCH_REQUEST: {
      return { 
        ...state!, 
      }
    }
    case ProgressActionTypes.FETCH_SUCCESS: {
      return { 
        ...state, 
        progress: action.progress 
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