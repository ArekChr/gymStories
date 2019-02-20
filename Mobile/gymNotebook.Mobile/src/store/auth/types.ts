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

export interface RegisterModel {
  password: string
  email: string
}

export interface LoginModel {
  email: string
  password: string
}

export interface Error {
  code?: string
  message?: string
}

export interface AuthState {
  error: Error
  loading?: boolean
  registerSuccess?: boolean
  loginSuccess?: boolean
  jwt: JWT
}

export interface AuthResponse extends Partial<AuthData> {
  displayName: string
  registered: boolean
}

export interface AuthData {
  kind?: string
  idToken?: string
  email?: string
  refreshToken?: string
  expiresIn?: string
  localId?: string
}