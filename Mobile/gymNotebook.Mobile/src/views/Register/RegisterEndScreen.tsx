import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { TitleComponent, ErrorMessage } from '../../component'
import { PRIMARY_COLOR } from '../../styles/common'
import { connect } from 'react-redux';
import { signUp } from '../../store/auth/actions';
import { ApplicationState } from '../../store';
import { Profile } from '../../store/profile/types';
import { NavigationScreenProp } from 'react-navigation';
import { Dispatch } from 'redux';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps>  {
  navigation: NavigationScreenProp<RegisterEndScreen>
}

class RegisterEndScreen extends Component<Props> {

  componentDidMount(){
    this.props.signUp(this.props.profile)
  }

  onSingUpSuccess = () => {
    this.props.navigation.navigate('HomeScreen')
  }

  render() {

    if(this.props.loginSuccess) {
      this.onSingUpSuccess()
    }

    return (
      <View style={{ justifyContent: "center", flex: 1}}>
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
  signUp: (profile: Profile) => signUp(profile)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterEndScreen)