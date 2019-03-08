import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native'
import {Logo} from '../../components'
import LoginForm from './LoginForm'
import { setAuth } from '../../redux/auth/actions'
import { connect } from 'react-redux'
import { STATUS_BAR_COLOR } from '../../styles/common'
import { NavigationScreenProp } from 'react-navigation';
import { Dispatch } from 'redux';
import { AppState } from '../../redux';
import firebase from 'react-native-firebase';
import { fetchMyProfile } from '../../redux/profile/actions';
import { UserAuth } from '../../redux/auth/types';
import { fetchMyFollowers, fetchMyFollowing } from '../../redux/follow/actions';
import { fetchMyPosts } from '../../redux/post/actions';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<LoginScreen>
}

class LoginScreen extends Component<Props> {

  _isMounted = false;

  state = {
    loading: true
  }
  
  componentDidMount(){
    this._isMounted = true;

    firebase.auth().onAuthStateChanged(user => {
      if(this._isMounted){
        if(user){
          this.props.setAuth(user as UserAuth)
          this.props.fetchMyProfile(user.uid, (id) => {
            this.props.fetchMyPosts(id, 20)
            this.props.fetchMyFollowers(id)
            this.props.fetchMyFollowing(id)
          })
          
          this.props.navigation.navigate('HomeScreen')
        } else {
          this.setState({loading: false})
        }
      }
    })
  }
  
  componentWillUnmount(){
    this._isMounted = false;
  }
  
  onLoginSuccess = () => {
    this.props.navigation.navigate('HomeScreen')
  }

  onRegisterPressed = () => {
    this.props.navigation.navigate('NameScreen')
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
    height: 100,
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

const mapStateToProps = (state: AppState) => ({
  auth: state.Auth.auth
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAuth: (user: UserAuth) => setAuth(user)(dispatch),
  fetchMyProfile: (uid: string, cb: (myId: string) => void) => fetchMyProfile(uid, cb)(dispatch),
  fetchMyPosts: (id: string, quantity: number, cb?: () => void) => fetchMyPosts(id, quantity, cb)(dispatch),
  fetchMyFollowers: (profileId: string) => fetchMyFollowers(profileId)(dispatch),
  fetchMyFollowing: (profileId: string) => fetchMyFollowing(profileId)(dispatch)
})

export default connect(mapStateToProps , mapDispatchToProps)(LoginScreen)