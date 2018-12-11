import axios from 'axios'
import { 
  USER_REGISTER_SUC, 
  USER_REGISTER_ERR, 
  USER_REGISTER_REQ,
  USER_LOGIN_REQ,
  USER_LOGIN_SUC,
  USER_LOGIN_ERR
 } from './types'
import { API_URL } from '../../consts'

const URL = `${API_URL}/user/`
const LOGIN_URL = `${API_URL}/login`

export const login = (data) => {
  return (dispatch) => {
    dispatch({ type: USER_LOGIN_REQ })

    axios({
      method:"POST",
      url: LOGIN_URL,
      data: {
        email: data.email,
        password: data.password
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch({
        type: USER_LOGIN_SUC,
        payload: response.data
      })
    })
    .catch(error => {
      dispatch({
        type: USER_LOGIN_ERR,
        payload: error.response.data
      })
    })
  }
}

export const registerUser = (data) => {
  return (dispatch) => {
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