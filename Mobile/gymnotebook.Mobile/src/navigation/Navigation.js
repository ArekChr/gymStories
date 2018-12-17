import React from 'react';
import { ACTIVE_ICON, INACTIVE_ICON, COLOR_SECONDARY } from '../styles/common'
import ActiveTab from '../views/tabs/ActiveTab'
import GymTab from '../views/tabs/GymTab'
import HomeTab from '../views/tabs/HomeTab/index.js'
import ProfileTab from '../views/tabs/ProfileTab'
import SearchTab from '../views/tabs/SearchTab'
import LoginScreen from '../views/Login'
import RegisterScreen from '../views/Register'
import AddProgressScreen from '../views/AddProgress'
import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Entypo'
import { HEADER_COLOR, STATUS_BAR_COLOR } from '../styles/common'

const ProgressTab = createStackNavigator({
  ProgressTab: { screen: ActiveTab }
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: HEADER_COLOR,
    },
    headerTintColor: 'white'
  })
})

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

const SignIn = createStackNavigator({
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
  }
})

const Home = createStackNavigator({
  HomeScreen: {
    screen: AppTabNavigator,
    navigationOptions: {
      header: null
    }
  },
  AddProgressScreen: { 
    screen: AddProgressScreen 
  }
},{
  defaultNavigationOptions: () => ({
    headerStyle: {
      backgroundColor: HEADER_COLOR,
    },
    headerTintColor: 'white'
  })
})

const AppNavigator = createAppContainer(createSwitchNavigator(
  {
    LoginScreen: SignIn,
    HomeScreen: Home
  }
));

export default AppNavigator