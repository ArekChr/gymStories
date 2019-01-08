import {
  SET_PROFILE_NAME,
  SET_PROFILE_BIRTH_DATE,
  SET_PROFILE_GENDER_TYPE,
  SET_PROFILE_PASSWORD,
  SET_PROFILE_EMAIL,
  SET_PROFILE_TYPE,
  REMOVE_PROFILE_PASSWORD
} from './types'

const initialState = {
  firstName: '',
  lastName: '',
  birthDate: '',
  genderType: '',
  email: '',
  password: '',
  profileType: ''
}

export default profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_NAME: {
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName
      }
    }
    case SET_PROFILE_BIRTH_DATE: {
      return {
        ...state,
        birthDate: action.payload
      }
    }
    case SET_PROFILE_GENDER_TYPE: {
      return {
        ...state,
        genderType: action.payload
      }
    }
    case SET_PROFILE_PASSWORD: {
      return {
        ...state,
        password: action.payload
      }
    }
    case REMOVE_PROFILE_PASSWORD: {
      delete state.password;
      return state;
    }
    case SET_PROFILE_EMAIL: {
      return {
        ...state,
        email: action.payload
      }
    }
    case SET_PROFILE_TYPE: {
      return {
        ...state,
        profileType: profileType
      }
    }
    default: {
      if (state === undefined) {
        return {
          progress: [],
          progressLoading: false
        }
      }
      return state;
    }
  }
}
