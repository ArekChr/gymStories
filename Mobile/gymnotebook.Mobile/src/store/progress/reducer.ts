import { ProgresActionTypes, Progress, ProgressState } from './types'
import { Reducer } from 'redux'

import { USER_LOGOUT } from '../auth/types'

const initialState: ProgressState = {
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

const progressReducer: Reducer<ProgressState> = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGOUT: {
      return {
        ...initialState
      }
    }
    case ProgresActionTypes.HANDLE_PROGRESS_MODAL: {
      return {
        ...state,
        modal: !state.modal ? true : false 
      }
    }
    case ProgresActionTypes.HANDLE_CALENDAR_MODAL: {
      return {
        ...state,
        calendarModal: !state.calendarModal ? true : false 
      }
    }
    case ProgresActionTypes.SET_LAST_PROGRESS: {
      return {
        ...state,
        lastProgress: action.payload
      }
    }
    case ProgresActionTypes.SELECT_DATE: {
      return {
        ...state,
        selectedDate: action.payload
      }
    }
    case ProgresActionTypes.PICK_DATE: {
      return {
        ...state,
        pickedDate: action.payload
      }
    }
    case ProgresActionTypes.SELECTED_PROGRESS: {
      return {
        ...state,
        selectedProgress: action.payload
      }
    }
    case ProgresActionTypes.FETCH_PROGRESS_REQ: {
      return { 
        ...state,
        progressLoading: true,
        error: null
      }
    }
    case ProgresActionTypes.FETCH_PROGRESS_SUC: {
      return { 
        ...state, 
        progress: action.payload,
        progressLoading: false
      }
    }
    case ProgresActionTypes.FETCH_PROGRESS_ERR: {
      return {
        ...state,
        progress: [],
        progressLoading: false,
        error: action.payload
      }
    }

    case ProgresActionTypes.CREATE_PROGRESS_REQ: {
      
      const payload = {
        ...action.payload,
        createdAt: new Date(action.payload.createdAt).toISOString().substr(0,19)
      }
      debugger;

      const findone = state.progress.find((x: Progress) => x.createdAt === payload.createdAt)
      if(findone == undefined){
        
      }

      const progress = state.progress.map((item: Progress) => {

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
    case ProgresActionTypes.CREATE_PROGRESS_SUC: {
      return {
        ...state,
        progressLoading: false
      }
    }
    // case ProgresActionTypes.CREATE_PROGRESS_ERR: {
    //   return {
    //     ...state,

    //   }
    // }
    case ProgresActionTypes.UPDATE_PROGRESS_REQ: {
      return {
        ...state,

      }
    }
    case ProgresActionTypes.UPDATE_PROGRESS_SUC: {
      return {
        ...state,

      }
    }
    // case ProgresActionTypes.UPDATE_PROGRESS_ERR: {
    //   return {
    //     ...state
    //   }
    // }
    case ProgresActionTypes.DELETE_PROGRESS_REQ: {
      return {
        ...state
      }
    }
    case ProgresActionTypes.DELETE_PROGRESS_SUC: {
      return {
        ...state
      }
    }
    // case ProgresActionTypes.DELETE_PROGRESS_ERR: {
    //   return {
    //     ...state
    //   }
    // }
    default: {
      return state;
    }
  }
}

export default progressReducer