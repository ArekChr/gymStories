import { Reducer, Action } from 'redux'
import { ProfileState, ProfileActionTypes, Profile } from './types'
import { AuthActionTypes } from '../auth/types';
import { PostActionTypes } from '../post/types';

const initialState: ProfileState = {
  myProfile: {
    averageRates: 0,
    dateOfBirth: new Date().toISOString(),
    description: '',
    email: '',
    firstName: '',
    lastName: '',
    followersCount: 0,
    followingCount: 0,
    gender: '',
    password: '',
    userUid: '',
    imageURL: '',
    id: '',
    nickname: undefined,
    posts: undefined
  },
  profiles: [],
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
    case ProfileActionTypes.FETCH_PROFILE_REQ: {
      return {
        ...state,
        loading: true
      }
    }
    case ProfileActionTypes.FETCH_PROFILE_SUC: {
      return {
        ...state,
        loading: false,
        profiles: [
          ...state.profiles.filter(x => x.id !== action.payload.profileId),
          action.payload
        ]
      }
    }
    case ProfileActionTypes.SEARCH_PROFILES_REQ: {
      return {
        ...state,
        loading: true
      }
    }
    case ProfileActionTypes.SEARCH_PROFILES_SUC: {
      return {
        ...state,
        loading: false,
        profiles: action.payload
      }
    }
    case PostActionTypes.FETCH_POST_SUC: {
      let profiles = state.profiles
      if(action.payload){
        const profileId = action.payload[0].profileId
        let profile = profiles.find(x => x.id === profileId)
        if(profile !== undefined){
          profile = {
            ...profile,
            posts: action.payload
          }
          profiles = [
            ...profiles.filter(x => x.id !== profileId),
            profile
          ]
        }
      }

      return {
        ...state,
        loading: false,
        profiles: profiles
      }
    }
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
        myProfile: {
          ...state.myProfile,
          imageURL: action.payload
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
        myProfile: {
          ...state.myProfile,
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
    case ProfileActionTypes.FETCH_MY_PROFILE_REQ: {
      return {
        ...state,
        loading: true,
      }
    }
    case ProfileActionTypes.FETCH_MY_PROFILE_SUC: {
      return {
        ...state,
        loading: false,
        myProfile: action.payload
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
        myProfile: {
          ...state.myProfile,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName
        }
      }
    }
    case ProfileActionTypes.SET_BIRTH_DATE: {
      return {
        ...state,
        myProfile: {
          ...state.myProfile,
          dateOfBirth: action.payload
        }
      }
    }
    case ProfileActionTypes.SET_GENDER_TYPE: {
      return {
        ...state,
        myProfile: {
          ...state.myProfile,
          gender: action.payload
        }
      }
    }
    case ProfileActionTypes.SET_PASSWORD: {
      return {
        ...state,
        myProfile: {
          ...state.myProfile,
          password: action.payload
        }
      }
    }
    case ProfileActionTypes.REMOVE_PASSWORD: {
      return {
        ...state,
        myProfile: {
          ...state.myProfile,
          password: undefined
        }
      }
    }
    case ProfileActionTypes.SET_EMAIL: {
      return {
        ...state,
        myProfile: {
          ...state.myProfile,
          email: action.payload
        }
      }
    }
    case AuthActionTypes.USER_LOGOUT: {
      return {
        ...initialState
      }
    }
    default: {
      return state;
    }
  }
}

export default profileReducer;