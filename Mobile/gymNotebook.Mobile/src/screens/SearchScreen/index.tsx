import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { PRIMARY_COLOR } from '../../styles/common'
import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { Dispatch } from 'redux';
import { searchProfiles } from '../../redux/profile/actions';
import { Profile } from '../../redux/profile/types';
import { NavigationScreenProps } from 'react-navigation';
import { SquarePhoto } from '../../components';
import UserName from '../../components/UserName';

interface Props extends ReturnType<typeof mapStateToProps> {
  navigation: any
}

interface State {
  profiles: Profile[] | null,
  quantity: number
}

class SearchScreen extends Component<Props, State> {

  state = { 
    profiles: null,
    quantity: 20
  }

  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      header: null
    }
  }

  onProfilePress = (profile: Profile) => {
    this.props.navigation.navigate('ProfileScreen', {
      profile: profile,
      profileId: profile.id
    })
  }

  searchUsers = (text: string) => {
    if(text !== '') {
      searchProfiles(text, 20, this.props.myProfileId, (profiles) => {
        this.setState({profiles: profiles})
      })
    }
  }

  renderUsers() {
    const { profiles } = this.state
    if(profiles != null) {
      return profiles.map((user: Profile, i) => {
        return (
          <TouchableOpacity onPress={() => this.onProfilePress(user)} key={i} style={styles.profileTab}>
            <SquarePhoto source={user.imageURL} style={styles.photo} size='medium' />
            <UserName firstName={user.firstName} lastName={user.lastName} />
            <Text style={styles.usernameText}>{user.nickname}</Text>
          </TouchableOpacity>
        )
      })
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>

        <View style={{ backgroundColor: PRIMARY_COLOR}}>
          <View style={{flexDirection: 'row', marginBottom: 15, marginTop: 15, justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
            <View style={{
              backgroundColor: 'white',
              height: 30,
              width: 22,
              borderTopLeftRadius: 3,
              borderBottomLeftRadius: 3,
              justifyContent: 'center',
              paddingLeft: 5
            }}>
              <EvilIcons name='search' size={20} color='black' />
            </View>
            <TextInput 
              onChangeText={(text)=> this.searchUsers(text)}
              placeholder='Znajdź trenera'
              style={{ 
                fontSize: 15,
                backgroundColor: 'white', 
                width: '94%', 
                height: 30, 
                padding: 0, 
                paddingLeft: 10,
                borderBottomRightRadius:3, borderTopRightRadius:3}} 
            />
          </View>
        </View>
        <ScrollView keyboardShouldPersistTaps="handled" >
          {this.renderUsers()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  profileTab: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  photo: { 
    margin: 10,
    marginBottom: 5,
  },
  usernameText: { 
    fontWeight: '600',
    marginTop: 'auto',
    marginBottom: 'auto',
    color: 'black'
  }
})


const mapStateToProps = (state: AppState) => ({
  myProfileId: state.Profile.myProfile.id
});

export default connect(mapStateToProps, null)(SearchScreen)