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

const initialState = {
  error: {
    code: '',
    message: ''
  },
  loading: null,
  registerSuccess: null,
  loginSuccess: null,
  jwt: {
    token: null,
    expiry: null
  }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORAGE_MAP_JWT: {
      return {
        ...state,
        jwt: action.payload
      }
    }
    case USER_LOGOUT: {
      return {
        ...initialState
      }
    }
    case USER_LOGIN_REQ: {
      return {
        ...state,
        loginSuccess: null,
        loading: true,
        error: {
          code: '',
          message: ''
        },
      }
    }
    case USER_LOGIN_SUC: {
      return {
        ...state,
        loading: false,
        loginSuccess: true,
        jwt: action.payload
      }
    }
    case USER_LOGIN_ERR: {
      return {
        error: action.payload,
        loginSuccess: false,
        loading: false
      }
    }

    case USER_REGISTER_REQ: {
      return {
        ...state,
        loading: true,
        registerSuccess: null,
        error: {
          code: '',
          message: ''
        }
      }
    }
    case USER_REGISTER_SUC: {
      return {
        ...state,
        loading: false,
        registerSuccess: true
      }
    }
    case USER_REGISTER_ERR: {
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