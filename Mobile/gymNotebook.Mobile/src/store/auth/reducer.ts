import { AuthActionTypes, AuthState } from './types'
import { Reducer } from 'redux'

const initialState: AuthState = {
  error: null,
  loading: null,
  registerSuccess: null,
  loginSuccess: null,
  auth: {
    expiresIn: null,
    idToken: null,
    localId: null,
    refreshToken: null
  }
}

const authReducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.STORAGE_MAP_AUTH: {
      return {
        ...state,
        auth: action.payload
      }
    }
    case AuthActionTypes.USER_LOGOUT: {
      return {
        ...initialState
      }
    }
    case AuthActionTypes.USER_LOGIN_REQ: {
      return {
        ...state,
        loginSuccess: null,
        loading: true,
        error: null
      }
    }
    case AuthActionTypes.USER_LOGIN_SUC: {
      return {
        ...state,
        loading: false,
        loginSuccess: true,
        auth: {
          expiresIn: action.payload.expiresIn,
          idToken: action.payload.idToken,
          localId: action.payload.localId,
          refreshToken: action.payload.refreshToken
        }
      }
    }
    case AuthActionTypes.AUTO_SIGN_IN: {
      return {
        ...state,
        auth: {
          idToken: action.payload.id_token,
          expiresIn: action.payload.expires_in,
          localId: action.payload.user_id,
          refreshToken: action.payload.refresh_token
        }
      }
    }
    case AuthActionTypes.AUTO_SIGN_IN_ERR: {
      return {
        ...state,
        error: action.payload,
        auth: {
          expiresIn: null,
          idToken: null,
          localId: null,
          refreshToken: null
        }
      }
    }
    case AuthActionTypes.USER_LOGIN_ERR: {
      return {
        ...state,
        error: action.payload,
        loginSuccess: false,
        loading: false
      }
    }
    case AuthActionTypes.USER_REGISTER_REQ: {
      return {
        ...state,
        loading: true,
        registerSuccess: null,
      }
    }
    case AuthActionTypes.USER_REGISTER_SUC: {
      return {
        ...state,
        loading: false,
        registerSuccess: true,
        auth: {
          expiresIn: action.payload.expiresIn,
          idToken: action.payload.idToken,
          localId: action.payload.localId,
          refreshToken: action.payload.refreshToken
        }
      }
    }
    case AuthActionTypes.USER_REGISTER_ERR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
        registerSuccess: false
      }
    }
    default: {
      return state
    }
  }
}

export default authReducer