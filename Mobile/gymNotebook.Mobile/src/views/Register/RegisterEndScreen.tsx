import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { TitleComponent, ErrorMessage } from '../../component'
import { PRIMARY_COLOR } from '../../styles/common'
import { connect } from 'react-redux';
import { registerUser, login } from '../../store/auth/actions'
import { setTokens } from '../../utils/misc'
import { ApplicationState } from '../../store';
import { Profile } from '../../store/profile/types';
import { LoginModel } from '../../store/auth/types';
import { NavigationScreenProp } from 'react-navigation';
import { Dispatch } from 'redux';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps>  {
  navigation: NavigationScreenProp<RegisterEndScreen>
}

class RegisterEndScreen extends Component<Props> {

  componentDidMount(){
    this.props.registerUser(this.props.profile, () => {
      const {email, password} = this.props.profile
      this.props.login({email, password})
    })
  }

  onSingUpSuccess = () => {
    setTokens(this.props.auth, () => {
      this.props.navigation.navigate('HomeScreen')
    })
  }

  render() {

    if(this.props.loginSuccess) {
      this.onSingUpSuccess()
    }

    return (
      <View style={{ justifyContent: "center", flex: 1}}>
        <ErrorMessage>{this.props.error.message}</ErrorMessage>
        <TitleComponent style={{marginTop: 0, marginBottom: 20}}>Rejestrowanie...</TitleComponent>
        <ActivityIndicator color={PRIMARY_COLOR} size='large'/>
      </View>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  registerLoading: state.Auth.loading,
  error: state.Auth.error,
  registerSuccess: state.Auth.registerSuccess,
  loginLoading: state.Auth.loading,
  loginSuccess: state.Auth.loginSuccess,
  profile: state.Profile.profile,
  auth: state.Auth.auth
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  registerUser: (profile: Profile, callback: CallableFunction) => registerUser(profile, callback)(dispatch),
  login: (data: LoginModel) => login(data)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterEndScreen)