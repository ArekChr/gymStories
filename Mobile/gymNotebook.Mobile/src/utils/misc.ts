import { AsyncStorage, PlatformIOS, Platform } from 'react-native'
import { Profile } from '../store/profile/types'
import { JWT } from '../store/auth/types'

export const API_URL: string = 'http:/192.168.178.91:5001/api'

export const FIREBASEURL = `gymnotebook-cd027.firebaseapp.com`
export const APIKEY = `AIzaSyAIZeGBNAIxVqWpammuVflQVuYy2mWwUL0`;
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`
export const SIGNIN = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`


export const iOS = () => {
  switch(Platform.OS){
    case "ios": {
      return true;
    }
    case "android": {
      return false;
    }
  }
}

export const setTokens = (values: JWT, callback: Function) => {

  AsyncStorage.multiSet([
    ['@gymNotebook@token', values.token],
    ['@gymNotebook@expiryToken', values.expiry.toString()]
  ])
  .then(() => {
    callback()
  })
}

export const getTokens = (callback: Function) => {
  AsyncStorage.multiGet([
    '@gymNotebook@token',
    '@gymNotebook@expiryToken'
  ]).then(value =>{
    callback(value)
  })
}

export const removeTokensFromStorage = (callback: Function) => {
  AsyncStorage.multiRemove([
    '@gymNotebook@token',
    '@gymNotebook@expiryToken'
  ]).then(
      callback()
    )
}

export const setProfile = (profile: Profile, callback: Function) => {
  AsyncStorage.multiSet([
    ['@gymNotebook@profile@email', profile.email],
    ['@gymNotebook@profile@firstName', profile.firstName],
    ['@gymNotebook@profile@lastName', profile.lastName],
    ['@gymNotebook@profile@gender', profile.gender],
    ['@gymNotebook@profile@dateOfBirth', profile.dateOfBirth.toString()]
  ])
  .then(() => {
    callback()
  })
}