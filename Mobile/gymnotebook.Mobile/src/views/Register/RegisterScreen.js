import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {Logo} from '../../component'
import RegisterForm from './RegisterForm'

class RegisterScreen extends Component {

  onSignInPressed = () => {
    this.props.navigation.popToTop()
  }

  onSingUpSuccess = () => {
    this.props.navigation.navigate('LoginScreen')
  }

  render() {
    return(
      <View style={styles.container}>
        <Logo/>
        <RegisterForm onSingUpSuccess={this.onSingUpSuccess} />
        
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Masz już konto? </Text>
          <TouchableOpacity onPress={this.onSignInPressed}><Text style={styles.signupButton}>Zaloguj się</Text></TouchableOpacity>
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

const mapStateToProps = ({progress}) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default RegisterScreen