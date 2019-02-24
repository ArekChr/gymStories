import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { signIn } from '../../store/auth/actions'
import { mapAuthToState } from '../../store/auth/actions'
import { PRIMARY_COLOR, THEME_FONT_COLOR } from '../../styles/common'
import { FloatingInput } from '../../component'
import { LoginModel, UserAuth } from '../../store/auth/types';
import { ApplicationState } from '../../store';
import { Dispatch } from 'redux';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  onLoginSuccess(): void
}

class LoginForm extends React.Component<Props> {

  private password: FloatingInput | null = FloatingInput.prototype

  state = {
    opacity: 0,
    email: '',
    password: ''
  }

  onLoginPressed = () => {
    const {email, password} = this.state
    this.props.signIn({email, password})
  }

  render() {
    let errorMessage = <View />

    if(this.props.error) {
      if(this.props.error.code === 400){
        errorMessage = <Text style={styles.error}>Invalid credentials.</Text>
      } else {
        errorMessage = <Text style={styles.error}>{this.props.error.message}</Text>
      }
    }
    else if(this.props.loginSuccess) {
      this.props.onLoginSuccess()
    }

    return(
      <View style={styles.container}>
        <View>
          <FloatingInput 
            style={{ marginTop: 30}}
            label="Email"
            value={this.state.email}
            keyboardType="email-address"
            onSubmitEditing={() => this.password? this.password.focus() : null}
            isValid={true}
            onChangeText={(text) => this.setState({ email: text })}
          />
          <FloatingInput 
            label="Hasło" 
            value={this.state.password}
            secureTextEntry={true}
            ref={(input) => this.password = input}
            isValid={true}
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
        <TouchableOpacity style={styles.button}
            onPress={this.onLoginPressed}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {errorMessage}

        <ActivityIndicator
            animating={true}
            size="large"
            style={[styles.loader, {opacity: this.props.loginLoading? 1 : 0}]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center'
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
    color: THEME_FONT_COLOR,
    textAlign: 'center'
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
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

const mapStateToProps = (state: ApplicationState) => ({
  error: state.Auth.error,
  loginLoading: state.Auth.loading,
  loginSuccess: state.Auth.loginSuccess,
  auth: state.Auth.auth
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  mapAuthToState: (token: UserAuth) => mapAuthToState(token)(dispatch),
  signIn: (data: LoginModel) => signIn(data)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)