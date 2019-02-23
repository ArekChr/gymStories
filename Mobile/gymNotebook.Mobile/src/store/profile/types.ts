export enum ProfileActionTypes {
  SET_NAME = '@@profile/SET_NAME',
  SET_BIRTH_DATE = '@@profile/SET_BIRTH_DATE',
  SET_GENDER_TYPE = '@@profile/SET_GENDER_TYPE',
  SET_PASSWORD = '@@profile/SET_PASSWORD',
  REMOVE_PASSWORD = '@@profile/REMOVE_PASSWORD',
  SET_EMAIL = '@@profile/SET_EMAIL',
  FETCH_REQ = '@@profile/FETCH_REQ',
  FETCH_SUC = '@@profile/FETCH_SUC',
  FETCH_ERR = '@@profile/FETCH_ERR',
  UPDATE_REQ = '@@profile/UPDATE_REQ',
  UPDATE_SUC = '@@profile/UPDATE_SUC',
  UPDATE_ERR = '@@profile/UPDATE_ERR',
  UPDATE_PHOTO_REQ = '@@profile/UPDATE_PHOTO_REQ',
  UPDATE_PHOTO_SUC = '@@profile/UPDATE_PHOTO_SUC',
  UPDATE_PHOTO_ERR = '@@profile/UPDATE_PHOTO_ERR',
  FETCH_IMAGE_REQ = '@@profile/FETCH_IMAGE_REQ',
  FETCH_IMAGE_SUC = '@@profile/FETCH_IMAGE_SUC'
}

export interface Profile extends ApiResponse {
  email: string
  password: string
  firstName: string
  lastName: string
  gender: Gender
  description: string
  imageId: string
  averageRates: number
  followingCount: number
  followersCount: number
  dateOfBirth: string
  userId: string
  imageURL: string
}

export interface ProfileDto extends ApiResponse {
  email: string
  firstName: string
  lastName: string
  gender: Gender
  description: string
  imageId: string
  averageRates: number
  followingCount: number
  followersCount: number
  dateOfBirth: Date
  userId: string
  imageURL: string
}

export type Gender = 
  |"Male"
  |"Female"
  |""

export type ApiResponse = Record<string, any>

export interface ProfileState {
  readonly loading: boolean
  readonly profile: Profile
  readonly error: any,
  readonly imagePath?: string
}