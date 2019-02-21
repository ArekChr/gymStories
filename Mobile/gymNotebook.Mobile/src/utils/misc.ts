import { AsyncStorage, PlatformIOS, Platform } from 'react-native'
import { Profile } from '../store/profile/types'
import { UserAuth } from '../store/auth/types'

export const API_URL: string = 'http:/192.168.178.91:5001/api'

export const FIREBASEURL = `gymnotebook-cd027.firebaseapp.com`
export const APIKEY = `AIzaSyAIZeGBNAIxVqWpammuVflQVuYy2mWwUL0`;
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`
export const SIGNIN = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`

export const iOS = () => {
  switch(Platform.OS){
    case "ios": 
      return true
    case "android": 
      return false
  }
}

export enum StorageKeys {
  token = '@gymNotebook@token',
  refreshToken = '@gymNotebook@refreshToken',
  expirationToken = '@gymNotebook@expiryToken'
}

export const setTokens = (values: UserAuth, callback:() => void) => {
  if(!values.idToken || !values.refreshToken)
    return
  
  const dateNow = new Date()
  const expiration = dateNow.getTime() + (3600 * 1000)

  AsyncStorage.multiSet([
    [StorageKeys.token, values.idToken],
    [StorageKeys.refreshToken, values.refreshToken],
    [StorageKeys.expirationToken, expiration.toString()]
  ])
  .then((response) => {
    callback()
  })
}

export const getTokens = (callback: (value: [string, string][]) => void) => {
  AsyncStorage.multiGet([
    StorageKeys.token,
    StorageKeys.refreshToken,
    StorageKeys.expirationToken
  ]).then((value) => {
    callback(value)
  })
}

export const removeTokensFromStorage = (callback: () => void) => {
  AsyncStorage.multiRemove([
    StorageKeys.token,
    StorageKeys.expirationToken,
    StorageKeys.refreshToken
  ]).then(() => {
    callback()
  })
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