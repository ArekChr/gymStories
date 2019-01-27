import {
  SET_PROFILE_NAME,
  SET_PROFILE_BIRTH_DATE,
  SET_PROFILE_GENDER_TYPE,
  SET_PROFILE_PASSWORD,
  SET_PROFILE_EMAIL,
  SET_PROFILE_TYPE,
  REMOVE_PROFILE_PASSWORD,
  FETCH_PROFILE_REQ,
  FETCH_PROFILE_SUC,
  FETCH_PROFILE_ERR,
  UPDATE_PROFILE_REQ,
  UPDATE_PROFILE_SUC,
  UPDATE_PROFILE_ERR
} from './types'

const initialState = {
  loading: null,
  profile: {
    firstName: undefined,
    lastName: undefined,
    description: undefined,
    email: undefined,
    gender: undefined,
    followingCount: undefined,
    followersCount: undefined,
    posts: undefined,
    description: undefined,
    imageId: undefined
  },
  error: undefined
}

export default profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQ: {
      return {
        ...state,
        loading: true
      }
    }
    case UPDATE_PROFILE_SUC: {
      return {
        ...state,
        loading: false
      }
    }
    case UPDATE_PROFILE_ERR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    case FETCH_PROFILE_REQ: {
      return {
        ...state,
        loading: true,
      }
    }
    case FETCH_PROFILE_SUC: {
      return {
        ...state,
        loading: false,
        profile: action.payload
      }
    }
    case FETCH_PROFILE_ERR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    case SET_PROFILE_NAME: {
      return {
        ...state,
        profile: {
          ...state.profile,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName
        }
      }
    }
    case SET_PROFILE_BIRTH_DATE: {
      return {
        ...state,
        profile: {
          ...state.profile,
          dateOfBirth: action.payload
        }
      }
    }
    case SET_PROFILE_GENDER_TYPE: {
      return {
        ...state,
        profile: {
          ...state.profile,
          gender: action.payload
        }
      }
    }
    case SET_PROFILE_PASSWORD: {
      return {
        ...state,
        profile: {
          ...state.profile,
          password: action.payload
        }
      }
    }
    case REMOVE_PROFILE_PASSWORD: {
      delete state.profile.password;
      return state;
    }
    case SET_PROFILE_EMAIL: {
      return {
        ...state,
        profile: {
          ...state.profile,
          email: action.payload
        }
      }
    }
    case SET_PROFILE_TYPE: {
      return {
        ...state,
        profile: {
          ...state.profile,
          profileType: profileType
        }
      }
    }
    default: {
      if (state === undefined) {
        return {
        }
      }
      return state;
    }
  }
}
