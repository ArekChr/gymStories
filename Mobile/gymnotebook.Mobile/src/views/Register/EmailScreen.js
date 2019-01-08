import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ButtonNext, TitleComponent, ErrorMessage, FloatingInput } from '../../component'
import styles from '../../styles'
import { setEmail } from '../../store/profile/actions'

class EmailScreen extends Component {

  state = {
    email: '',
    error: '',
    emailValid: true
  }

  onNextClicked = () => {
    const { email } = this.state
    if(email === ''){
      this.setState({error: 'Wprowadź adres e-mail.'})
    }
    this.props.setEmail(email)
    this.props.navigation.navigate('PasswordScreen')
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
            autoFocus={true} />
        <ButtonNext onPress={this.onNextClicked}>Dalej</ButtonNext>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => setEmail(email)(dispatch)
})

export default connect(null, mapDispatchToProps)(EmailScreen)
