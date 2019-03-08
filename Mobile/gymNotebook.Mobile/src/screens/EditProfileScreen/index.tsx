import React, { Component } from 'react'
import { View, Picker, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker';
import { ProfilePhoto, FloatingInput, TextButton, CheckButton } from '../../components';
import { updateProfileImage, updateProfileData } from '../../redux/profile/actions'
import { Gender } from '../../redux/profile/types';
import { NavigationScreenProp, NavigationScreenProps } from 'react-navigation';
import { AppState } from '../../redux';
import { Dispatch } from 'redux';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<EditProfileScreen>
}

class EditProfileScreen extends Component<Props> {
  
  state = {
    profile: {
      firstName: {
        label: 'Imię',
        value: this.props.myProfile.firstName || '',
        isValid: true,
      },
      lastName: {
        label: 'Nazwisko',
        value: this.props.myProfile.lastName,
        isValid: true,
      },
      description: {
        label: 'Opis profilu',
        value: this.props.myProfile.description || '',
        isValid: true,
      },
      email: {
        label: 'email',
        value: this.props.myProfile.email || '',
        isValid: true,
      },
      gender: {
        label: 'Płeć',
        value: this.props.myProfile.gender || '',
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

  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
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
    const { auth, myProfile: profile } = this.props

    if(pickedImage){
      this.props.updateProfileImage(auth.uid, pickedImage.path, profile.id, () => {
        this.props.navigation.popToTop();
      })
    }
  }

  onPhotoPress = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      compressImageMaxWidth: 400,
      compressImageMaxHeight: 400,
      cropping: true,
      compressImageQuality: 0.3
    }).then((image) => {
      this.setState({
        pickedImage: { ...image }
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
    const { gender, firstName, lastName, description } = this.state.profile
    const { imageURL } = this.props.myProfile;
    const { pickedImage } = this.state
    return (
      <ScrollView>
        <View style={{ margin: 10}}>
          <View style={{justifyContent: 'center', alignSelf: 'center', marginTop: 30 }}>
            <ProfilePhoto onPress={this.onPhotoPress} source={pickedImage ? pickedImage.path : imageURL ? imageURL : null}/>
            <TextButton style={{ marginTop: 5 }} onPress={this.onPhotoPress}>Zmień zdjęcie</TextButton>
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

const mapStateToProps = (state: AppState) => ({
  myProfile: state.Profile.myProfile,
  auth: state.Auth.auth
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateProfileImage: (uid: string, filePath: string, profilePath: string, cb?: () => void) => updateProfileImage(uid, filePath, profilePath, cb)(dispatch),
  updateProfileData: (data: any) => updateProfileData(data)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)
