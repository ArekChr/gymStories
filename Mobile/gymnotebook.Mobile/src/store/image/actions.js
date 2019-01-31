import RNFetchBlob from 'rn-fetch-blob'
import {
  FETCH_IMAGE_REQ,
  FETCH_IMAGE_SUC
} from './types'
import { API_URL } from '../../utils/misc'

const URL = `${API_URL}/Image`

export const fetchImage = (id, callback) => {
  return (dispatch) => {

  dispatch({
    type: FETCH_IMAGE_REQ
  });

  RNFetchBlob
    .config({
      fileCache : true,
    })
    .fetch('GET', `${URL}/${id}`, {})
    .then((res) => {
      dispatch({
        type: FETCH_IMAGE_SUC,
        payload: res.path()
      }); 
      console.log('The file saved to ', res.path())
      callback(res)
    })
  }
}