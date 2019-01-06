import {   
  FETCH_PROGRESS_REQ,
  FETCH_PROGRESS_SUC,
  FETCH_PROGRESS_ERR,
  CREATE_PROGRESS_REQ,
  CREATE_PROGRESS_SUC,
  CREATE_PROGRESS_ERR,
  UPDATE_PROGRESS_REQ,
  UPDATE_PROGRESS_SUC,
  UPDATE_PROGRESS_ERR,
  DELETE_PROGRESS_REQ,
  DELETE_PROGRESS_SUC,
  DELETE_PROGRESS_ERR,
  SELECTED_PROGRESS,
  HANDLE_PROGRESS_MODAL,
  HANDLE_CALENDAR_MODAL,
  SELECT_DATE,
  PICK_DATE,
  SET_LAST_PROGRESS,
  USER_LOGOUT
} from './types'

const initialState = {
  progress: [],
  progressLoading: true,
  error: null,
  selectedProgress: "biceps",
  modal: false,
  lastProgress: 0,
  calendarModal: false,
  selectedDate: new Date().toISOString().substring(0,10),
  pickedDate: new Date().toISOString().substring(0,10)
}

const progressReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGOUT: {
      return {
        ...initialState
      }
    }
    case HANDLE_PROGRESS_MODAL: {
      return {
        ...state,
        modal: !state.modal ? true : false 
      }
    }
    case HANDLE_CALENDAR_MODAL: {
      return {
        ...state,
        calendarModal: !state.calendarModal ? true : false 
      }
    }
    case SET_LAST_PROGRESS: {
      return {
        ...state,
        lastProgress: action.payload
      }
    }
    case SELECT_DATE: {
      return {
        ...state,
        selectedDate: action.payload
      }
    }
    case PICK_DATE: {
      return {
        ...state,
        pickedDate: action.payload
      }
    }
    case SELECTED_PROGRESS: {
      return {
        ...state,
        selectedProgress: action.payload
      }
    }
    case FETCH_PROGRESS_REQ: {
      return { 
        ...state,
        progressLoading: true,
        error: null
      }
    }
    case FETCH_PROGRESS_SUC: {
      return { 
        ...state, 
        progress: action.payload,
        progressLoading: false
      }
    }
    case FETCH_PROGRESS_ERR: {
      return {
        ...state,
        progress: [],
        progressLoading: false,
        error: action.payload
      }
    }

    case CREATE_PROGRESS_REQ: {
      
      const payload = {
        ...action.payload,
        createdAt: new Date(action.payload.createdAt).toISOString().substr(0,19)
      }
      debugger;

      const findone = state.progress.find(x => x.createdAt === payload.createdAt)
      if(findone == undefined){
        
      }

      const progress = state.progress.map(item => {

        if(item.createdAt === payload.createdAt){
          let newItem = {}
          Object.keys(item).forEach(key => {
            if(key !== 'createdAt' && action.payload.hasOwnProperty(key)){
              newItem = {
                ...newItem,
                [key]: payload[key]
              }
            }
            else {
              newItem = {
                ...newItem, 
                [key]: item[key]
              }
            }
          })
          return newItem
        } 
        else 
        {
          return item
        }
      })

      return {
        ...state,
        progressLoading: true,
        progress: progress
      }
    }

    case CREATE_PROGRESS_SUC: {
      return {
        ...state,
        progressLoading: false
      }
    }

    // case CREATE_PROGRESS_ERR: {
    //   return {
    //     ...state,

    //   }
    // }

    case UPDATE_PROGRESS_REQ: {
      return {
        ...state,

      }
    }

    case UPDATE_PROGRESS_SUC: {
      return {
        ...state,

      }
    }

    // case UPDATE_PROGRESS_ERR: {
    //   return {
    //     ...state,

    //   }
    // }

    case DELETE_PROGRESS_REQ: {
      return {
        ...state,

      }
    }

    case DELETE_PROGRESS_SUC: {
      return {
        ...state,

      }
    }

    // case DELETE_PROGRESS_ERR: {
    //   return {
    //     ...state,

    //   }
    // }

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