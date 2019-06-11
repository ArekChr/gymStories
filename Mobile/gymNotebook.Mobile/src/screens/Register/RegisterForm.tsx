import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { signUp } from '../../redux/auth/actions'
import { RegisterModel } from '../../redux/auth/types'
import { AppState } from '../../redux'
import { Dispatch } from 'redux'
import Spinner from '../../components/Spinner'

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  onSingUpSuccess: () => void
}

class RegisterForm extends React.Component<Props> {
  private password: TextInput | null = TextInput.prototype
  private confirmPassword: TextInput | null = TextInput.prototype

  state = {
    email: '',
    password: '',
    confirmPassword: '',
    passwordValid: true,
    canSignUp: false,
  }

  signUp = () => {
    const { email, password } = this.state
    this.props.signUp({ email, password })
  }

  handleConfirmPassword = (confirmPassword: string) => {
    if (this.state.password.length === 0 && confirmPassword.length === 0) {
      this.setState({ passwordValid: true, confirmPassword: confirmPassword, canSignUp: false })
    } else if (this.state.password === confirmPassword) {
      this.setState({ passwordValid: true, confirmPassword: confirmPassword, canSignUp: true })
    } else {
      this.setState({ passwordValid: false, confirmPassword: confirmPassword, canSignUp: false })
    }
  }

  handlePassword = (password: string) => {
    if (this.state.confirmPassword.length === 0) {
      this.setState({ passwordValid: true, password: password, canSignUp: false })
    } else if (password === this.state.confirmPassword) {
      this.setState({ passwordValid: true, password: password, canSignUp: true })
    } else {
      this.setState({ passwordValid: false, password: password, canSignUp: false })
    }
  }

  render() {
    let errorMessage = <Text />
    if (!this.state.passwordValid) {
      errorMessage = <Text style={styles.errorMessage}>Password does not match</Text>
    } else if (this.props.registerSuccess === false) {
      errorMessage = <Text style={styles.errorMessage}>{this.props.error.message}</Text>
    } else if (this.props.registerSuccess) {
      this.props.onSingUpSuccess()
    }

    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={text => this.setState({ email: text })}
          onSubmitEditing={() => (this.password ? this.password.focus() : null)}
          style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder='Email'
        />
        <TextInput
          onChangeText={this.handlePassword}
          ref={input => (this.password = input)}
          onSubmitEditing={() => (this.confirmPassword ? this.confirmPassword.focus() : null)}
          style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder='Password'
          secureTextEntry={true}
        />
        <TextInput
          onChangeText={this.handleConfirmPassword}
          ref={input => (this.confirmPassword = input)}
          style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder='Confirm Password'
          secureTextEntry={true}
        />
        {errorMessage}
        <TouchableOpacity
          onPress={this.signUp}
          style={this.state.canSignUp ? styles.button : styles.disabledButton}
          disabled={!this.state.canSignUp}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        {this.props.registerLoading && <Spinner />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    width: 250,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginVertical: 10,
    fontSize: 16,
    color: '#ffffff',
  },
  loader: {
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'rgba(74,217,255,1)',
    borderRadius: 25,
    width: 250,
    height: 50,
    marginVertical: 10,
    paddingVertical: 14,
  },
  errorMessage: {
    color: 'red',
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    width: 250,
    height: 50,
    marginVertical: 10,
    paddingVertical: 14,
  },
})

const mapStateToProps = (state: AppState) => ({
  registerLoading: state.Auth.loading,
  error: state.Auth.error,
  registerSuccess: state.Auth.registerSuccess,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signUp: (data: RegisterModel) => signUp(data)(dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm)
