import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native'
import {Logo} from '../../component'
import LoginForm from './LoginForm'
import { getTokens } from '../../utils/misc'
import { mapJwtToState } from '../../store/auth/actions'
import { connect } from 'react-redux'
import { STATUS_BAR_COLOR, PRIMARY_COLOR } from '../../styles/common'
import { NavigationScreenProp } from 'react-navigation';
import { JWT } from '../../store/auth/types';

interface Props {
  navigation: NavigationScreenProp<LoginScreen>
  mapJwtToState(jwt: JWT): Function
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
    getTokens((value) => {
      if(value[0][1] === null){
        this.setState({loading:false})
      } 
      else {
        // TODO: shoud check if token is valid or login app immediately by checking expiry ?
        const expiry = Number(value.find(x => x[0] ==='@gymNotebook@expiryToken')[1])
        const now = new Date().getTime()
        if(expiry >= now){
          const token = value.find(x => x[0] ==='@gymNotebook@token')[1]
          const jwt = { token: token, expiry: expiry }
          this.setState({loading:false})
          this.props.mapJwtToState(jwt)
          this.onLoginSuccess()
          
        }
        else {
          this.setState({loading:false})
        }
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
          <LoginForm onLoginSuccess={() => this.onLoginSuccess}/>
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

const mapDispatchToProps = (dispatch) => ({
  mapJwtToState: (token) => mapJwtToState(token)(dispatch)
})


export default connect(null , mapDispatchToProps)(LoginScreen)