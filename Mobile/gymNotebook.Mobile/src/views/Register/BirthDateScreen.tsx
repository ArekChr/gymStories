import React, { Component } from 'react';
import { View } from 'react-native';
import { ButtonNext, TitleComponent } from '../../component'
import { setDateOfBirth } from '../../store/profile/actions'
import { connect } from 'react-redux'
import { DatePickerView, Provider } from '@ant-design/react-native';
import enUS from '@ant-design/react-native/lib/locale-provider/en_US';
import { NavigationScreenProp } from 'react-navigation';
import { ApplicationState } from '../../store';
import { Dispatch } from 'redux';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<BirthDateScreen>
}

class BirthDateScreen extends Component<Props> {

  state = {
    dateOfBirth: this.props.dateOfBirth? new Date(this.props.dateOfBirth) : new Date(2000,1,1)
  }

  onChange = (value: Date) => {
    this.setState({ dateOfBirth: value});
  }

  // TODO: if user does not change date ask if it is correct
  onNextClicked = () => {
    let date = this.state.dateOfBirth
    date.setHours(12)
    const newDate = date.toISOString().substr(0,10)
    this.props.setDateOfBirth(newDate)
    this.props.navigation.navigate('GenderTypeScreen')
  }

  render() {
    const datemin = new Date(1900,1,1)
    const datemax = new Date()
    
    return (
      <Provider locale={enUS}>
        <View style={{ margin: 20 }}>
          <TitleComponent>Podaj swoją datę urodzenia</TitleComponent>
            <DatePickerView
              mode="date"
              value={this.state.dateOfBirth}
              onChange={this.onChange}
              //onValueChange={this.onValueChange}
              minDate={datemin}
              maxDate={datemax}
              format='dd-MM-yyyy'
              style={{width: '80%', alignSelf: 'center', marginTop: 10 }}
            />
          <ButtonNext onPress={this.onNextClicked}>Dalej</ButtonNext>
        </View>
      </Provider>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  dateOfBirth: state.Profile.profile.dateOfBirth
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setDateOfBirth: (dateOfBirth: string) => setDateOfBirth(dateOfBirth)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BirthDateScreen)
