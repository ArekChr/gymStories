import RNFetchBlob from 'rn-fetch-blob'
import {
  FETCH_IMAGE_REQ,
  FETCH_IMAGE_SUC
} from './types'
import { API_URL } from '../../utils/misc'
import { Dispatch } from 'redux';

const URL = `${API_URL}/Image`

export const fetchImage = (id: string, callback?: Function) => {
  return (dispatch: Dispatch) => {

  dispatch({
    type: FETCH_IMAGE_REQ
  });

  RNFetchBlob
    .config({
      fileCache : true,
    })
    .fetch('GET', `${URL}/${id}`, {})
    .then((res?: any) => {
      dispatch({
        type: FETCH_IMAGE_SUC,
        payload: res.path()
      }); 
      console.log('The file saved to ', res.path())
      if(callback instanceof Function){
        callback(res)
      }
    })
  }
}