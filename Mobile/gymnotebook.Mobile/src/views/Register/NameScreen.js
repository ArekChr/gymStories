import React, { Component } from 'react'
import { View } from 'react-native'
import { ButtonNext, FloatingInput, TitleComponent, ErrorMessage } from '../../component'
import { setName } from '../../store/profile/actions'
import { connect } from 'react-redux'

class NameScreen extends Component {
  constructor(props) {
    super(props)
    this.inputs = {}
  }

  state = {
    firstName: '',
    lastName: '',
    error: '',
    firstNameValid: true,
    lastNameValid: true
  }

  focusNextField = (id) => {
    this.inputs[id].focus();
  }

  hasNumber = (myString) => {
    return /\d/.test(myString);
  }

  onNextClicked = () => {
    const {firstName, lastName, firstNameValid, lastNameValid } = this.state;

    if(firstName === '' && lastName === ''){
      this.setState({error: 'Wprowadź imię i nazwisko.', firstNameValid: false, lastNameValid: false })
    }
    else if(firstName === ''){
      this.setState({error: 'Wprowadź imię.', firstNameValid: false, lastNameValid: true})
    }
    else if(lastName === ''){
      this.setState({error: 'Wprowadź nazwisko.', lastNameValid: false, firstNameValid: true})
    }
    else if(firstNameValid && lastNameValid){
      this.setState({error: '', lastNameValid: true, firstNameValid: true})
      this.props.setName(firstName, lastName)
      this.props.navigation.navigate('BirthDateScreen')
    }
  }

  handleFirstNameChange = (newText) => {
    const firstNameHaveNumbers = this.hasNumber(newText)
    const {lastNameHaveNumbers} = this.state;
    let error = '';
    let firstNameValid = true;
    if(firstNameHaveNumbers){
      if(lastNameHaveNumbers){
        error = 'Twoje imię i nazwisko nie może zawierać cyfr.';
      }
      error = 'Twoje imię nie może zawierać cyfr.';
      firstNameValid = false;
    }
    this.setState({ firstName: newText, error: error, firstNameValid: firstNameValid, firstNameHaveNumbers: firstNameHaveNumbers })
  }

  handleLastNameChange = (newText) => {
    const lastNameHaveNumbers = this.hasNumber(newText)
    const {firstNameHaveNumbers} = this.state;
    let error = '';
    let lastNameValid = true;
    if(lastNameHaveNumbers){
      if(firstNameHaveNumbers){
        error = 'Twoje imię i nazwisko nie może zawierać cyfr.';
      }
      error = 'Twoje nazwisko nie może zawierać cyfr.';
      lastNameValid = false;
    }
    this.setState({ lastName: newText, error: error, lastNameValid: lastNameValid, lastNameHaveNumbers: lastNameHaveNumbers })
  }

  render() {
    return (
      <View style={{ margin: 20 }}>
        <TitleComponent>Jak się nazywasz?</TitleComponent>
        <ErrorMessage>{this.state.error}</ErrorMessage>
        <View style={{ flexDirection: 'row', width: '50%' }}>
          <FloatingInput label="Imię"
            value={this.state.firstName}
            isValid={this.state.firstNameValid}
            onChangeText={this.handleFirstNameChange}
            autoFocus={true}
            onSubmitEditing={() => { this.focusNextField('lastName') }} />
          <FloatingInput label="Nazwisko"          
            value={this.state.lastName}
            isValid={this.state.lastNameValid}
            onChangeText={this.handleLastNameChange}
            onRef={(ref) => { this.inputs['lastName'] = ref }} />
        </View>
        <ButtonNext onPress={this.onNextClicked}>Dalej</ButtonNext>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setName: (firstName, lastName) => setName(firstName, lastName)(dispatch)
})

export default connect(null, mapDispatchToProps)(NameScreen)