import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'
import ActiveTab from './tabNavigator/ActiveTab'
import GymTab from './tabNavigator/GymTab'
import HomeTab from './tabNavigator/HomeTab'
import ProfileTab from './tabNavigator/ProfileTab'
import SearchTab from './tabNavigator/SearchTab'

import { TabNavigator } from 'react-navigation'

export default class HomeScreen extends Component {

  public static navigationOptions = {
    title: 'gymNotebook',
    headerTitleStyle: {
      alignSelf: 'center',
      flex: 1,
      textAlign: 'center'
    },
    headerLeft:
        <TouchableOpacity>
        <Image style={{ width: 20, height: 20, marginLeft: 15, marginRight: 15 }}
            source={require('../images/photo-camera.png')}/>
        </TouchableOpacity>,

    headerRight:
        <TouchableOpacity>
            <Image style={{ width: 20, height: 20, marginLeft: 15, marginRight: 15 }}
                source={require('../images/send.png')}/>
        </TouchableOpacity>
  }

  public render(){
    return (
        <View style={styles.container}>
            <AppTabNavigator/>
        </View>
    )
  }
}

const AppTabNavigator = TabNavigator({

  HomeTab: {
    screen: HomeTab
  },
  SearchTab: {
    screen: SearchTab
  },
  ActiveTab: {
    screen: ActiveTab
  },
  GymTab: {
    screen: GymTab
  },
  ProfileTab: {
    screen: ProfileTab
  }
},
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions : {
      activeTintColor: '#000',
      inactiveTintColor: '#D1CECE',
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: '#FFFFFF',
        elevation: 15
      },
      indicatorStyle: {
        opacity: 0
      }
    }
  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 20,
    height: 20
  }
})
