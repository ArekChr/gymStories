import React, { Component } from 'react'
import { View } from 'react-native'
import { ButtonNext, FloatingInput, TitleComponent, ErrorMessage } from '../../component'

class NameScreen extends Component {
  constructor(props) {
    super(props)
    this.inputs = {}
  }

  state = {
    firstName: '',
    lastName: '',
    error: '',
    firstNameValid: false,
    lastNameValid: false
  }

  focusNextField = (id) => {
    this.inputs[id].focus();
  }

  onNextClicked = () => {
    if(this.state.firstName === '' && this.state.lastName === ''){
      this.setState({error: 'Wprowadź imię i nazwisko.', firstNameValid: true, lastNameValid: true })
    }
    else if(this.state.firstName === ''){
      this.setState({error: 'Wprowadź imię.', firstNameValid: true, lastNameValid: false})
    }
    else if(this.state.lastName === ''){
      this.setState({error: 'Wprowadź nazwisko.', lastNameValid: true, firstNameValid: false})
    }
    
  }

  handleFirstNameChange = (newText) => {
    this.setState({ firstName: newText, error: '', firstNameValid: false })
  }

  handleLastNameChange = (newText) => {
    this.setState({ lastName: newText, error: '', lastNameValid: false })
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

export default NameScreen