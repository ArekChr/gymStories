import axios from 'axios';
import { PostActionTypes } from './types'
import { API_URL } from '../../utils/misc'
import { Dispatch } from 'redux';

const URL = `${API_URL}/Post`;

export const fetchPosts = (startDate: string, quantity: number, cb?: CallableFunction) => {
  return (dispatch: Dispatch) => {

    dispatch({
      type: PostActionTypes.FETCH_POST_REQ
    })

    axios.get(URL, { params: { startDate: startDate, quantity: quantity }})
      .then(response => {
        dispatch({
          type: PostActionTypes.FETCH_POST_SUC,
          payload: response.data
        })
        if(cb instanceof Function){
          cb()
        }
      }
    )
  }
}