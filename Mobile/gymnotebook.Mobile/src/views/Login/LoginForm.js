import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { login } from '../../store/auth/actions'
import { setTokens } from '../../utils/misc'
import { mapJwtToState } from '../../store/auth/actions'
import { PRIMARY_COLOR, THEME_FONT_COLOR } from '../../styles/common'
import { FloatingInput } from '../../component'

class LoginForm extends React.Component {

  state = {
    opacity: 0,
    email: '',
    password: ''
  }

  onLoginPressed = () => {
    const {email, password} = this.state
    this.props.onLogin({email, password})
  }

  render() {
    let errorMessage = <View />

    if (this.props.loginSuccess === false) {
      errorMessage = <Text style={styles.error}>{this.props.error.message}</Text>
    }
    else if(this.props.loginSuccess) {
      setTokens(this.props.jwt, () => {
        this.props.mapJwtToState(this.props.jwt)
        this.props.onLoginSuccess()
      })
    }

    return(
      <View style={styles.container}>
        <View>
          <FloatingInput 
            style={{ marginTop: 30}}
            label="Email"
            value={this.state.email}
            keyboardType="email-address"
            ref={(input) => this.email = input}
            onSubmitEditing={() => this.password.focus()}
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
            opacity={this.props.loginLoading? 1 : 0}
            style={styles.loader}
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

const mapStateToProps = (state) => ({
  error: state.auth.error,
  loginLoading: state.auth.loading,
  loginSuccess: state.auth.loginSuccess,
  jwt: state.auth.jwt
})

const mapDispatchToProps = (dispatch) => ({
  mapJwtToState: (token) => mapJwtToState(token)(dispatch),
  onLogin: (data) => login(data)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)