import axios from 'axios'
import { ProfileActionTypes, ProfileDto } from './types'
import { API_URL } from '../../utils/misc'
import { Dispatch } from 'redux'
import firebase from 'react-native-firebase';

const URL: string = `${API_URL}/Profile`;

export const fetchProfile = (uid: string, cb?: () => void) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProfileActionTypes.FETCH_REQ
    })
    firebase.database().ref('profiles').orderByChild('userUid').equalTo(uid).once('value').then(snapshot => {
      let data = snapshot.val()
      let profile = Object.keys(data).map(key => data[key])[0]

      profile = {
        ...profile,
        path: Object.keys(data)[0]
      }

      dispatch({
        type: ProfileActionTypes.FETCH_SUC,
        payload: profile
      })
      if(cb){
        cb()
      }
    })
  }
}

export const updateProfileImage = (uid: string, filePath: string, profilePath: string, cb?: () => void) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProfileActionTypes.UPDATE_PHOTO_REQ
    })

    firebase.storage().ref(`images/profiles/${uid}`).putFile(filePath).then(response => {
      firebase.database().ref(`profiles/${profilePath}/`).update({
        imageURL: response.downloadURL
      })
      dispatch({
        type: ProfileActionTypes.UPDATE_PHOTO_SUC,
        payload: response.downloadURL
      })
      if(cb){
        cb()
      }
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