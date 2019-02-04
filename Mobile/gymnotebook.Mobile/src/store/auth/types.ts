export const USER_REGISTER_SUC = 'auth/USER_REGISTER_SUC'
export const USER_REGISTER_ERR = 'auth/USER_REGISTER_ERR'
export const USER_REGISTER_REQ = 'auth/USER_REGISTER_REQ'
export const USER_LOGIN_REQ = 'auth/USER_LOGIN_REQ'
export const USER_LOGIN_SUC = 'auth/USER_LOGIN_SUC'
export const USER_LOGIN_ERR = 'auth/USER_LOGIN_ERR'
export const STORAGE_MAP_JWT = 'auth/STORAGE_MAP_JWT'
export const USER_LOGOUT = 'auth/USER_LOGOUT'

export enum AuthActionTypes {
  USER_REGISTER_SUC = 'auth/USER_REGISTER_SUC',
  USER_REGISTER_ERR = 'auth/USER_REGISTER_ERR',
  USER_REGISTER_REQ = 'auth/USER_REGISTER_REQ',
  USER_LOGIN_REQ = 'auth/USER_LOGIN_REQ',
  USER_LOGIN_SUC = 'auth/USER_LOGIN_SUC',
  USER_LOGIN_ERR = 'auth/USER_LOGIN_ERR',
  STORAGE_MAP_JWT = 'auth/STORAGE_MAP_JWT',
  USER_LOGOUT = 'auth/USER_LOGOUT'
}

export interface JWT {
  token?: string
  expiry?: number
}

export interface Error {
  code?: string
  message?: string
}

export interface AuthState {
  error: Error
  loading?: boolean
  registerSuccess: boolean | null
  loginSuccess: boolean | null
  jwt: JWT
}