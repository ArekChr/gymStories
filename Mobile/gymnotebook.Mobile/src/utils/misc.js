import { AsyncStorage } from 'react-native'

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