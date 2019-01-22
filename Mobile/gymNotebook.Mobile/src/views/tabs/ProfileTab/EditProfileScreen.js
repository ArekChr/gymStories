import React, { Component } from 'react'
import { View, Picker, ScrollView, CameraRoll, PermissionsAndroid } from 'react-native'
import { connect } from 'react-redux'
//import ImagePicker from 'react-native-image-picker'
import ImagePicker from 'react-native-image-crop-picker';
import { ProfilePhoto, FloatingInput, TextButton, CheckButton } from '../../../component';
import { updateProfilePhoto } from '../../../store/profile/actions'

class EditProfileScreen extends Component {
  
  state = {
    profile: {
      photo: null,
      firstName: {
        label: 'Imię',
        value: this.props.profile.firstName || '',
        isValid: true,
      },
      lastName: {
        label: 'Nazwisko',
        value: this.props.profile.lastName || '',
        isValid: true,
      },
      description: {
        label: 'Opis profilu',
        value: this.props.profile.description || '',
        isValid: true,
      },
      email: {
        label: 'email',
        value: this.props.profile.email || '',
        isValid: true,
      },
      gender: {
        label: 'Płeć',
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
    },
    pickedImage: null
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Dodaj',
      headerRight: (
        <CheckButton onPress={navigation.getParam('onProfileSave')} />
      )
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ onProfileSave: this._onProfileSave})
  }

  _onProfileSave = () => {
    const { pickedImage } = this.state;
    if(pickedImage){
      this.props.updateProfilePhoto(this.state.pickedImage);
    }
    this.props.navigation.popToTop();
  }

  onPhotoPress = () => {
    ImagePicker.openPicker({
      width: 5000,
      height: 5000,
      cropping: true
    }).then(image => {
      console.log(image)
      this.setState({
        pickedImage: { uri: image.path, ...image }
      });
    });
  };

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
    const { photo, gender, firstName, lastName, description } = this.state.profile
    return (
      <ScrollView>
        <View style={{ margin: 10}}>
          <View style={{justifyContent: 'center', alignSelf: 'center', marginTop: 30 }}>
            <ProfilePhoto onPress={this.onPhotoClick} source={this.state.pickedImage ? this.state.pickedImage : require('../../../images/profile2.jpg')}/>
            <TextButton style={{ marginTop: 5 }} onPress={this.onPhotoPress}>Zmień zdjęcie</TextButton>
          </View>
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
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#aaa' }}>
            <Picker
              selectedValue={gender.value}
              style={{ height: 50, width: '100%', marginTop: 20 }}
              onValueChange={(value) => this.onGenderChange(value)}>
              <Picker.Item label={gender.optional.male.label} value={gender.optional.male.value} />
              <Picker.Item label={gender.optional.female.label} value={gender.optional.female.value} />
            </Picker>
          </View>
        </View>
      </ScrollView>

    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.Profile.profile
})

const mapDispatchToProps = (dispatch) => ({
  updateProfilePhoto: (photo) => updateProfilePhoto(photo)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)
