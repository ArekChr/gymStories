import axios from 'axios'
import { ProfileActionTypes, ProfileDto } from './types'
import { API_URL } from '../../utils/misc'
import { Dispatch } from 'redux'

const URL: string = `${API_URL}/Profile`;

export const fetchProfile = (callback?: CallableFunction) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProfileActionTypes.FETCH_REQ
    })

    axios.get(`${URL}`)
    .then((response) => {
      dispatch({
        type: ProfileActionTypes.FETCH_SUC,
        payload: response.data
      })

      if(callback instanceof Function){
        callback()
      }
    })
    .catch(response => {
      dispatch({
        type: ProfileActionTypes.FETCH_ERR,
        payload: response.response.data
      })
    })
  }
}

export const updateProfileImage = (photo: any) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProfileActionTypes.UPDATE_PHOTO_REQ
    })

    const file = new FormData();
    file.append('name', 'profilePhoto')
    file.append('file', {
      uri: photo.uri,
      type: photo.mime,
      name: 'profilePhoto'
    });

    axios.put<string>(`${URL}/Image`, file,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    .then((response) => {
      dispatch({
        type: ProfileActionTypes.UPDATE_PHOTO_SUC,
        payload: response.data
      })
    })
    .catch(response => {
      dispatch({
        type: ProfileActionTypes.UPDATE_PHOTO_ERR,
        payload: response.response.data
      })
    })
  }
}

export const updateProfileData = (profile: ProfileDto) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProfileActionTypes.UPDATE_REQ
    })

    axios.put(URL, profile)
    .then(response => {
      dispatch({
        type: ProfileActionTypes.UPDATE_SUC,
        payload: profile
      })
    })
    .catch(response => {
      dispatch({
        type: ProfileActionTypes.UPDATE_ERR,
        payload: response.response.data
      })
    })
  }
}

export const setName = (firstName: string, lastName: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProfileActionTypes.SET_NAME, 
      payload: {firstName, lastName} 
    })
  }
}

export const setDateOfBirth = (dateOfBirth: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProfileActionTypes.SET_BIRTH_DATE, 
      payload: dateOfBirth
    })
  }
}

export const setGender = (gender: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProfileActionTypes.SET_GENDER_TYPE, 
      payload: gender
    })
  }
}

export const setPassword = (password: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProfileActionTypes.SET_PASSWORD, 
      payload: password
    })
  }
}

export const removePassword = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProfileActionTypes.REMOVE_PASSWORD
    })
  }
}

export const setEmail = (email: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProfileActionTypes.SET_EMAIL, 
      payload: email
    })
  }
}

// export const setProfileType = (profileType) => {
//   return (dispatch: Dispatch) => {
//     dispatch({
//       type: ProfileActionTypes.SET_TYPE, 
//       payload: profileType
//     })
//   }
// }