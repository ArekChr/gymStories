import React, { Component } from 'react';
import { View } from 'react-native';
import { ButtonNext, TitleComponent } from '../../component'
import { setBirthDate } from '../../store/profile/actions'
import { connect } from 'react-redux'

class BirthDateScreen extends Component {

  state = {
    birthDate: ''
  }

  onNextClicked = () => {
    this.props.setBirthDate(this.state.birthDate)
    this.props.navigation.navigate('GenderTypeScreen')
  }

  render() {
    return (
      <View style={{ margin: 20 }}>
        <TitleComponent>Podaj swoją datę urodzenia</TitleComponent>
        <ButtonNext onPress={this.onNextClicked}>Dalej</ButtonNext>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setBirthDate: (birthDate) => setBirthDate(birthDate)(dispatch)
})

export default connect()(BirthDateScreen)
