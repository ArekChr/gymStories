import { Reducer, Action } from 'redux'
import { ProfileState, ProfileActionTypes, Profile } from './types'

const initialState: ProfileState = {
  profile: {
    averageRates: 0,
    dateOfBirth: new Date(),
    description: '',
    email: '',
    firstName: '',
    lastName: '',
    followersCount: 0,
    followingCount: 0,
    gender: '',
    imageId: '',
    password: ''
  },
  error: undefined,
  loading: false,
  imagePath: undefined
}

export interface ProfileAction<T> extends Action<ProfileActionTypes> {
  payload: T
}

export interface ProfileType extends Profile {
  type: ProfileActionTypes
}

const profileReducer: Reducer<ProfileState> = (state = initialState, action) => {
  switch (action.type) {
    case ProfileActionTypes.FETCH_IMAGE_REQ: {
      return {
        ...state,
        loading: true,
      }
    }
    case ProfileActionTypes.FETCH_IMAGE_SUC: {
      return {
        ...state,
        loading: false,
        imagePath: action.payload
      }
    }
    case ProfileActionTypes.UPDATE_PHOTO_SUC: {
      return {
        ...state,
        profile: {
          ...state.profile,
          imageId: action.payload.id
        }
      }
    }
    case ProfileActionTypes.UPDATE_REQ: {
      return {
        ...state,
        loading: true
      }
    }
    case ProfileActionTypes.UPDATE_SUC: {
      return {
        ...state,
        loading: false,
        profile: {
          ...state.profile,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          description: action.payload.description,
          gender: action.payload.gender,
        }
      }
    }
    case ProfileActionTypes.UPDATE_ERR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    case ProfileActionTypes.FETCH_REQ: {
      return {
        ...state,
        loading: true,
      }
    }
    case ProfileActionTypes.FETCH_SUC: {
      return {
        ...state,
        loading: false,
        profile: action.payload
      }
    }
    case ProfileActionTypes.FETCH_ERR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    case ProfileActionTypes.SET_NAME: {
      return {
        ...state,
        profile: {
          ...state.profile,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName
        }
      }
    }
    case ProfileActionTypes.SET_BIRTH_DATE: {
      return {
        ...state,
        profile: {
          ...state.profile,
          dateOfBirth: action.payload
        }
      }
    }
    case ProfileActionTypes.SET_GENDER_TYPE: {
      return {
        ...state,
        profile: {
          ...state.profile,
          gender: action.payload
        }
      }
    }
    case ProfileActionTypes.SET_PASSWORD: {
      return {
        ...state,
        profile: {
          ...state.profile,
          password: action.payload
        }
      }
    }
    case ProfileActionTypes.REMOVE_PASSWORD: {
      return {
        ...state,
        profile: {
          ...state.profile,
          password: undefined
        }
      }
    }
    case ProfileActionTypes.SET_EMAIL: {
      return {
        ...state,
        profile: {
          ...state.profile,
          email: action.payload
        }
      }
    }
    default: {
      return state;
    }
  }
}

export default profileReducer;