import { FollowActionTypes, FollowState } from './types'
import { Reducer } from 'redux';

const initialState: FollowState = {
  loading: false,
  myFollowers: [],
  myFollowing: [],
  userFollowers: [],
  userFollowing: []
}

const authReducer: Reducer<FollowState> = (state = initialState, action) => {
  switch (action.type) {
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
        myFollowing: action.payload
      }
    }
    default: return state
  }
}

export default authReducer