import {
  USER_REGISTER
} from './types'

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER: {
      return {
        ...state,
        newUser: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export default authReducer