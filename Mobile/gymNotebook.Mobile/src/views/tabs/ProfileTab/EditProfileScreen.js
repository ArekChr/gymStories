import React, { Component } from 'react'
import { View, Picker } from 'react-native'
import { connect } from 'react-redux'
import { ProfilePhoto, FloatingInput, TextButton } from '../../../component';

export class EditProfileScreen extends Component {
  
  state = {
    profile: {
      firstName: {
        label: '',
        value: this.props.profile.firstName || '',
        isValid: true,
      },
      lastName: {
        label: '',
        value: this.props.profile.lastName || '',
        isValid: true,
      },
      description: {
        label: '',
        value: this.props.profile.description || '',
        isValid: true,
      },
      email: {
        label: '',
        value: this.props.profile.email || '',
        isValid: true,
      },
      gender: {
        label: '',
        value: this.props.profile.gender || '',
        isValid: true,
        optional: {
          male: {
            value: 'Male',
            label: 'Mężczyzna'
          },
          female: {
            value: 'Female',
            label: 'Kobieta'
          }
        }
      }
    }
  }

  onPhotoClick = () => {
    // TODO: modal for edit photo
  }

  onFirstNameChange = () => {
    // TODO: fist name validation
  }

  onLastNameChange = () => {
    // TODO: last name validation
  }

  onDescriptionChange = () => {
    // TODO: description name validation
  }

  onGenderChange = (value) => {
    this.setState(prevState => ({
      ...prevState,
      profile: {
        ...prevState.profile,
        gender: {
          ...prevState.profile.gender,
          value: value
        }
      }
    }))
  }

  render() {
    const { profile: { gender, firstName, lastName, description } } = this.state
    return (
      <View>
        <ProfilePhoto onPress={this.onPhotoClick} source={require('../../../images/profile2.jpg')}></ProfilePhoto>
        <TextButton>Zmień zdjęcie</TextButton>
        <FloatingInput label={firstName.label}
          value={firstName.value}
          isValid={firstName.isValid}
          onChangeText={this.handleFirstNameChange}/>
        <FloatingInput label={lastName.label}
          value={lastName.value}
          isValid={lastName.isValid}
          onChangeText={this.handleFirstNameChange}/>
        <FloatingInput label={description.label}
          value={description.value}
          isValid={description.isValid}
          onChangeText={this.handleFirstNameChange}/>
        <Picker
          selectedValue={gender.value}
          style={{ height: 50, width: 100 }}
          onValueChange={(value) => this.onGenderChange(value)}>
          <Picker.Item label={gender.optional.male.label} value={gender.optional.male.value} />
          <Picker.Item label={gender.optional.female.label} value={gender.optional.female.value} />
        </Picker>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.Profile.profile
})

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)
