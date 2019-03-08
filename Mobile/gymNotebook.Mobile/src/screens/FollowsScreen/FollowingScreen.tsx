import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../redux';
import { NavigationScreenProp, NavigationScreenProps } from 'react-navigation';
import { Fonts } from '../../styles';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<FollowingScreen>
}

class FollowingScreen extends Component<Props> {

  static navigationOptions = ({ navigation, screenProps }: NavigationScreenProps) => {
    return {
      tabBarIcon: <Text style={{fontSize: 20, fontFamily: Fonts.robotoBold, fontWeight: undefined}}>{screenProps!.profile.followingCount}</Text>,
      tabBarLabel: "obserwowani"
    }
  }

  render() {
    return <View><Text style={{fontSize: 20, fontFamily: Fonts.robotoBold, fontWeight: undefined}}>1</Text></View>;
  }
}

const mapStateToProps = (state: AppState) => ({

})

const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(FollowingScreen)
