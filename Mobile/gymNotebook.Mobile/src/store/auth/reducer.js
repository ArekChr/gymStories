import {
  USER_REGISTER_SUC,
  USER_REGISTER_ERR,
  USER_REGISTER_REQ
} from './types'

const initialState = {
  error: {
    code: '',
    message: ''
  },
  loading: true,
  registerSuccess: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
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