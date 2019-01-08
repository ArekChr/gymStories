import axios from 'axios'
import {
  SET_PROFILE_NAME,
  SET_PROFILE_BIRTH_DATE,
  SET_PROFILE_GENDER_TYPE,
  SET_PROFILE_PASSWORD ,
  SET_PROFILE_EMAIL,
  SET_PROFILE_TYPE,
  REMOVE_PROFILE_PASSWORD
} from './types'
import { API_URL } from '../../utils/misc'

const URL = `${API_URL}/profile/`

export const setName = (firstName, lastName) => {
  return (dispatch) => {
    dispatch({
      type: SET_PROFILE_NAME, 
      payload: {firstName, lastName} 
    })
  }
}

export const setBirthDate = (birthDate) => {
  return (dispatch) => {
    dispatch({
      type: SET_PROFILE_BIRTH_DATE, 
      payload: birthDate
    })
  }
}

export const setGenderType = (genderType) => {
  return (dispatch) => {
    dispatch({
      type: SET_PROFILE_GENDER_TYPE, 
      payload: genderType
    })
  }
}

export const setPassword = (password) => {
  return (dispatch) => {
    dispatch({
      type: SET_PROFILE_PASSWORD, 
      payload: password
    })
  }
}

export const removePassword = () => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_PROFILE_PASSWORD
    })
  }
}

export const setEmail = (email) => {
  return (dispatch) => {
    dispatch({
      type: SET_PROFILE_EMAIL, 
      payload: email
    })
  }
}

export const setProfileType = (profileType) => {
  return (dispatch) => {
    dispatch({
      type: SET_PROFILE_TYPE, 
      payload: profileType
    })
  }
}