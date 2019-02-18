import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ButtonNext, TitleComponent, ErrorMessage, FloatingInput } from '../../component'
import styles from '../../styles'
import { setEmail } from '../../store/profile/actions'
import {connect} from 'react-redux'
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  email: string
  setEmail(email: string): Function
  navigation: NavigationScreenProp<EmailScreen>
}

class EmailScreen extends Component<Props> {

  state = {
    email: this.props.email || '',
    error: '',
    emailValid: true
  }

  onNextClicked = () => {
    const { email } = this.state
    if(email === ''){
      this.setState({error: 'Wprowadź adres e-mail.', emailValid: false})
    }
    else if(!this.validateEmail(email)){
      this.setState({error: 'Adres e-mail jest niepoprawny.', emailValid: false})
    }
    else {
      this.setState({emailValid: true})
      this.props.setEmail(email)
      this.props.navigation.navigate('PasswordScreen')
    }
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  handleEmailChange = (text) => {
    this.setState({ email: text, error: ''})
  }

  render() {
    return (
      <View style={styles.registerContainer}>
        <TitleComponent>Wprowadż swój adres e-mail</TitleComponent>
        <ErrorMessage>{this.state.error}</ErrorMessage>
        <FloatingInput label="Adres e-mail"
            value={this.state.email}
            isValid={this.state.emailValid}
            onChangeText={this.handleEmailChange}
            autoFocus={true}
            autoCapitalize={'none'}
            keyboardType={'email-address'} />
        <ButtonNext onPress={this.onNextClicked}>Dalej</ButtonNext>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.Profile.profile.email
})

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => setEmail(email)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(EmailScreen)
