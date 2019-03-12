import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../redux';
import { NavigationScreenProp, NavigationScreenProps } from 'react-navigation';
import { Fonts } from '../../styles';
import { Spinner } from '../../components/Spinner';
import { Profile, ProfileBasic } from '../../redux/profile/types';
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
    profile: {} as Profile
  }

  static navigationOptions = ({ navigation, screenProps }: NavigationScreenProps) => {
    return {
      tabBarIcon: <Text style={{fontSize: 20, fontFamily: Fonts.robotoBold, fontWeight: undefined}}>
          {navigation.state.params ? navigation.state.params.profile.followingCount : screenProps!.profile.followingCount}
        </Text>,
      tabBarLabel: "obserwowani"
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
        <FollowProfiles profiles={this.props.followingProfiles} followingIds={this.props.followingIds} onProfileClick={this.onProfileClick} />
      </View>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  followingProfiles: state.Follow.myFollowingProfiles,
  followingIds: state.Follow.myFollowingIds,
  loading: state.Follow.loadingMyFollowing
})

const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(FollowingScreen)
