export enum UserActionTypes {
  FETCH_USERS_REQ = "@users/FETCH_USERS_REQ",
  FETCH_USERS_SUC = "@users/FETCH_USERS_SUC"
}

export interface UsersState {
  loading: boolean
  users: User[]
}

export interface User {
  firstName: string
  lastName: string
  profileUid: string
  imageURL: string
}