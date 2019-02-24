import { AuthActionTypes, AuthState } from './types'
import { Reducer } from 'redux'

const initialState: AuthState = {
  error: null,
  loading: null,
  registerSuccess: null,
  loginSuccess: null,
  auth: {
    email: '',
    uid: ''
  }
}

const authReducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.SET_FIREBASE_AUTH: {
      return {
        ...state,
        auth: {
          email: action.payload.email,
          uid: action.payload.uid
        }
      }
    }
    case AuthActionTypes.FIREBASE_LOGIN_REQ: {
      return {
        ...state,
        loginSuccess: null,
        loading: true,
        error: null
      }
    }
    case AuthActionTypes.FIREBASE_REGISTER_REQ: {
      return {
        ...state,
      }
    }
    case AuthActionTypes.FIREBASE_REGISTER_SUC: {
      return {
        ...state,
        loginSuccess: true
      }
    }
    case AuthActionTypes.FIREBASE_LOGIN_SUC: {
      return {
        ...state,
        loading: false,
        loginSuccess: true,
        auth: {
          email: action.payload.email,
          uid: action.payload.uid
        }
      }
    }
    case AuthActionTypes.FIREBASE_LOGIN_ERR: {
      return {
        ...state,
        error: {
          code: action.payload.code,
          message: action.payload.message
        },
        auth: {
          email: '',
          uid: ''
        },
        loading: false
      }
    }
    case AuthActionTypes.USER_LOGOUT: {
      return {
        ...initialState
      }
    }
    default: {
      return state
    }
  }
}

export default authReducer