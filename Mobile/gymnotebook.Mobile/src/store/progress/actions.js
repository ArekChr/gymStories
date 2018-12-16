import axios from 'axios'
import {   
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_ERROR 
} from './types'
import { API_URL } from '../../utils/misc'

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
      .catch(response => {
        dispatch({
          type: FETCH_ERROR,
          payload: response.data
        })
      })
  }
}
