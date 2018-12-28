import axios from 'axios'
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
  SET_LAST_PROGRESS
} from './types'
import { API_URL } from '../../utils/misc'

const URL = `${API_URL}/progress`

export const selectDate = (date) => {
  return dispatch => {
    dispatch({
      type: SELECT_DATE,
      payload: date
    })
  }
}

export const pickDate = (date) => {
  return dispatch => {
    dispatch({
      type: PICK_DATE,
      payload: date
    })
  }
}

export const selectProgress = (progress) => {
  return dispatch => {
    dispatch({
      type: SELECTED_PROGRESS,
      payload: progress
    })
  }
}

export const handleProgressModal = () => {
  return dispatch => {
    dispatch({
      type: HANDLE_PROGRESS_MODAL
    })
  }
}

export const setLastProgress = (value) => {
  return dispatch => {
    dispatch({
      type: SET_LAST_PROGRESS,
      payload: value
    })
  }
}

export const handleCalendarModal = () => {
  return dispatch => {
    dispatch({
      type: HANDLE_CALENDAR_MODAL
    })
  }
}

export const fetchProgress = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_PROGRESS_REQ
    })

    axios.get(`${URL}/browse`)
      .then(response => {
        dispatch({
          type: FETCH_PROGRESS_SUC,
          payload: response.data
        })
      })
      .catch(response => {
        dispatch({
          type: FETCH_PROGRESS_ERR,
          payload: response.response.data
        })
      })
  }
}

export const createProgress = (progress) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_PROGRESS_REQ
    })

    axios.post({URL,
      data: {
        ...progress
      }
    })
    .then(response => {
      dispatch({ 
        type: CREATE_PROGRESS_SUC,
        payload: response.data
      })
    })
    .catch(response => {
      dispatch({
        type: CREATE_PROGRESS_ERR,
        payload: response.response.data
      })
    })
  }
}

export const updateProgress = (progress) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_PROGRESS_REQ
    })

    axios.put({URL,
      data: {
        ...progress
      }
    })
    .then(response => {
      dispatch({ 
        type: UPDATE_PROGRESS_SUC,
        payload: response.data
      })
    })
    .catch(response => {
      dispatch({
        type: UPDATE_PROGRESS_ERR,
        payload: response.response.data
      })
    })
  }
}

export const deleteProgress = (progressId) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_PROGRESS_REQ
    })

    axios.delete({URL,
      data: {
        id: progressId
      }
    })
    .then(response => {
      dispatch({ 
        type: DELETE_PROGRESS_SUC,
        payload: response.data
      })
    })
    .catch(response => {
      dispatch({
        type: DELETE_PROGRESS_ERR,
        payload: response.response.data
      })
    })
  }
}