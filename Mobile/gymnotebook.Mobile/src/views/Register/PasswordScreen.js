import React, { Component } from 'react';
import { View } from 'react-native';
import { ButtonNext, TitleComponent, ErrorMessage, FloatingInput } from '../../component'
import styles from '../../styles'
import {setPassword} from '../../store/profile/actions'
import {connect} from 'react-redux'

class PasswordScreen extends Component {
  constructor(props) {
    super(props)
    this.inputs = {}
  }

  state = {
    password: '',
    confirmPassword: '',
    passwordMatch: false,
    error: ''
  }

  focusNextField = (id) => {
    this.inputs[id].focus();
  }

  onNextClicked = () => {
    if(!this.state.passwordMatch){
      this.setState({error: 'Hasła nie są takie same.'})
    }
    else {
      this.props.setPassword(this.state.password)
      this.props.navigation.navigate('RegisterEndScreen');
    }
  }

  handlePasswordChange = (password) => {
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

  handleConfirmPasswordChange = (confirmPassword) => {
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

  render() {
    return (
      <View style={styles.registerContainer}>
        <TitleComponent>Wprowadż swoje hasło</TitleComponent>
        <ErrorMessage>{this.state.error}</ErrorMessage>
        <FloatingInput label="Hasło"
          value={this.state.password}
          isValid={this.state.passwordMatch}
          onChangeText={this.handlePasswordChange}
          autoFocus={true}
          onSubmitEditing={() => { this.focusNextField('confirmPassword') }} />
        <FloatingInput label="Powtórz hasło"
          value={this.state.confirmPassword}
          isValid={this.state.passwordMatch}
          onChangeText={this.handleConfirmPasswordChange}
          onRef={(ref) => { this.inputs['confirmPassword'] = ref }}
          />
        <ButtonNext onPress={this.onNextClicked}>Dalej</ButtonNext>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  setPassword: (password) => setPassword(password)(dispatch)
});

export default connect(null, mapDispatchToProps)(PasswordScreen)
