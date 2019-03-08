import axios from 'axios'
import { ProgresActionTypes, Progress, ProgressKey, SelectedProgress } from './types'
import { API_URL } from '../../utils/misc'
import { Dispatch } from 'redux';

const URL = `${API_URL}/progress`

export const selectDate = (date: any) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProgresActionTypes.SELECT_DATE,
      payload: date
    })
  }
}

export const pickDate = (date: any) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProgresActionTypes.PICK_DATE,
      payload: date
    })
  }
}

export const selectProgress = (progress: ProgressKey) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProgresActionTypes.SELECTED_PROGRESS,
      payload: progress
    })
  }
}

export const handleProgressModal = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProgresActionTypes.HANDLE_PROGRESS_MODAL
    })
  }
}

export const setLastProgress = (value: any) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProgresActionTypes.SET_LAST_PROGRESS,
      payload: value
    })
  }
}

export const handleCalendarModal = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProgresActionTypes.HANDLE_CALENDAR_MODAL
    })
  }
}

export const fetchProgress = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProgresActionTypes.FETCH_PROGRESS_REQ
    })

    axios.get(`${URL}/browse`)
      .then(response => {
        dispatch({
          type: ProgresActionTypes.FETCH_PROGRESS_SUC,
          payload: response.data
        })
      })
  }
}

export const createProgress = (progress: SelectedProgress) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProgresActionTypes.CREATE_PROGRESS_REQ,
      payload: progress
    })
    
    axios.post(URL, { ...progress })
    .then(response => {
      dispatch({ 
        type: ProgresActionTypes.CREATE_PROGRESS_SUC,
        payload: response.data
      })
    })
    .catch(response => {
      dispatch({
        type: ProgresActionTypes.CREATE_PROGRESS_ERR,
        payload: response.response.data
      })
    })
  }
}

export const updateProgress = (progress: any) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProgresActionTypes.UPDATE_PROGRESS_REQ
    })

    axios.put(URL, progress)
    .then(response => {
      dispatch({ 
        type: ProgresActionTypes.UPDATE_PROGRESS_SUC,
        payload: response.data
      })
    })
    .catch(response => {
      dispatch({
        type: ProgresActionTypes.UPDATE_PROGRESS_ERR,
        payload: response.response.data
      })
    })
  }
}

export const deleteProgress = (progressId: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProgresActionTypes.DELETE_PROGRESS_REQ
    })

    const data : any = {
      id: progressId
    }

    axios.delete(URL, data)
    .then(response => {
      dispatch({ 
        type: ProgresActionTypes.DELETE_PROGRESS_SUC,
        payload: response.data
      })
    })
    .catch(response => {
      dispatch({
        type: ProgresActionTypes.DELETE_PROGRESS_ERR,
        payload: response.response.data
      })
    })
  }
}