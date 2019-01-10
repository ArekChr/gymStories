import React, { Component } from 'react';
import { View } from 'react-native';
import { ButtonNext, TitleComponent } from '../../component'
import { setBirthDate } from '../../store/profile/actions'
import { connect } from 'react-redux'
import { DatePickerView } from '@ant-design/react-native';
import en_US from '@ant-design/react-native/lib/locale-provider/en_US';


class BirthDateScreen extends Component {

  state = {
    birthDate: ''
  }

  onChange = (value) => {
    this.setState({ birthDate: value});
  }

  // TODO: if user does not change date ask if it is correct
  onNextClicked = () => {
    let date = this.state.birthDate
    date.setHours(12)
    const newDate = date.toISOString().substr(0,10)
    this.props.setBirthDate(newDate)
    this.props.navigation.navigate('GenderTypeScreen')
  }

  render() {
    const datemin = new Date(1900,1,1)
    const datemax = new Date()
    
    return (
      <View style={{ margin: 20 }}>
        <TitleComponent>Podaj swoją datę urodzenia</TitleComponent>
        <DatePickerView
          mode="date"
          value={this.state.birthDate}
          onChange={this.onChange}
          onValueChange={this.onValueChange}
          locale={en_US}
          minDate={datemin}
          maxDate={datemax}
          format='dd-MM-yyyy'
          style={{width: '80%', alignSelf: 'center', marginTop: 10 }}
        />
        <ButtonNext onPress={this.onNextClicked}>Dalej</ButtonNext>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setBirthDate: (birthDate) => setBirthDate(birthDate)(dispatch)
})

export default connect(null, mapDispatchToProps)(BirthDateScreen)
