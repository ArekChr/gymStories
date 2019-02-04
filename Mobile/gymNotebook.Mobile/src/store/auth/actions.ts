import axios from 'axios'
import { Dispatch } from 'redux'
import { 
  USER_REGISTER_SUC, 
  USER_REGISTER_ERR, 
  USER_REGISTER_REQ,
  USER_LOGIN_REQ,
  USER_LOGIN_SUC,
  USER_LOGIN_ERR,
  STORAGE_MAP_JWT,
  USER_LOGOUT
 } from './types'
import { API_URL } from '../../utils/misc'

const URL = `${API_URL}/user/`
const LOGIN_URL = `${API_URL}/login`

export const mapJwtToState = (jwt: any) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: STORAGE_MAP_JWT,
      payload: jwt
    })
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt.token}`;
  }
}

export const logout = () => {
  return (dispatch: Dispatch) => {
    dispatch({type: USER_LOGOUT })
  }
}

export const login = (data: any) => {
  return (dispatch: Dispatch) => {
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

export const registerUser = (data: any, callback?: Function) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: USER_REGISTER_REQ })

    axios({
      method:"POST",
      url: URL,
      data: {
        ...data
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
      if(callback instanceof Function){
        callback()
      }
    })
    .catch(error => {
      dispatch({
        type: USER_REGISTER_ERR,
        payload: error.response.data
      })
    })
  }
}