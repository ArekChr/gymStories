import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../redux';
import { NavigationScreenProps, NavigationScreenProp, createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import { Profile } from '../../redux/profile/types';
import FollowingScreen from './FollowingScreen';
import FollowersScreen from './FollowersScreen';
import { Fonts } from '../../styles';

const TopNavigator = createMaterialTopTabNavigator({
  Followers: FollowersScreen,
  Following: FollowingScreen
}, {
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions : {
    style: {
      elevation: 2,
      borderBottomWidth: 0,
      backgroundColor: 'white',
      height: 52,
      top: -5
    },
    tabStyle: {
      padding: 5, height: 50
    },
    labelStyle: {
      fontFamily: Fonts.robotoRegular, fontSize: 13, margin: 0, padding: 0
    },
    iconStyle: {
      margin: 0, padding: 0
    },
    indicatorStyle: {
      backgroundColor: 'black',
      height: 1
    },
    activeTintColor: "rgb(0,0,0)",
    inactiveTintColor: 'rgba(0,0,0,0.3)',
    showIcon: true,
    showLabel: true,
    upperCaseLabel: false,
  }
})

const FollowTabNavigator = createAppContainer(TopNavigator)

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<FollowScreen>
}

class FollowScreen extends Component<Props> {

  state = {
    profile: null
  }

  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    let profile: Profile = navigation.getParam('profile')
    return {
      title: profile.nickname != null ? profile.nickname : profile.firstName,
      headerStyle: {
        shadowOpacity: 0,
        elevation: 0,
        height: 50
      },
      
    }
  }

  componentDidMount() {
    let profile: Profile = this.props.navigation.getParam('profile')
    this.props.navigation.setParams({})
    this.setState({profile})
  }

  render() {
    console.log("profil")
    console.log(this.state.profile)
    if(this.state.profile) {
      return (
        <FollowTabNavigator screenProps={{ profile: this.state.profile }} />
      )
    } else {
      return <View></View>
    }
  }
}

const mapStateToProps = (state: AppState) => ({

})

const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(FollowScreen)
