import React from 'react';
import { ACTIVE_ICON, INACTIVE_ICON, COLOR_SECONDARY } from '../styles/common'
import ActiveTab from '../views/tabs/ActiveTab'
import GymTab from '../views/tabs/GymTab'
import HomeTab from '../views/tabs/HomeTab/index.js'
import ProfileTab from '../views/tabs/ProfileTab'
import SearchTab from '../views/tabs/SearchTab'
import SettingsScreen from '../views/tabs/ProfileTab/SettingsScreen'
import LoginScreen from '../views/Login'
import RegisterScreen from '../views/Register'
import AddProgressScreen from '../views/AddProgress'
import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
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

const ProfileStackNavigator = createStackNavigator({
  Profile: {
    screen: ProfileTab,
    navigationOptions: ({ navigation }) => ({
      
    })
  },
  Settings: SettingsScreen
},{
})

const AppTabNavigator = createBottomTabNavigator({
    HomeTab: HomeTab,
    SearchTab: SearchTab,
    ActiveTab: ProgressTab,
    GymTab: GymTab,
    ProfileTab: ProfileStackNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({tintColor}) => {
        const { routeName } = navigation.state
        switch(routeName){
          case 'HomeTab': 
            return <Entypo name="home" size={25} color={tintColor} />
          case 'ActiveTab':
            return <MaterialCommunityIcons name="heart-pulse" size={30} color={tintColor} />
          case 'ProfileTab':
            return <Entypo name="user" size={26} color={tintColor} />
        }
      }
    }),
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions : {
      style: {
        elevation: 10,
        borderTopWidth: 0,
      },
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

const MainDrawerNavigator = createDrawerNavigator({
  Home: AppTabNavigator
}, {
  drawerPosition:'right',
  drawerLockMode: 'unlocked'
})

const Home = createStackNavigator({
  HomeScreen: {
    screen: MainDrawerNavigator,
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