import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../redux';
import { Profile, ProfileBasic } from '../../redux/profile/types';
import { NavigationScreenProps, NavigationScreenProp } from 'react-navigation';
import { Fonts } from '../../styles';
import { Spinner } from '../../components/Spinner';
import FollowProfiles from './FollowProfiles';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<FollowersScreen>
  screenProps: {
    profile: Profile
    navigation: any
  }
}

class FollowersScreen extends Component<Props> {

  state = {
    profile: {} as Profile
  }

  static navigationOptions = ({ navigation, screenProps }: NavigationScreenProps) => {
    return {
      tabBarIcon: <Text style={{fontSize: 20, fontFamily: Fonts.robotoBold, fontWeight: undefined}}>{screenProps!.profile.followersCount}</Text>,
      tabBarLabel: 'obserwujący',
    }
  }

  onProfileClick = (profile: ProfileBasic) => {
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
        <FollowProfiles profiles={this.props.followersProfiles} followingIds={this.props.followersIds} onProfileClick={this.onProfileClick} />
      </View>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  followersProfiles: state.Follow.myFollowersProfiles,
  followersIds: state.Follow.myFollowingIds,
  loading: state.Follow.loadingMyFollowers
})

const mapDispatchToProps = (dispatch: Dispatch) => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(FollowersScreen)
