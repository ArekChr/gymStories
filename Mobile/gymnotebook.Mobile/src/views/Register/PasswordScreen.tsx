import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ButtonNext, TitleComponent, ErrorMessage, FloatingInput } from '../../component'
import styles from '../../styles'
import {setPassword} from '../../store/profile/actions'
import {connect} from 'react-redux'
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  setPassword(password: string): Function
  navigation: NavigationScreenProp<PasswordScreen>
}

class PasswordScreen extends Component<Props> {
  constructor(props) {
    super(props)
  }

  private inputs = {}

  state = {
    password: '',
    confirmPassword: '',
    passwordMatch: true,
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
    this.setState({error: ''})
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
    this.setState({error: ''})
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
      <ScrollView>
              <View style={styles.registerContainer}>
        <TitleComponent>Wprowadż swoje hasło</TitleComponent>
        <ErrorMessage>{this.state.error}</ErrorMessage>
        <FloatingInput label="Hasło"
          value={this.state.password}
          isValid={this.state.passwordMatch}
          onChangeText={this.handlePasswordChange}
          autoFocus={true}
          onSubmitEditing={() => { this.focusNextField('confirmPassword') }}
          autoCapitalize={'none'}
          secureTextEntry={true}
        />
        <FloatingInput label="Powtórz hasło"
          value={this.state.confirmPassword}
          isValid={this.state.passwordMatch}
          onChangeText={this.handleConfirmPasswordChange}
          onRef={(ref) => { this.inputs['confirmPassword'] = ref }}
          style={{ marginTop: 20 }}
          autoCapitalize={'none'}
          secureTextEntry={true}
        />
          <Text style={{margin: 8, marginBottom: 0}}>
            Wybierając opcje Zarejestruj się i {'\n'}
            Akceptuj, poświadczasz zapoznanie się {'\n'}
            z Polityką prywatności i wyrażasz zgode {'\n'}
            na Regulamin usługi.
          </Text>
        <ButtonNext onPress={this.onNextClicked}>Zarejestruj sie i Akceptuj</ButtonNext>
      </View>
      </ScrollView>

    );
  }
}



const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = (dispatch) => ({
  setPassword: (password) => setPassword(password)(dispatch)
});

export default connect(null, mapDispatchToProps)(PasswordScreen)
