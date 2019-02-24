import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native'
import {Logo} from '../../component'
import LoginForm from './LoginForm'
import { mapAuthToState, autoSignIn, setAuth } from '../../store/auth/actions'
import { connect } from 'react-redux'
import { STATUS_BAR_COLOR, PRIMARY_COLOR } from '../../styles/common'
import { NavigationScreenProp } from 'react-navigation';
import { UserAuth } from '../../store/auth/types';
import { Dispatch } from 'redux';
import { ApplicationState } from '../../store';
import firebase from 'react-native-firebase';

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
    this.props.navigation.navigate('NameScreen')
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.props.setAuth(user)
        this.props.navigation.navigate('HomeScreen')
      } else {
        this.setState({loading: false})
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
  autoSignIn: (value: string, cb:() => void) => autoSignIn(value, cb)(dispatch),
  setAuth: (user: any) => setAuth(user)(dispatch)
})

export default connect(mapStateToProps , mapDispatchToProps)(LoginScreen)