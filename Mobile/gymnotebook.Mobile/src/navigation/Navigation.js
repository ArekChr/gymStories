import React from 'react';
import {Easing, Animated} from 'react-native'

import ActiveTab from '../views/tabs/ActiveTab'
import GymTab from '../views/tabs/GymTab'
import HomeTab from '../views/tabs/HomeTab/index.js'
import ProfileTab from '../views/tabs/ProfileTab'
import SearchTab from '../views/tabs/SearchTab'
import SettingsScreen from '../views/tabs/ProfileTab/SettingsScreen'
import LoginScreen from '../views/Login'
import AddProgressScreen from '../views/AddProgress'

import {
  BirthDateScreen, 
  EmailScreen, 
  GenderTypeScreen, 
  NameScreen, 
  PasswordScreen, 
  ProfileTypeScreen, 
  RegisterScreen
} from '../views/Register'

import { 
  createSwitchNavigator, 
  createStackNavigator, 
  createAppContainer, 
  createBottomTabNavigator, 
  createDrawerNavigator 
} from 'react-navigation'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'

import { PRIMARY_COLOR, THEME_FONT_COLOR, ACTIVE_ICON, INACTIVE_ICON } from '../styles/common'

const ProgressTabStackNavigator = createStackNavigator({
  ProgressTab: { screen: ActiveTab }
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: PRIMARY_COLOR,
    },
    headerTintColor: THEME_FONT_COLOR
  })
})

const ProfileStackNavigator = createStackNavigator({
  Profile: {
    screen: ProfileTab,
    navigationOptions: { header: null }
  },
  Settings: SettingsScreen
},{
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: PRIMARY_COLOR,
    },
    headerTintColor: THEME_FONT_COLOR
  })
})

const AppTabNavigator = createBottomTabNavigator({
    HomeTab: HomeTab,
    SearchTab: SearchTab,
    ActiveTab: ProgressTabStackNavigator,
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

const SignInStackNavigator = createStackNavigator({
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
  NameScreen : { 
    screen: NameScreen,
    navigationOptions: {
      title: 'Nazwa'
    }
  },
  BirthDateScreen : { 
    screen: BirthDateScreen,
    navigationOptions: {
      title: 'Data urodzenia'
    }
  },
  GenderTypeScreen : { 
    screen: GenderTypeScreen,
    navigationOptions: {
      title: 'Rodzaj płci'
    }
  },
  ProfileTypeScreen : { 
    screen: ProfileTypeScreen,
    navigationOptions: {
      title: 'Rodzaj profilu'
    }
  },
  EmailScreen : { 
    screen: EmailScreen,
    navigationOptions: {
      title: 'Adres email'
    }
  },
  PasswordScreen : { 
    screen: PasswordScreen,
    navigationOptions: {
      title: 'Hasło'
    }
  }
},{
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: PRIMARY_COLOR,
    },
    headerTintColor: THEME_FONT_COLOR
  }),
  transitionConfig: () => ({
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {      
      const { position, scene } = sceneProps
      const thisSceneIndex = scene.index
      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [0, 1],
      })

      return { opacity } 
    }
  })
})

const MainDrawerNavigator = createDrawerNavigator({
  Home: AppTabNavigator
}, {
  drawerPosition:'right',
  drawerLockMode: 'unlocked'
})

const HomeStackNavigator = createStackNavigator({
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
      backgroundColor: PRIMARY_COLOR,
    },
    headerTintColor: THEME_FONT_COLOR
  })
})

const AppNavigator = createAppContainer(createSwitchNavigator(
  {
    LoginScreen: SignInStackNavigator,
    HomeScreen: HomeStackNavigator
  }
));

export default AppNavigator