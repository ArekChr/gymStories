import React, { Component } from 'react'

import AppNavigator from './src/navigation/Navigation'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'

import { rootReducer } from './src/store'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)

export default class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(rootReducer)}>
        <AppNavigator/>
      </Provider>
    )
  }
}
