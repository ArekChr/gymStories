import React, { Component } from 'react';
import { View, CheckBox, Text } from 'react-native';
import { ButtonNext, TitleComponent, ErrorMessage } from '../../component'
import styles from '../../styles'
import {setGender} from '../../store/profile/actions'
import {connect} from 'react-redux'
import { Gender } from '../../store/profile/types';
import { AppState } from '../../store';
import { Dispatch } from 'redux';
import { NavigationScreenProp } from 'react-navigation';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<GenderTypeScreen>
}

interface State {
  gender: Gender
  error: string
}

class GenderTypeScreen extends Component<Props, State> {

  state = { 
    gender: this.props.gender,
    error: '',
  }

  onSelectedGender = () => {
    this.setState({error: ''})
  }

  onNextClicked = () => {
    const { gender } = this.state;
    if(gender === '') {
      this.setState({error: 'Wybierz płeć.'})
    } else {
      this.props.setGender(gender)
      this.props.navigation.navigate('EmailScreen')
    }
  }

  onSelectMale = () => {
    this.setState({error: ''})
    if(this.state.gender === 'Male') {
      this.setState({gender: ''})
    } else {
      this.setState({gender: "Male"})
    }
  }

  onSelectFemale = () => {
    this.setState({error: ''})
    if(this.state.gender === 'Female') {
      this.setState({gender: ''})
    } else {
      this.setState({gender: 'Female'})
    }
  }

  render() {
    return (
      <View style={styles.registerContainer}>
        <TitleComponent>Jakiej jesteś płci?</TitleComponent>
        <ErrorMessage>{this.state.error}</ErrorMessage>
        <View style={{ flexDirection: 'column'}}>
          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              value={this.state.gender === 'Male' ? true : false }
              onValueChange={() => this.onSelectMale()}
            />
            <Text style={{marginTop: 5}}>Mężczyzna</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'column'}}>
          <View style={{ flexDirection: 'row' }}>
            <CheckBox

              value={this.state.gender === 'Female' ? true : false }
              onValueChange={() => this.onSelectFemale()}
            />
            <Text style={{marginTop: 5}}>Kobieta</Text>
          </View>
        </View>
        <ButtonNext onPress={this.onNextClicked}>Dalej</ButtonNext>
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  gender: state.Profile.myProfile.gender
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setGender: (gender: Gender) => setGender(gender)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(GenderTypeScreen)
