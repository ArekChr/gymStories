import axios from 'axios'
import { ProfileActionTypes, ProfileDto, Profile } from './types'
import { API_URL } from '../../utils/misc'
import { Dispatch } from 'redux'
import firebase from 'react-native-firebase';
import { QuerySnapshot } from 'react-native-firebase/firestore';
import R from 'ramda';
import { Post } from '../post/types';

const URL: string = `${API_URL}/Profile`;

function mapSnapshotToProfiles(snapshot: QuerySnapshot) {
  let docs = snapshot.docs
  if(docs.length > 0) {
    let profiles: Profile[] = []
    snapshot.docs.forEach(x => profiles.push({
      id: x.id, 
      ...x.data()
    } as Profile))
    
    return profiles
  }
  return null
}

function comparator(x: Profile ,y: Profile) {
  return x.id === y.id
}

export const fetchMyProfile = (userId: string,  cb?: (myProfileId: string) => void) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProfileActionTypes.FETCH_MY_PROFILE_REQ
    })
    let profileId
    firebase.firestore().collection('profiles').where('userId', '==', userId).get().then(snapshot => {
      let doc = snapshot.docs.first()
      let profile = doc.data()
      profileId = doc.id
      dispatch({
        type: ProfileActionTypes.FETCH_MY_PROFILE_SUC,
        payload: { id: profileId, ...profile } as Profile
      })
      if(cb && profileId){
        cb(profileId)
      }
    })
  }
}

export const fetchProfile = (profileId: string, cb?: (profile: Profile) => void) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProfileActionTypes.FETCH_PROFILE_REQ
    })

    firebase.firestore().collection('profiles').doc(profileId).get().then(snapshot => {
      const payload = {
        id: snapshot.id,
        ...snapshot.data()
      } as Profile  
      dispatch({
        type: ProfileActionTypes.FETCH_PROFILE_SUC,
        payload: payload
      })
      if(cb){
        cb(payload)
      }
    })
  }
}


export const searchProfiles = async (text: string, quantity: number, myId: string, cb?: (profiles: Profile[]) => void) => {
  text = text.toLowerCase()

  const profilesCollection = firebase.firestore().collection('profiles')

  var profiles1 = await profilesCollection.orderBy('firstName')
    .startAt(text).endAt(text+'\uf8ff').limit(quantity)
    .get().then(snapshot => mapSnapshotToProfiles(snapshot))
    
  var profiles2 = await profilesCollection.orderBy('lastName')
    .startAt(text).endAt(text+'\uf8ff').limit(quantity)
    .get().then(snapshot => mapSnapshotToProfiles(snapshot))

  let profiles: Profile[] = []
  if(profiles1) {
    if(profiles2) {
      profiles = R.unionWith(comparator, profiles1, profiles2)
    }
    profiles = profiles1
  }
  else if(profiles2) {
    profiles = profiles2
  }

  profiles = profiles.filter(x => x.id !== myId)

  if (cb) {
    cb(profiles)
  }
}


export const updateProfileImage = (uid: string, filePath: string, profileId: string, cb?: () => void) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProfileActionTypes.UPDATE_PHOTO_REQ
    })

    firebase.storage().ref(`images/profiles/${uid}`).putFile(filePath).then(response => {
      firebase.firestore().collection('profiles').doc(profileId).update({
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
