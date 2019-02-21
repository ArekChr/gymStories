import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native'
import {Logo} from '../../component'
import LoginForm from './LoginForm'
import { getTokens, StorageKeys, setTokens } from '../../utils/misc'
import { mapAuthToState, autoSignIn } from '../../store/auth/actions'
import { connect } from 'react-redux'
import { STATUS_BAR_COLOR, PRIMARY_COLOR } from '../../styles/common'
import { NavigationScreenProp } from 'react-navigation';
import { UserAuth } from '../../store/auth/types';
import { Dispatch } from 'redux';
import { ApplicationState } from '../../store';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<LoginScreen>
}

class LoginScreen extends Component<Props> {

  state = {
    loading: true
  }

  onLoginSuccess = () => {
    this.props.navigation.navigate('HomeScreen')
  }

  onRegisterPressed = () => {
    this.props.navigation.navigate('RegisterScreen')
  }

  componentDidMount(){
    getTokens((value: any) => {
      if(value[0][1] === null){
        this.setState({loading:false})
      } 
      else {
        this.props.autoSignIn(value[1][1], () => {
          setTokens(this.props.auth, () => {
            this.onLoginSuccess()
          })
        })
      }
    })
  }

  render() {

    if(this.state.loading){
      return (
        <View style={styles.loading}>
          <StatusBar backgroundColor={STATUS_BAR_COLOR} />
          <ActivityIndicator size='large'/>
        </View>
      )
    } else {
      return(
        <View style={styles.container}>
          <StatusBar backgroundColor={STATUS_BAR_COLOR} />
          <Logo/>
          <LoginForm onLoginSuccess={this.onLoginSuccess}/>
          <View style={styles.signupTextCont}>
              <Text style={styles.signupText}>Nie masz konta? </Text>
              <TouchableOpacity onPress={this.onRegisterPressed}>
                  <Text style={styles.signupButton}>Zajerestruj się</Text>
              </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  signupTextCont: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  signupText: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: 16
  },
  signupButton: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500'
  },
  loading: {
    flex: 1,
    backgroundColor:'rgba(34,34,34,1)',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = (state: ApplicationState) => ({
  auth: state.Auth.auth
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  mapAuthToState: (auth: UserAuth) => mapAuthToState(auth)(dispatch),
  autoSignIn: (value: string, cb:() => void) => autoSignIn(value, cb)(dispatch)
})

export default connect(mapStateToProps , mapDispatchToProps)(LoginScreen)