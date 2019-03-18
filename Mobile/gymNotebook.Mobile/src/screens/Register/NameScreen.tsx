import React, { Component } from 'react'
import { View, TextInput } from 'react-native'
import { ButtonNext, FloatingInput, TitleComponent, ErrorMessage } from '../../components'
import { setName } from '../../redux/profile/actions'
import { connect } from 'react-redux'
import { NavigationScreenProp } from 'react-navigation';
import { AppState } from '../../redux';
import { Dispatch } from 'redux';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<NameScreen>
}

class NameScreen extends Component<Props> {

  private inputs: TextInput[] = []

  state = {
    firstName: this.props.firstName || '',
    lastName: this.props.lastName || '',
    error: '',
    firstNameValid: true,
    lastNameValid: true,
    firstNameHaveNumbers: false,
    lastNameHaveNumbers: false,
    errors: {
      firstLastEmpty: 'Wprowadź imię i nazwisko.',
      firstEmpty: 'Wprowadź imię.',
      lastEmpty: 'Wprowadź nazwisko.',
      firstLastHaveNumbers: 'Twoje imię i nazwisko nie może zawierać cyfr.',
      firstHaveNumbers: 'Twoje imię nie może zawierać cyfr.',
      lastHaveNumbers: 'Twoje nazwisko nie może zawierać cyfr.'
    }
  }

  focusNextField = (id: any) => {
    this.inputs[id].focus();
  }

  hasNumber = (myString: string) => {
    return /\d/.test(myString);
  }

  onNextClicked = () => {
    const {firstName, lastName, firstNameValid, lastNameValid, firstNameHaveNumbers, lastNameHaveNumbers, errors } = this.state;

    if(firstName === '' && lastName === ''){
      this.setState({error: errors.firstLastEmpty, firstNameValid: false, lastNameValid: false })
    }
    else if(firstName === ''){
      this.setState({error: errors.firstEmpty, firstNameValid: false, lastNameValid: true})
    }
    else if(lastName === ''){
      this.setState({error: errors.lastEmpty, lastNameValid: false, firstNameValid: true})
    }
    else if(firstNameHaveNumbers && lastNameHaveNumbers){
      this.setState({error: errors.firstLastHaveNumbers, firstNameValid: false, lastNameValid: false })
    }
    else if(firstNameHaveNumbers){
      this.setState({error: errors.firstHaveNumbers, firstNameValid: false, lastNameValid: true })
    }
    else if(lastNameHaveNumbers){
      this.setState({error: errors.lastHaveNumbers, firstNameValid: true, lastNameValid: false })
    }
    else if(firstNameValid && lastNameValid){
      this.setState({error: '', lastNameValid: true, firstNameValid: true})
      this.props.setName(firstName, lastName)
      this.props.navigation.navigate('BirthDateScreen')
    }
  }

  handleFirstNameChange = (newText: string) => {
    const firstNameHaveNumbers = this.hasNumber(newText)
    const {lastNameHaveNumbers} = this.state;
    let error = '';
    let firstNameValid = true;
    if(firstNameHaveNumbers){
      if(lastNameHaveNumbers){
        error = this.state.errors.firstLastHaveNumbers;
      } else {
        error = this.state.errors.firstHaveNumbers;
      }
      firstNameValid = false;
    }
    this.setState({ firstName: newText, error: error, firstNameValid: firstNameValid, firstNameHaveNumbers: firstNameHaveNumbers })
  }

  handleLastNameChange = (newText: string) => {
    const lastNameHaveNumbers = this.hasNumber(newText)
    const {firstNameHaveNumbers} = this.state;
    let error = '';
    let lastNameValid = true;
    if(lastNameHaveNumbers){
      if(firstNameHaveNumbers){
        error = this.state.errors.firstLastHaveNumbers;
      } else {
        error = this.state.errors.lastHaveNumbers;
      }
      lastNameValid = false;
    }
    this.setState({ lastName: newText, error: error, lastNameValid: lastNameValid, lastNameHaveNumbers: lastNameHaveNumbers })
  }

  render() {
    return (
      <View style={{ margin: 20, flex: 1 }}>
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
            onRef={(ref: TextInput) => { this.inputs['lastName'] = ref }} />
        </View>
        <ButtonNext onPress={this.onNextClicked}>Dalej</ButtonNext>
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  firstName: state.Profile.myProfile.firstName,
  lastName: state.Profile.myProfile.lastName
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setName: (firstName: string, lastName: string) => setName(firstName, lastName)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(NameScreen)