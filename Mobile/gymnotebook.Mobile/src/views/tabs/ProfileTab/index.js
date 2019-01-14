import React, { Component } from 'react'
import { View, Text, TouchableOpacity, RefreshControl, ScrollView } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { fetchProfile } from '../../../store/profile/actions'
import { connect } from 'react-redux';
import { ProfilePhoto } from '../../../component'

class ProfileTab extends Component {

  // TODO: get previous state from asyncStorage 

  state = {
    refreshing: false,
    // profile: {
    //   firstName: {
    //     label: '',
    //     value: this.props.profile.firstName || ''
    //   },
    //   lastName: {
    //     label: '',
    //     value: this.props.profile.lastName || ''
    //   },
    //   description: {
    //     label: '',
    //     value: this.props.profile.description || ''
    //   },
    //   email: {
    //     label: '',
    //     value: this.props.profile.email || ''
    //   },
    //   gender: {
    //     label: '',
    //     value: this.props.profile.gender || ''
    //   }
    // }
  }

  onSettingsPress = () => {
    this.props.navigation.navigate('Settings')
  }

  componentDidMount() {
    this.props.fetchProfile();
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    this.props.fetchProfile(() => {
      this.setState({refreshing: false});
    })
  }

  onPhotoClicked = () => {
    // TODO: modal for edit photo
  }

  render() {

    if(this.props.profile === undefined){
      return <View></View>
    }
    const profile = this.props.profile;

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
                  <ProfilePhoto onPress={this.onPhotoClicked} source={require('../../../images/profile2.jpg')} />
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
                      <TouchableOpacity
                        style={{ alignItems: 'center', borderWidth: 1, flex: 3, marginLeft: 10, justifyContent: 'center', height: 30, borderRadius: 5 }}>
                        <Text>Edytuj profil</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.onSettingsPress} bordered={true} dark={true}
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

const mapStateToProps = (state) => ({
  profileLoading: state.Profile.loading,
  profile: state.Profile.profile
});

const mapDispatchToProps = (dispatch) => ({
  fetchProfile: (callback) => fetchProfile(callback)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTab)