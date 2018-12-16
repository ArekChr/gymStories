import React from 'react';
import { ACTIVE_ICON, INACTIVE_ICON, COLOR_SECONDARY } from '../styles/common'
import ActiveTab from '../views/tabs/ActiveTab'
import GymTab from '../views/tabs/GymTab'
import HomeTab from '../views/tabs/HomeTab'
import ProfileTab from '../views/tabs/ProfileTab'
import SearchTab from '../views/tabs/SearchTab'
import AddTraining from '../views/AddTraining'
import LoginScreen from '../views/Login'
import RegisterScreen from '../views/Register'
import AddProgressScreen from '../views/ProgressTab/AddProgressScreen'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Entypo'

const GymNavigator = createStackNavigator({
  GymTab: {
    screen: GymTab,
    navigationOptions: {
      header: null
    }
  },
  AddTraining: {
    screen: AddTraining,
    navigationOptions: {
      header: null,
      tabBarVisible: false
    }
  }
})

const ProgressTab = createStackNavigator({
  ProgressTab: { screen: ActiveTab},
  AddProgress: { screen: AddProgressScreen}
})
{/* <MaterialCommunityIcons name="heart-pulse" size={30} color={tintColor} /> */}
{/* <Icon name="home" size={25} color={tintColor} /> */}
const AppTabNavigator = createBottomTabNavigator({
    HomeTab: HomeTab,
    SearchTab: SearchTab,
    ActiveTab: ProgressTab,
    GymTab: GymTab,
    ProfileTab: ProfileTab
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({tintColor}) => {
        const { routeName } = navigation.state
        if(routeName === 'HomeTab') {
          return <Icon name="home" size={25} color={tintColor} />
        }
        else if (routeName === 'ActiveTab'){
          return <MaterialCommunityIcons name="heart-pulse" size={30} color={tintColor} />
        }
      }
    }),
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions : {
      activeTintColor: ACTIVE_ICON,
      inactiveTintColor: INACTIVE_ICON,
      showIcon: true,
      showLabel: false
    }
  })

const Home = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: {
      header: null
    }
  },
  HomeScreen: {
    screen: AppTabNavigator,
    navigationOptions: {
      header: null
    }
  }
})

const AppNavigator = createAppContainer(Home);

export default AppNavigator