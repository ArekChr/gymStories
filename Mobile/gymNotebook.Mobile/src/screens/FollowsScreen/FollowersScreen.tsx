import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../redux';
import { Profile } from '../../redux/profile/types';
import { NavigationScreenProps, NavigationScreenProp } from 'react-navigation';
import { Fonts } from '../../styles';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<FollowersScreen>
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

  componentDidMount() {
  }
  
  render() {
    return <View><Text>2</Text></View>;
  }
}

const mapStateToProps = (state: AppState) => ({
  
})

const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(FollowersScreen)
