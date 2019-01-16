import { AsyncStorage } from 'react-native'

export const API_URL = 'http:/192.168.178.91:5001/api'

export const setTokens = (values, callback) => {

  AsyncStorage.multiSet([
    ['@gymNotebook@token', values.token],
    ['@gymNotebook@expiryToken', values.expiry.toString()]
  ])
  .then(response => {
    callback()
  })
}

export const getTokens = (callback) => {
  AsyncStorage.multiGet([
    '@gymNotebook@token',
    '@gymNotebook@expiryToken'
  ]).then(value =>{
    callback(value)
  })
}

export const removeTokensFromStorage = (callback) => {
  AsyncStorage.multiRemove([
    '@gymNotebook@token',
    '@gymNotebook@expiryToken'
  ]).then(
      callback()
    )
}

export const setProfile = (profile, callback) => {
  AsyncStorage.multiSet([
    ['@gymNotebook@profile@email', profile.email],
    ['@gymNotebook@profile@firstName', profile.firstName],
    ['@gymNotebook@profile@lastName', profile.lastName],
    ['@gymNotebook@profile@gender', profile.gender],
    ['@gymNotebook@profile@dateOfBirth', profile.dateOfBirth]
  ])
  .then(() => {
    callback()
  })
}