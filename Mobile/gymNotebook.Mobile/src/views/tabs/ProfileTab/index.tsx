import React, { Component } from 'react'
import { View, Text, TouchableOpacity, RefreshControl, ScrollView } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { fetchProfile } from '../../../store/profile/actions'
import { connect } from 'react-redux';
import { ProfilePhoto } from '../../../component'
import { Dispatch } from 'redux';
import { ApplicationState } from '../../../store';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: any
}

class ProfileTab extends Component<Props> {

  // TODO: get previous state from asyncStorage 

  state = {
    refreshing: false,
    profile: {
      firstName: {
        label: '',
        value: ''
      },
      lastName: {
        label: '',
        value: ''
      },
      description: {
        label: '',
        value: ''
      },
      email: {
        label: '',
        value: ''
      },
      gender: {
        label: '',
        value: ''
      },
      followingCount: {
        label: '',
        value: 0
      },
      followersCount: {
        label: '',
        value: 0
      },
      posts: {
        label: '',
        value: 0
      }
    }
  }

  onEditProfilePress = () => {
    this.props.navigation.navigate('EditProfileScreen')
  }

  onSettingsPress = () => {
    this.props.navigation.navigate('Settings')
  }

  componentDidMount() {
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    this.props.fetchProfile(this.props.auth.uid, () => {
      this.setState({refreshing: false});
    })
  }

  onPhotoClicked = () => {
    // TODO: modal for edit photo
  }

  render() {

    const { profile } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView 
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
         style={{height: '100%'}}>
          <View style={{ paddingTop: 15 }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'center', paddingLeft: 15 }}>
                  <ProfilePhoto onPress={this.onPhotoClicked()} source={profile.imageURL} />
                </View>
                  <View style={{ flex: 3 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }} >0</Text>
                        <Text style={{ fontSize: 11, color: 'grey' }}>Posty</Text>
                      </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ fontSize: 18, fontWeight: 'bold' }} >{profile.followingCount}</Text>
                          <Text style={{ fontSize: 11, color: 'grey' }}>Obserwujący</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ fontSize: 18, fontWeight: 'bold' }} >{profile.followersCount}</Text>
                          <Text style={{ fontSize: 11, color: 'grey' }}>Obserwuje</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 7 }}>
                      <TouchableOpacity onPress={this.onEditProfilePress}
                        style={{ alignItems: 'center', borderWidth: 1, flex: 3, marginLeft: 10, justifyContent: 'center', height: 30, borderRadius: 5 }}>
                        <Text>Edytuj profil</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.onSettingsPress}
                          style={{ alignItems: 'center', borderWidth: 1, flex: 1, marginLeft: 5, marginRight: 10, justifyContent: 'center', height: 30, borderRadius: 5 }}>
                        <AntDesign size={20} name='setting' color='black' />
                      </TouchableOpacity>
                    </View>
                  </View>
            </View>
            <View style={{ paddingHorizontal: 15, paddingTop: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>{`${profile.firstName} ${profile.lastName}`}</Text>
              <Text>{profile.description}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = ({Profile, Auth}: ApplicationState) => ({
  profileLoading: Profile.loading,
  profile: Profile.profile,
  auth: Auth.auth
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProfile: (uid: string, cb?: () => void) => fetchProfile(uid, cb)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTab)