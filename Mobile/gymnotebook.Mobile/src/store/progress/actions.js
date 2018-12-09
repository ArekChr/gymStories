import axios from 'axios'
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

    axios(`${URL}${userId}`)
      .then(response => {
        dispatch({ 
          type: FETCH_SUCCESS,
          payload: response.data
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
