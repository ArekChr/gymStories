import axios from 'axios'
import { USER_REGISTER_SUC, USER_REGISTER_ERR, USER_REGISTER_REQ } from './types'
import { API_URL } from '../../consts'

const URL = `${API_URL}/user/`

export const registerUser = (data) => {
  return (dispatch) =>{
    dispatch({ type: USER_REGISTER_REQ })

    axios({
      method:"POST",
      url: URL,
      data: {
        email: data.email,
        username: data.username,
        password: data.password
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch({
        type: USER_REGISTER_SUC,
        payload: response.data
      })
    })
    .catch(error => {
      dispatch({
        type: USER_REGISTER_ERR,
        payload: error.response.data
      })
    })
  }
}