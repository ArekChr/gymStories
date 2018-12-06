import {   
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_ERROR,
  SELECTED } from './types'
import { API_URL } from '../../consts'

const URL = `${API_URL}/progress/browse/`

export const fetchProgress = (userId) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_REQUEST
    })

    fetch(`${URL}${userId}`)
      .then(response => response.json())
      .then(response => {
        dispatch({ 
          type: FETCH_SUCCESS,
          payload: response
        })
      })
      .catch(error => {
        dispatch({
          type: FETCH_ERROR,
          payload: error
        })
      })
  }
}