import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ButtonNext, TitleComponent, ErrorMessage, FloatingInput } from '../../component'
import styles from '../../styles'
import {connect} from 'react-redux'

class PasswordScreen extends Component {

  state = {
    password: '',
    confirmPassword: '',
    passwordMatch: false,
    error: ''
  }

  handleConfirmPassword = (confirmPassword) => {
    if(this.state.password.length === 0 && confirmPassword.length === 0){
      this.setState({ passwordMatch: true, confirmPassword: confirmPassword})
    }
    else if(this.state.password === confirmPassword){
      this.setState({ passwordMatch: true, confirmPassword: confirmPassword})
    } 
    else {
      this.setState({ passwordMatch: false, confirmPassword: confirmPassword})
    }
  }

  handlePassword = (password) => {
    if(this.state.confirmPassword.length === 0){
      this.setState({ passwordMatch: true, password: password })
    }
    else if (password === this.state.confirmPassword){
      this.setState({ passwordMatch: true, password: password})
    }
    else {
      this.setState({ passwordMatch: false, password: password})
    }
  }

  render() {
    return (
      <View style={styles.registerContainer}>
        <TitleComponent>Wprowadż swoje hasło</TitleComponent>
        <ErrorMessage>{this.state.error}</ErrorMessage>
        <FloatingInput label="Hasło"
          value={this.state.password}
          isValid={this.state.passwordMatch}
          onChangeText={this.handlePasswordChange}
          autoFocus={true} />
        <FloatingInput label="Powtórz hasło"
          value={this.state.confirmPassword}
          isValid={this.state.passwordMatch}
          onChangeText={this.handlePasswordChange}
          />
        <ButtonNext onPress={this.onNextClicked}>Dalej</ButtonNext>
      </View>
    );
  }
}

export default connect(null, {})(PasswordScreen)
