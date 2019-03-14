import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../redux'
import { NavigationScreenProp } from 'react-navigation'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient';
import UserName from '../../components/UserName';
import { SquarePhoto } from '../../components';
import { Profile } from '../../redux/profile/types';
import { searchProfiles } from '../../redux/profile/actions';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<SearchChatsScreen>
}

interface State {
  profiles: Profile[] | null
  quantity: number
  searchText: string
}

class SearchChatsScreen extends Component<Props, State> {

  state = {
    searchText: '',
    profiles: null,
    quantity: 20
  }

  onProfilePress = (profile: Profile) => {
    this.props.navigation.navigate('ConversationScreen', {
      profile: profile,
      isNewChat: true,
    })
  }

  searchUsers = (searchText: string) => {
    this.setState({searchText: searchText})
    if(searchText !== '') {
      searchProfiles(searchText, 20, this.props.myProfileId, (profiles) => {
        this.setState({profiles: profiles})
      })
    }
  }

  renderUsers() {
    const { profiles } = this.state
    if(profiles != null) {
      return profiles.map((user: Profile, i: number) => {
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
      <View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <TouchableOpacity style={{margin: 10}} onPress={() => this.props.navigation.pop()}>
            <Feather name="arrow-left" size={32} color="black" />
          </TouchableOpacity>
          <TextInput placeholder="Szukaj" 
            autoFocus={true} 
            value={this.state.searchText} 
            onChangeText={(text) => this.searchUsers(text)}
            style={{ fontSize: 15, paddingLeft: 5, flex: 1, fontWeight: 'bold', marginRight: 10, borderColor: 'red'}} 
          />
          {
            this.state.searchText !== '' &&
            <TouchableOpacity onPress={() => this.setState({ searchText: '' })}>
              <MaterialIcons name='clear' size={30} color='black' style={{ margin: 10, marginTop: 12}} />
            </TouchableOpacity>
          }
        </View>
        <LinearGradient colors={['#DDD', '#FFF']} style={{ display: 'flex', width: '100%', height: 4 }}/>
        <ScrollView keyboardShouldPersistTaps="handled">
          {this.renderUsers()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  profileTab: {
    display: 'flex',
    flexDirection: 'row'
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

const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SearchChatsScreen)
