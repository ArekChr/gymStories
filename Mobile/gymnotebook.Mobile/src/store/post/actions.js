import axios from 'axios';
import {
  FETCH_POST_REQ,
  FETCH_POST_SUC
} from './types'
import { API_URL } from '../../utils/misc'

const URL = `${API_URL}/Post`;

export const fetchPosts = (startDate, quantity, cb) => {
  return (dispatch) => {

    dispatch({
      type: FETCH_POST_REQ
    })

    axios.get(URL, { params: { startDate: startDate, quantity: quantity }})
      .then(response => {
        debugger;
        dispatch({
          type: FETCH_POST_SUC,
          payload: response.data
        })
        if(cb instanceof Function){
          cb()
        }
      }
    )
  }
}