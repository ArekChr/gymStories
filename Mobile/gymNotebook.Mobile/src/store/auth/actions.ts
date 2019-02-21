import axios from 'axios'
import { Dispatch } from 'redux'
import { 
  AuthActionTypes,
  RegisterModel,
  UserAuth
 } from './types'
import { API_URL, SIGNUP, SIGNIN } from '../../utils/misc'

const URL = `${API_URL}/user/`
const LOGIN_URL = `${API_URL}/login`

export const mapJwtToState = (jwt: any) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: AuthActionTypes.STORAGE_MAP_JWT,
      payload: jwt
    })
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt.token}`;
  }
}

export const logout = () => {
  return (dispatch: Dispatch) => {
    dispatch({type: AuthActionTypes.USER_LOGOUT })
  }
}

export const signIn = (data: any) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: AuthActionTypes.USER_LOGIN_REQ })

    axios.post(SIGNIN, {
      ...data,
      returnSecureToken: true
    })
    .then(response => {
      dispatch({
        type: AuthActionTypes.USER_LOGIN_SUC,
        payload: response.data
      })
    })
    .catch(error => {
      dispatch({
        type: AuthActionTypes.USER_LOGIN_ERR,
        payload: error
      })
    })
  }
}

export const signUp = (data: RegisterModel, callback?: (res: UserAuth) => void)  => {
  return (dispatch: Dispatch) => {
    dispatch({ type: AuthActionTypes.USER_REGISTER_REQ })

    axios.post(SIGNUP, 
      { 
        email: data.email, 
        password: data.password, 
        returnSecureToken:true
      })
    .then(res => {
      dispatch({
        type: AuthActionTypes.USER_REGISTER_SUC,
        payload: res.data
      })
      if(callback){
        callback(res.data)
      }
    })
    .catch(e => {
      dispatch({
        type: AuthActionTypes.USER_REGISTER_ERR,
        payload: e
      })
    })
  }
}

/**
 * @deprecated Migration to firebase
 */
export const registerUser = (data: RegisterModel, callback?: CallableFunction) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: AuthActionTypes.USER_REGISTER_REQ })

    axios.post(URL, {...data})
    .then(response => {
      dispatch({
        type: AuthActionTypes.USER_REGISTER_SUC,
        payload: response.data
      })
      if(callback instanceof Function){
        callback()
      }
    })
    .catch(error => {
      dispatch({
        type: AuthActionTypes.USER_REGISTER_ERR,
        payload: error.response.data
      })
    })
  }
}

/**
 * @deprecated Migration to firebase
 */
export const login = (data: any) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: AuthActionTypes.USER_LOGIN_REQ })

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
        type: AuthActionTypes.USER_LOGIN_SUC,
        payload: response.data
      })
    })
    .catch(error => {
      dispatch({
        type: AuthActionTypes.USER_LOGIN_ERR,
        payload: error.response.data
      })
    })
  }
}