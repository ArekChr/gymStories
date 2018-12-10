import React, { Component } from 'react'

import AppNavigator from './src/navigation/Navigation'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'

import { rootReducer } from './src/store'

import { composeWithDevTools } from 'redux-devtools-extension';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)

export default class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(rootReducer, composeWithDevTools())}>
        <AppNavigator/>
      </Provider>
    )
  }
}
