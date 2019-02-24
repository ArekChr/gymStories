import { UsersState, UserActionTypes } from "./types";
import { AnyAction, Reducer } from "redux";

const initialState: UsersState = {
  loading: false,
  users: []
}

const userReducer: Reducer<UsersState> = (state = initialState, action: AnyAction) => {
  switch(action.type){
    case UserActionTypes.FETCH_USERS_REQ: {
      return {
        ...state,
        loading: true
      }
    }
    case UserActionTypes.FETCH_USERS_SUC: {
      return {
        ...state,
        loading: false,
        users: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export default userReducer