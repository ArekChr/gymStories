import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import Logo from '../component/Logo'
import RegisterForm from '../component/RegisterForm'
import { Actions } from 'react-native-router-flux'

export default class SignUp extends Component {
  public goBack() {
    Actions.pop()
  }
  public render() {
    return(
      <View style={styles.container}>
        <Logo/>
        <RegisterForm type="signup"/>
        <Text style={styles.logoText}>Welcome in gymNotebook</Text>
        {/* <Form/> */}
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Already have an account? </Text>
          <TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}>Sign in</Text></TouchableOpacity>
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
    flexGrow: 1,
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