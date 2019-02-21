export enum AuthActionTypes {
  USER_REGISTER_SUC = 'auth/USER_REGISTER_SUC',
  USER_REGISTER_ERR = 'auth/USER_REGISTER_ERR',
  USER_REGISTER_REQ = 'auth/USER_REGISTER_REQ',
  USER_LOGIN_REQ = 'auth/USER_LOGIN_REQ',
  USER_LOGIN_SUC = 'auth/USER_LOGIN_SUC',
  USER_LOGIN_ERR = 'auth/USER_LOGIN_ERR',
  STORAGE_MAP_AUTH = 'auth/STORAGE_MAP_AUTH',
  USER_LOGOUT = 'auth/USER_LOGOUT',
  AUTO_SIGN_IN = 'auth/AUTO_SIGN_IN',
  AUTO_SIGN_IN_ERR = "auth/AUTO_SIGN_IN_ERR"
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

export interface UserAuth {
  idToken: string | null
  refreshToken: string | null
  expiresIn: string | null
  localId: string | null
}

export interface UserRefreshAuth {
  access_token: string | null
  refresh_token: string | null
  expiresIn: string | null
  id_token: string | null
}