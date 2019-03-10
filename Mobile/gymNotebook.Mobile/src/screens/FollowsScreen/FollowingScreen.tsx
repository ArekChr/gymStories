import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../redux';
import { NavigationScreenProp, NavigationScreenProps, NavigationActions } from 'react-navigation';
import { Fonts } from '../../styles';
import { Spinner } from '../../components/Spinner';
import { SquarePhoto } from '../../components';
import { Profile } from '../../redux/profile/types';
import FollowProfiles from './FollowProfiles';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<FollowingScreen>
  screenProps: {
    profile: Profile
    navigation: any
  }
}

class FollowingScreen extends Component<Props> {

  state = {
    pressStatus: false
  }

  static navigationOptions = ({ navigation, screenProps }: NavigationScreenProps) => {
    
    return {
      tabBarIcon: <Text style={{fontSize: 20, fontFamily: Fonts.robotoBold, fontWeight: undefined}}>{screenProps!.profile.followingCount}</Text>,
      tabBarLabel: "obserwowani"
    }
  }

  onFollowClick = (profileId: string) => {

  }

  onProfileClick = (profile: Profile) => {
    this.props.screenProps.navigation.push('ProfileScreen', {
      profileId: profile.profileId,
      profile: profile
    })
  }


  render() {
    if (this.props.loading) {   
      return <Spinner />
    }
    return (
      <View>
        <FollowProfiles profiles={this.props.followingProfiles} onProfileClick={this.onProfileClick} />
      </View>
      )
  }
}

const styles = StyleSheet.create({
  usernameText: {
    marginTop: 'auto',
    marginBottom: 'auto',
    flex: 3,
    color: 'gray'
  },
  photo: { 
    marginRight: 10,
    paddingBottom: 5,
  },
  buttonPress: {
    backgroundColor: '#DDD'
  },
  button: {
    backgroundColor: 'white'
  }
});

const mapStateToProps = (state: AppState) => ({
  followingProfiles: state.Follow.myFollowingProfiles,
  followingIds: state.Follow.myFollowingIds,
  loading: state.Follow.loadingMyFollows
})

const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(FollowingScreen)
