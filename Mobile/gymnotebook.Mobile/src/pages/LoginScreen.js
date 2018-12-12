import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import Logo from '../component/Logo'
import LoginForm from '../component/LoginForm'

export default class LoginScreen extends Component {

  onLoginSuccess = () => {
    this.props.navigation.navigate('HomeScreen')
  }

  onRegisterPressed = () => {
    this.props.navigation.navigate('RegisterScreen')
  }

  render() {
    return(
      <View style={styles.container}>
          <Logo/>
          <Text style={styles.logoText}>Welcome in gymNotebook</Text>
          <LoginForm onLoginSuccess={() => this.onLoginSuccess()}/>
          <View style={styles.signupTextCont}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={this.onRegisterPressed}>
                  <Text style={styles.signupButton}>Sign up</Text>
              </TouchableOpacity>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(34,34,34,1)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'rgba(74,217,255,1)'
  },
  signupTextCont: {
    // flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  signupText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500'
  }
})