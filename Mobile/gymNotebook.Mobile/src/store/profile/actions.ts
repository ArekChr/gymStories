import axios from 'axios'
import { ProfileActionTypes, ProfileDto, Profile } from './types'
import { API_URL } from '../../utils/misc'
import { Dispatch } from 'redux'
import firebase from 'react-native-firebase';

const URL: string = `${API_URL}/Profile`;

export const fetchMyProfile = (userId: string,  cb?: () => void) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProfileActionTypes.FETCH_MY_PROFILE_REQ
    })

    firebase.firestore().collection('profiles').where('userId', '==', userId).get().then(snapshot => {
      let doc = snapshot.docs.firstOrDefault()
      let profile = doc.data()
      dispatch({
        type: ProfileActionTypes.FETCH_MY_PROFILE_SUC,
        payload: { id: doc.id, ...profile } as Profile
      })
      if(cb){
        cb()
      }
    })
  }
}

export const fetchProfile = (profileId: string, cb?: () => void) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProfileActionTypes.FETCH_PROFILE_REQ
    })

    firebase.firestore().collection('profiles').doc(profileId).get().then(snapshot => {
      dispatch({
        type: ProfileActionTypes.FETCH_PROFILE_SUC,
        payload: {
          id: snapshot.id,
          ...snapshot.data()
        } as Profile  
      })
      if(cb){
        cb()
      }
    })

    // firebase.database()
    // .ref(`profiles/${profileId}`)
    // .once('value')
    // .then(snapshot => {
    //   let data = snapshot.val()
    //   let profile: Profile  = Object.keys(data).map(key => data[key])[0]

    //   profile = {
    //     ...profile,
    //     id: Object.keys(data)[0]
    //   }
    // })
  }
}

export const searchProfiles = (text: string, quantity: number) => {
  return async(dispatch: Dispatch) => {
    dispatch({
      type: ProfileActionTypes.SEARCH_PROFILES_REQ
    })

    // firebase.firestore().collection('profiles').startAt('a', 'a', 'a').get().then(snapshot => {
    //   snapshot.docs.
    // })

    const profileRef = firebase.database().ref('profiles')

    var result1 = {}
    var result2 = {}
    result1 = await profileRef
    .orderByChild('firstName')
    .startAt(text).endAt(text + '\uf8ff')
    .once('value').then(snapshot => {
      return snapshot.val()
    })

    result2 = await profileRef
    .orderByChild('lastName')
    .startAt(text).endAt(text + '\uf8ff')
    .once('value').then(snapshot => {
      return snapshot.val()
    })

    var result = {...result1, ...result2}
    var list = Object.keys(result).map((x) => Object.assign(result[x], {id: x}))
    dispatch({
      type: ProfileActionTypes.SEARCH_PROFILES_SUC,
      payload: list
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
