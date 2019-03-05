import axios from 'axios'
import { Dispatch } from 'redux'
import { 
  AuthActionTypes,
  RegisterModel,
  LoginModel,
  UserAuth
 } from './types'
import { API_URL } from '../../utils/misc'
import firebase from 'react-native-firebase';
import { Profile } from '../profile/types';

const URL = `${API_URL}/user/`
const LOGIN_URL = `${API_URL}/login`

export const logout = () => {
  return (dispatch: Dispatch) => {
    dispatch({type: AuthActionTypes.USER_LOGOUT })
  }
}

export const setAuth = (user: UserAuth) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: AuthActionTypes.SET_FIREBASE_AUTH,
      payload: user
    })
  }
}

export const signIn = (data: LoginModel) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: AuthActionTypes.FIREBASE_LOGIN_REQ })

    firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(response => {
      dispatch({
        type: AuthActionTypes.FIREBASE_LOGIN_SUC,
        payload: response.user
      })
    }).catch(e => {
      dispatch({
        type: AuthActionTypes.FIREBASE_LOGIN_ERR,
        payload: e
      })
    })
  }
}

export const signUp = (data: Profile)  => {
  return (dispatch: Dispatch) => {

    dispatch({ type: AuthActionTypes.FIREBASE_REGISTER_REQ })

    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then(response => {
      firebase.firestore().collection('profiles').add({
        userId: response.user.uid,
        firstName: data.firstName.toLowerCase(),
        lastName: data.lastName.toLowerCase(),
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        description: null,
        nickname: null,
        averageRates: 0,
        followingCount: 0,
        followersCount: 0,
        imageURL: null
      }).then((r) => {
        r.id
        dispatch({
          type: AuthActionTypes.FIREBASE_REGISTER_SUC,
          //payload: response
        })
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