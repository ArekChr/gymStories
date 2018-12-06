import React, { Component } from 'react'
import store from './src/configureStore'
import { Provider } from 'react-redux'
import AppNavigator from './src/navigation/Navigation'

export default class App extends Component {
  render() {
    return <Provider store={store}><AppNavigator/></Provider>
  }
}
