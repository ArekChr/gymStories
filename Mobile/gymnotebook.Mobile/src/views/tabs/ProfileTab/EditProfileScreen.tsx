import React, { Component } from 'react'
import { View, Picker, ScrollView, CameraRoll, PermissionsAndroid } from 'react-native'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker';
import { ProfilePhoto, FloatingInput, TextButton, CheckButton } from '../../../component';
import { updateProfileImage, updateProfileData } from '../../../store/profile/actions'
import { Profile, Gender } from '../../../store/profile/types';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  profile: Profile
  navigation: NavigationScreenProp<EditProfileScreen>
  updateProfileImage: Function
}

class EditProfileScreen extends Component<Props> {
  
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
        value: this.props.profile.lastName,
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
    const { pickedImage, profile: { firstName, lastName, gender, description } } = this.state;
    if(pickedImage){
      this.props.updateProfileImage(this.state.pickedImage, { 
        firstName: firstName.value, 
        lastName: lastName.value, 
        gender: gender.value, 
        description: description.value 
      });
    }
    this.props.navigation.popToTop();
  }

  onPhotoClick = () => {

  }

  onPhotoPress = () => {
    ImagePicker.openPicker({
      width: 5000,
      height: 5000,
      cropping: true
    }).then(image => {
      this.setState({
        pickedImage: { uri: image.path, ...image }
      });
    });
  };

  onFirstNameChange = (value: string) => {
    // TODO: fist name validation
    this.setState((prevState) => ({
      ...prevState,
      profile: {
        ...prevState.profile,
        firstName: {
          ...prevState.profile.firstName,
          value: value
        }
      }
    }))
  }

  onLastNameChange = (value: string) => {
    // TODO: last name validation
    this.setState({
      profile: {
        ...this.state.profile,
        lastName: {
          ...this.state.profile.lastName,
          value: value
        }
      }
    })
  }

  onDescriptionChange = (value: string) => {
    // TODO: description name validation
    this.setState({
      profile: {
        ...this.state.profile,
        description: {
          ...this.state.profile.description,
          value: value
        }
      }
    })
  }

  onGenderChange = (value: Gender) => {
    this.setState({profile: {
      ...this.state.profile,
      gender: {
        ...this.state.profile.gender,
        value: value
      }
    }})
  }

  render() {
    const { photo, gender, firstName, lastName, description } = this.state.profile
    return (
      <ScrollView>
        <View style={{ margin: 10}}>
          <View style={{justifyContent: 'center', alignSelf: 'center', marginTop: 30 }}>
            <ProfilePhoto onPress={this.onPhotoClick()} source={this.state.pickedImage ? this.state.pickedImage : require('../../../images/profile2.jpg')}/>
            <TextButton style={{ marginTop: 5 }} onPress={() => this.onPhotoPress}>Zmień zdjęcie</TextButton>
          </View>
          <FloatingInput label={firstName.label}
            value={firstName.value}
            isValid={firstName.isValid}
            onChangeText={this.onFirstNameChange}/>
          <FloatingInput label={lastName.label}
            value={lastName.value}
            isValid={lastName.isValid}
            onChangeText={this.onLastNameChange}/>
          <FloatingInput label={description.label}
            value={description.value}
            isValid={description.isValid}
            onChangeText={this.onDescriptionChange}/>
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
  updateProfileImage: (photo) => updateProfileImage(photo)(dispatch),
  updateProfileData: (data) => updateProfileData(data)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)
