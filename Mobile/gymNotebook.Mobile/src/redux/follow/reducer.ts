import { FollowActionTypes, FollowState } from './types'
import { Reducer } from 'redux';

const initialState: FollowState = {
  loading: false,
  myFollowers: [],
  userFollowers: [],
  userFollowing: [],
  
  myFollowingIds: [],
  myFollowingProfiles: [],
  loadingMyFollows: false
}

const followReducer: Reducer<FollowState> = (state = initialState, action) => {
  switch (action.type) {
    case FollowActionTypes.FOLLOW_REQ: {
      return {
        ...state,
        myFollowingIds: [
          ...state.myFollowingIds,
          { [action.payload.profileId]: true }
        ]
      }
    }
    case FollowActionTypes.UNFOLLOW_REQ: {
      return {
        ...state,
        myFollowingIds: [
          ...state.myFollowingIds.filter(x => Object.keys(x)[0] !== action.payload.profileId)
        ]
      }
    }
    case FollowActionTypes.FETCH_FOLLOWING_PROFILES_REQ: {
      return {
        ...state,
        loadingMyFollows: true
      }
    }
    case FollowActionTypes.FETCH_FOLLOWING_PROFILES_SUC: {
      return {
        ...state,
        myFollowingProfiles: action.payload,
        loadingMyFollows: false
      }
    }
    case FollowActionTypes.FETCH_FOLLOWERS_REQ: {
      return {
        ...state,
        loading: true
      }
    }
    case FollowActionTypes.FETCH_FOLLOWERS_SUC: {
      return {
        ...state,
        loading: false,
        userFollowers: action.payload
      }
    }
    case FollowActionTypes.FETCH_MYFOLLOWERS_REQ: {
      return {
        ...state,
        loading: true
      }
    }
    case FollowActionTypes.FETCH_MYFOLLOWERS_SUC: {
      return {
        ...state,
        loading: false,
        myFollowers: action.payload
      }
    }
    case FollowActionTypes.FETCH_MYFOLLOWING_REQ: {
      return {
        ...state,
        loading: true
      }
    }
    case FollowActionTypes.FETCH_MYFOLLOWING_SUC: {
      return {
        ...state,
        loading: false,
        myFollowingIds: action.payload
      }
    }
    default: return state
  }
}

export default followReducer