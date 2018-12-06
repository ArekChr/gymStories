import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      success: false,
      badCredentials: false,
      unknownError: false,
      opacity: 0,
      statusCode: 0,
      email: '',
      password: ''
    }
  }

  render() {
    let errorCtrl = <View />

    if (!this.state.success && this.state.badCredentials) {
      errorCtrl = <Text style={styles.error}>Invalid credentials</Text>
    }
    if (!this.state.success && this.state.unknownError) {
      errorCtrl = <Text style={styles.error}>We experienced an unexpected issue</Text>
    }
    return(
      <View style={styles.container}>
        <TextInput style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Email"
            keyboardType="email-address"
            selectionColor="#fff"
            onSubmitEditing={() => this.password.focus()}
            onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Password" secureTextEntry={true}
            ref={(input) => this.password = input}
            onChangeText={(text) => this.setState({ password: text })}
        />
        <TouchableOpacity style={styles.button}
            onPress={this.onLoginPressed.bind(this)}>
            <Text style={styles.buttonText}>{this.props.type}</Text>
        </TouchableOpacity>

        {errorCtrl}

        <ActivityIndicator
            animating={true}
            size="large"
            opacity={this.state.opacity}
            style={styles.loader}
        />
      </View>
    )
  }
  onLoginPressed = () => {
    console.log('login pressed')
    this.setState({ opacity: 1 })

    const authService = require('../services/AuthService')
    authService.login({
      email: this.state.email,
      password: this.state.password
    }, (results) => {
      this.setState(results)
      console.log('results.success: ' + results.success)
      if (results.success){
        console.log('changing screen after login')
        this.props.loginScreen()
      }
    })
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputBox: {
    width: 250,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginVertical: 10,
    fontSize: 16,
    color: '#ffffff'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'rgba(74,217,255,1)',
    borderRadius: 25,
    width: 250,
    height: 50,
    marginVertical: 10,
    paddingVertical: 14
  },
  loader: {
    marginTop: 20
  },
  error: {
    color: 'red',
    paddingTop: 10
  }
})