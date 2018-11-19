import axios from 'axios'
import { ProgressActionTypes } from './types'
import { API_URL } from '../../consts'
import { Dispatch, AnyAction } from 'redux'

const URL = `${API_URL}/progress/browse/`

export const fetchProgress = (userId: string) => {
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch({
      type: ProgressActionTypes.FETCH_REQUEST
    })

    axios.get(`${URL}${userId}`)
      .then(response => {
        dispatch({ 
          type: ProgressActionTypes.FETCH_SUCCESS,
          payload: response.data 
        })
      })
      .catch(error => {
        dispatch({
          type: ProgressActionTypes.FETCH_ERROR,
          payload: error
        })
      })
  }
}