import { Post } from "../post/types";

export enum ProfileActionTypes {
  SET_NAME = '@profile/SET_NAME',
  SET_BIRTH_DATE = '@profile/SET_BIRTH_DATE',
  SET_GENDER_TYPE = '@profile/SET_GENDER_TYPE',
  SET_PASSWORD = '@profile/SET_PASSWORD',
  REMOVE_PASSWORD = '@profile/REMOVE_PASSWORD',
  SET_EMAIL = '@profile/SET_EMAIL',
  FETCH_MY_PROFILE_REQ = '@profile/FETCH_MY_PROFILE_REQ',
  FETCH_MY_PROFILE_SUC = '@profile/FETCH_MY_PROFILE_SUC',
  FETCH_PROFILE_REQ = '@profile/FETCH_PROFILE_REQ',
  FETCH_PROFILE_SUC = '@profile/FETCH_PROFILE_SUC',
  FETCH_ERR = '@profile/FETCH_ERR',
  UPDATE_REQ = '@profile/UPDATE_REQ',
  UPDATE_SUC = '@profile/UPDATE_SUC',
  UPDATE_ERR = '@profile/UPDATE_ERR',
  UPDATE_PHOTO_REQ = '@profile/UPDATE_PHOTO_REQ',
  UPDATE_PHOTO_SUC = '@profile/UPDATE_PHOTO_SUC',
  UPDATE_PHOTO_ERR = '@profile/UPDATE_PHOTO_ERR',
  FETCH_IMAGE_REQ = '@profile/FETCH_IMAGE_REQ',
  FETCH_IMAGE_SUC = '@profile/FETCH_IMAGE_SUC',
  SEARCH_PROFILES_REQ = "@users/SEARCH_PROFILES_REQ",
  SEARCH_PROFILES_SUC = "@users/SEARCH_PROFILES_SUC"
}

export interface Profile extends ApiResponse {
  email: string
  password: string
  firstName: string
  lastName: string
  gender: Gender
  description: string
  averageRates: number
  followingCount: number
  followersCount: number
  dateOfBirth: string
  userUid: string
  imageURL: string
  id: string
  nickname: string | null
  posts?: Post[]
}

export interface ProfileBasic {
  profileId: string
  firstName: string
  lastName: string
  nickname: string | null
  imageURL: string | null
  followApproved: boolean
  following: boolean
}

export interface ProfileDto extends ApiResponse {
  email: string
  firstName: string
  lastName: string
  gender: Gender
  description: string
  averageRates: number
  followingCount: number
  followersCount: number
  dateOfBirth: Date
  userUid: string
  imageURL: string
}

export type Gender = 
  |"Male"
  |"Female"
  |""

export type ApiResponse = Record<string, any>

export interface ProfileState {
  readonly loading: boolean
  readonly myProfile: Profile
  readonly error: any,
  readonly imagePath?: string
  readonly profiles: Profile[]
}