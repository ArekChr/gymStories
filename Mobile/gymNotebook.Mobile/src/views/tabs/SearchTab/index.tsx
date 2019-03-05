import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { PRIMARY_COLOR } from '../../../styles/common'
import { connect } from 'react-redux';
import { AppState } from '../../../store';
import { Dispatch } from 'redux';
import { searchProfiles } from '../../../store/profile/actions';
import { Profile } from '../../../store/profile/types';
import { NavigationScreenProps } from 'react-navigation';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: any
}

class SearchTab extends Component<Props> {

  state = { 
    quantity: 20
  }


  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      header: null
    }
  }

  onProfilePress = (profile: Profile) => {
    this.props.navigation.push('ProfileScreen', {
      profile: profile
    })
  }

  renderUsers() {
      return this.props.profiles.map((user, i) => {
        const source = user.imageURL ? {uri: user.imageURL} : require('../../../images/default-user.png')
        return (
          <TouchableOpacity onPress={() => this.onProfilePress(user)} key={i} style={styles.profileTab}>
            <Image style={styles.photo} source={source}/>
            <Text style={styles.usernameText}>{user.firstName} {user.lastName}</Text>
            <Text style={styles.usernameText}>{user.nickname}</Text>
          </TouchableOpacity>
        )
      })
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
              onChangeText={(text)=> this.props.searchProfiles(text, 20, this.props.myProfileId)}
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
        <ScrollView>
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
    width: 50,
    height: 50,
    borderRadius: 45
  },
  usernameText: { 
    fontWeight: '600',
    marginTop: 'auto',
    marginBottom: 'auto',
    color: 'black'
  }
})


const mapStateToProps = (state: AppState) => ({
  profiles: state.Profile.profiles,
  myProfileId: state.Profile.myProfile.id
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  searchProfiles:(text: string, quantity: number, myId: string) => searchProfiles(text, quantity, myId)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchTab)