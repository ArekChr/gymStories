import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'redux'
import { 
  AuthActionTypes,
  RegisterModel,
  UserAuth,
  UserRefreshAuth
 } from './types'
import { API_URL, SIGNUP, SIGNIN, REFRESH, removeTokensFromStorage } from '../../utils/misc'

const URL = `${API_URL}/user/`
const LOGIN_URL = `${API_URL}/login`

export const mapAuthToState = (auth: UserAuth) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: AuthActionTypes.STORAGE_MAP_AUTH,
      payload: auth
    })
    //axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
  }
}

export const logout = () => {
  return (dispatch: Dispatch) => {
    dispatch({type: AuthActionTypes.USER_LOGOUT })
    removeTokensFromStorage(() => {
      delete axios.defaults.headers.common["Authorization"];
    })
  }
}

export const autoSignIn = (refToken: string, cb:() => void) => {
  return (dispatch: Dispatch) => {

    axios({
      method: "POST",
      url: REFRESH,
      data:"grant_type=refresh_token&refresh_token=" + refToken,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((response: AxiosResponse<UserRefreshAuth>) => {
      dispatch({
        type: AuthActionTypes.AUTO_SIGN_IN,
        payload: response.data
      })
      cb()
    }).catch(e => {
      dispatch({
        type: AuthActionTypes.AUTO_SIGN_IN_ERR,
        payload: e.response.data.error
      })
    })
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
    .catch(e => {
      dispatch({
        type: AuthActionTypes.USER_LOGIN_ERR,
        payload: e.response.data.error
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
        payload: e.response.data.error
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