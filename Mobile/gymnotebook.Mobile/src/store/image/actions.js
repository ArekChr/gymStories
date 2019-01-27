import RNFetchBlob from 'rn-fetch-blob'

import { API_URL } from '../../utils/misc'

const URL = `${API_URL}/Image`

export const fetchImage = (id, callback) => {
 return (dispatch) => {

  RNFetchBlob
    .config({
      fileCache : true,
    })
    .fetch('GET', `${URL}/${id}` , {
      //some headers ..
    })
    .then((res) => {
      console.log('The file saved to ', res.path())
      callback(res)
    })
  }
}