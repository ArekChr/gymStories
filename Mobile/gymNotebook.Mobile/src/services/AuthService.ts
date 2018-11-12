import React, { Component } from 'react'
import _ from 'lodash'
const AsyncStorage = require('react-native').AsyncStorage
const authKey = 'auth'
const userKey = 'user'

class AuthService extends Component {
  public constructor(props: any) {
    super(props)
    this.state = { statusCode: 0 }
    this.mounted = false
  }
  public login(creds: any, cb: any) {
    console.log(creds)
    const email = creds.email
    const password = creds.password
    fetch('http://188.124.166.214:5000/api/Login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log('Status code: ' + response.status)
      this.statusCode = response.status
      console.log('statuscode2: ' + this.statusCode)
      if (response.status >= 200 && response.status < 300){
        return response
      }
      throw {
        badCredentials: response.status === 400,
        unknowError: response.status !== 400
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((results) => {
      AsyncStorage.multiSet([
        [authKey, creds.email + ':' + creds.password],
        [userKey, JSON.stringify(results)]
      ], (err: any) => {
        if (err){
          return cb({ success: false })
        }
        console.log('success set to true')
        return cb({ success: true })
      })
    })
    .catch((err) => {
      return cb(err)
    })
    .finally(() => {
      console.log('finally status code: ' + this.statusCode)
      if (this.statusCode === 200){
        console.log('ok')
      }
      return cb({ opacity: 0 })
    })
  }

  public getAuthInfo(cb: any) {
    AsyncStorage.multiGet([authKey, userKey], (err: any, val: any) => {
      if (err){
        return cb(err)
      }

      if (!val){
        return cb()
      }

      let zippedOjb = _.zipObject(val)

      if (!zippedOjb[authKey]){
        return cb()
      }

      let authInfo = {
        header: {
          Authorization: 'Basic ' + zippedOjb[authKey]
        },
        user: JSON.parse(zippedOjb[userKey])
      }
      return cb(undefined, authInfo)
    })
  }
}

module.exports = new AuthService();