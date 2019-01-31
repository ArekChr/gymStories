import axios from 'axios'
import RNFetchBlob from 'rn-fetch-blob'
import {
  SET_PROFILE_NAME,
  SET_PROFILE_BIRTH_DATE,
  SET_PROFILE_GENDER_TYPE,
  SET_PROFILE_PASSWORD ,
  SET_PROFILE_EMAIL,
  SET_PROFILE_TYPE,
  REMOVE_PROFILE_PASSWORD,
  FETCH_PROFILE_REQ,
  FETCH_PROFILE_SUC,
  FETCH_PROFILE_ERR,
  UPDATE_PROFILE_REQ,
  UPDATE_PROFILE_SUC,
  UPDATE_PROFILE_ERR,
  UPDATE_PROFILE_PHOTO_REQ,
  UPDATE_PROFILE_PHOTO_SUC,
  UPDATE_PROFILE_PHOTO_ERR,
  FETCH_PROFILE_IMAGE_REQ,
  FETCH_PROFILE_IMAGE_SUC
} from './types'
import { API_URL } from '../../utils/misc'

const URL = `${API_URL}/Profile`;
const URL_IMAGE = `${API_URL}/Image`;

export const fetchProfile = (callback) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_PROFILE_REQ
    })

    var imageId;

    axios.get(`${URL}`)
    .then((response) => {

      // imageId = response.data.imageId;

      // if(imageId !== "00000000-0000-0000-0000-000000000000" || imageId != null){

      //   dispatch({
      //     type: FETCH_PROFILE_IMAGE_REQ
      //   })

      //   RNFetchBlob.config({
      //     session: 'imageProfile',
      //     fileCache : true
      //   })
      //   .fetch('GET', `${URL_IMAGE}/${imageId}`)
      //   .then((res) => {

      //     dispatch({
      //       type: FETCH_PROFILE_IMAGE_SUC,
      //       payload: res.path()
      //     })
      //   })
      // }

      dispatch({
        type: FETCH_PROFILE_SUC,
        payload: response.data
      })

      if(callback instanceof Function){
        callback()
      }
    })
    .catch(response => {
      dispatch({
        type: FETCH_PROFILE_ERR,
        payload: response.response.data
      })
    })
  }
}

export const updateProfilePhoto = (photo) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_PROFILE_PHOTO_REQ
    })

    const data = new FormData();
    data.append('name', 'profilePhoto')
    data.append('file', {
      uri: photo.uri,
      type: photo.mime,
      name: 'profilePhoto'
    });

    axios.put(URL, data,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    .then(response => {
      dispatch({
        type: UPDATE_PROFILE_PHOTO_SUC
      })
    })
    .catch(response => {
      dispatch({
        type: UPDATE_PROFILE_PHOTO_ERR,
        payload: response.response.data
      })
    })
  }
}

export const updateProfile = (profile) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_PROFILE_REQ
    })

    axios.put({URL,
      data: {
        ...profile
      }
    })
    .then(response => {
      dispatch({
        type: UPDATE_PROFILE_SUC,
        payload: response.data
      })
    })
    .catch(response => {
      dispatch({
        type: UPDATE_PROFILE_ERR,
        payload: response.response.data
      })
    })
  }
}

export const setName = (firstName, lastName) => {
  return (dispatch) => {
    dispatch({
      type: SET_PROFILE_NAME, 
      payload: {firstName, lastName} 
    })
  }
}

export const setDateOfBirth = (dateOfBirth) => {
  return (dispatch) => {
    dispatch({
      type: SET_PROFILE_BIRTH_DATE, 
      payload: dateOfBirth
    })
  }
}

export const setGender = (gender) => {
  return (dispatch) => {
    dispatch({
      type: SET_PROFILE_GENDER_TYPE, 
      payload: gender
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