import React, { Component } from 'react';
import { View } from 'react-native';
import { TitleComponent } from '../../components'
import { connect } from 'react-redux';
import { signUp } from '../../redux/auth/actions';
import { AppState } from '../../redux';
import { Profile } from '../../redux/profile/types';
import { NavigationScreenProp } from 'react-navigation';
import { Dispatch } from 'redux';
import { Spinner } from '../../components/Spinner';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps>  {
  navigation: NavigationScreenProp<RegisterEndScreen>
}

class RegisterEndScreen extends Component<Props> {

  componentDidMount(){
    this.props.signUp(this.props.myProfile)
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
        <Spinner />
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  registerLoading: state.Auth.loading,
  error: state.Auth.error,
  registerSuccess: state.Auth.registerSuccess,
  loginLoading: state.Auth.loading,
  loginSuccess: state.Auth.loginSuccess,
  myProfile: state.Profile.myProfile,
  auth: state.Auth.auth
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signUp: (myProfile: Profile) => signUp(myProfile)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterEndScreen)