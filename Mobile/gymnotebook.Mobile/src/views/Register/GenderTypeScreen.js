import React, { Component } from 'react';
import { View } from 'react-native';
import { ButtonNext, TitleComponent, ErrorMessage } from '../../component'
import styles from '../../styles'
import {setGenderType} from '../../store/profile/actions'
import {connect} from 'react-redux'

class GenderTypeScreen extends Component {

  state = { 
    genderType: '',
    error: '',
  }

  onSelectedGender = () => {
    this.setState({error: ''})
  }

  onNextClicked = () => {
    const { genderType } = this.state;
    if(genderType === '') {
      this.setState({error: 'Wybierz płeć.'})
    }
    else {
      this.props.setGenderType(genderType)
      this.props.navigation.navigate('EmailScreen')
    }
  }

  render() {
    return (
      <View style={styles.registerContainer}>
        <TitleComponent>Jakiej jesteś płci?</TitleComponent>
        <ErrorMessage>{this.state.error}</ErrorMessage>
        <ButtonNext onPress={this.onNextClicked}>Dalej</ButtonNext>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setGenderType: (genderType) => setGenderType(genderType)(dispatch)
})

export default connect(null, mapDispatchToProps)(GenderTypeScreen)
