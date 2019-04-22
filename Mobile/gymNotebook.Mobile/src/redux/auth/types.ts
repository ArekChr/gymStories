import { RNFirebase } from "react-native-firebase";

export enum AuthActionTypes {
  USER_LOGOUT = 'auth/USER_LOGOUT',
  FIREBASE_LOGIN_ERR = "@auth/FIREBASE_LOGIN_ERR",
  FIREBASE_LOGIN_SUC = "@auth/FIREBASE_LOGIN_SUC",
  FIREBASE_LOGIN_REQ = "@auth/FIREBASE_LOGIN_REQ",
  SET_FIREBASE_AUTH = "@auth/SET_FIREBASE_AUTH",
  FIREBASE_REGISTER_REQ = "@auth/FIREBASE_REGISTER_REQ",
  FIREBASE_REGISTER_SUC = "@auth/FIREBASE_REGISTER_SUC"
}

export interface RegisterModel {
  password: string
  email: string
}

export interface LoginModel {
  email: string
  password: string
}

export interface AuthState {
  error: any
  loading: boolean | null
  registerSuccess: boolean | null
  loginSuccess: boolean | null
  auth: UserAuth
}

export interface UserAuth extends Partial<RNFirebase.User> {
  displayName: string | null
  email: string
  emailVerified: boolean
  isAnonymous: boolean
  metadata: {
    creationTime: string
    lastSignInTime: string
  }
  phoneNumber: string | null
  photoURL: string | null
  uid: string
}

export interface UserRefreshAuth {
  access_token: string | null
  refresh_token: string | null
  expiresIn: string | null
  id_token: string | null
}