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

export const signOut = (callback) => {
  AsyncStorage.multiRemove([
    '@gymNotebook@token',
    '@gymNotebook@expiryToken'
  ]).then(
      callback()
    )
}
