import React from 'react'
import {Easing, Animated} from 'react-native'

import LoginScreen from '../screens/LoginScreen'
import GymScreen from '../screens/GymScreen'
import SocialScreen from '../screens/SocialScreen'
import SearchScreen from '../screens/SearchScreen'
import ActiveTab from '../screens/ActiveScreen'
import MyProfileScreen from '../screens/MyProfileScreen'
import AddProgressScreen from '../screens/AddProgressScreen'
import CommentsScreen from '../screens/CommentsScreen'
import NewPostScreen from '../screens/NewPostScreen'
import SettingsScreen from '../screens/SettingsScreen'
import EditProfileScreen from '../screens/EditProfileScreen'
import StoryScreen from '../screens/StoryScreen'

import {
  BirthDateScreen, 
  EmailScreen, 
  GenderTypeScreen, 
  NameScreen, 
  PasswordScreen,
  RegisterScreen,
  RegisterEndScreen
} from '../screens/Register'

import { 
  createSwitchNavigator, 
  createStackNavigator, 
  createAppContainer, 
  createBottomTabNavigator
} from 'react-navigation'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { PRIMARY_COLOR, THEME_FONT_COLOR, ACTIVE_ICON, INACTIVE_ICON, FONT_COLOR, HEADER_WHITE } from '../styles/common'
import { Fonts } from '../styles'
import ProfileScreen from '../screens/ProfileScreen'
import FollowScreen from '../screens/FollowsScreen'
import PostScreen from '../screens/PostScreen'
import ChatsScreen from '../screens/ChatsScreen'
import SearchChatsScreen from '../screens/SearchChatsScreen'
import ConversationScreen from '../screens/ConversationScreen'
import { Colors } from '../styles/colors';
import AddProgress from '../screens/GymScreen/AddProgress';
import AddTrainingScreen from '../screens/AddTrainingScreen'
import { MeasureScreen } from '../screens/MeasureScreen';

const ProgressTabStackNavigator = createStackNavigator({
  ProgressTab: { screen: ActiveTab }
},{
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: PRIMARY_COLOR,
    },
    headerTintColor: THEME_FONT_COLOR,
    headerTitleStyle : {
      fontWeight: undefined,
      fontFamily: Fonts.robotoRegular
    }
  })
})

const HomeTabStackNavigator = createStackNavigator({
  HomeTab: { 
    screen: SocialScreen 
  }
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: 'white',
      height: 50
    },
    headerTintColor: 'black',
    headerTitleStyle : {
      fontWeight: undefined,
      fontFamily: Fonts.pacificoRegular,
      marginLeft: -10
    },
    title: 'gymNotebook'
  })
})

const SearchTabStackNavigator = createStackNavigator({
  SearchTab: SearchScreen,
  ProfileScreen: ProfileScreen,
  PostScreen: PostScreen,
  CommentsScreen: {
    screen: CommentsScreen,
    navigationOptions: {
      title: 'Komentarze'
    }
  },
})

const ProfileStackNavigator = createStackNavigator({
  Profile: {
    screen: MyProfileScreen,
    navigationOptions: { header: null }
  },
  Settings: SettingsScreen,
  Follow: FollowScreen,
  ProfileScreen: ProfileScreen,
  PostScreen: PostScreen,
  CommentsScreen: {
    screen: CommentsScreen,
    navigationOptions: {
      title: 'Komentarze'
    }
  },
},{
  mode: 'card',
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: HEADER_WHITE,
    },
    headerTintColor: 'black',
    headerTitleStyle : {
      fontWeight: undefined,
      fontFamily: Fonts.robotoMedium,
      color: 'black'
    }
  })
})

const AppTabNavigator = createBottomTabNavigator({
  HomeTab: HomeTabStackNavigator,
  SearchTab: SearchTabStackNavigator,
  ActiveTab: ProgressTabStackNavigator,
  GymTab: GymScreen,
  MeasureTab: MeasureScreen,
  ProfileTab: ProfileStackNavigator
},{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({tintColor}: any) => {
      const { routeName } = navigation.state
      switch(routeName){
        case 'SearchTab':
          return <FontAwesome name="search" size={24} color={tintColor} />
        case 'HomeTab': 
          return <Entypo name="home" size={25} color={tintColor || undefined} />
        case 'ActiveTab':
          return <MaterialCommunityIcons name="heart-pulse" size={30} color={tintColor || undefined} />
        case 'MeasureTab':
          return <Entypo name="ruler" size={25} color={tintColor || undefined} />
        case 'ProfileTab':
          return <Entypo name="user" size={26} color={tintColor || undefined} />
        default: return null
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
      backgroundColor: Colors.primaryLight
    },
    activeTintColor: Colors.secondary,
    inactiveTintColor: Colors.primaryLighter,
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
    headerTintColor: THEME_FONT_COLOR,
    headerTitleStyle : {
      fontWeight: undefined,
      fontFamily: Fonts.robotoRegular
    }
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

const RegisterLoadingSwitchNavigator = createSwitchNavigator({
  LoginScreen: SignInStackNavigator,
  RegisterEndScreen: {
    screen: RegisterEndScreen,
    navigationOptions: {
      header: null
    }
  }
})

const HomeStackNavigator = createStackNavigator({
  HomeScreen: {
    screen: AppTabNavigator,
    navigationOptions: {
      header: null
    }
  },
  AddProgressScreen: { 
    screen: AddProgressScreen 
  },
  AddProgress: {
    screen: AddProgress
  },
  AddTrainingScreen: {
    screen: AddTrainingScreen
  },
  EditProfileScreen: {
    screen: EditProfileScreen,
    navigationOptions: {
      title: 'Edytuj Profil'
    }
  },
  VideoRelations: { 
    screen: StoryScreen,
    navigationOptions: { header: null }
  },
  CommentsScreen: {
    screen: CommentsScreen,
    navigationOptions: {
      title: 'Komentarze'
    }
  },
  NewPostScreen: {
    screen: NewPostScreen,
    navigationOptions: {
      title: 'Nowy post'
    }
  },
  ChatsScreen: { 
    screen: ChatsScreen,
    navigationOptions: {
      title: 'Czaty'
    }
  },
  SearchChatsScreen: {
    screen: SearchChatsScreen,
    navigationOptions: {
      header: null
    }
  },
  ConversationScreen: {
    screen: ConversationScreen,
    navigationOptions: {
      header: null
    }
  }
},{
  defaultNavigationOptions: () => ({
    headerStyle: {
      backgroundColor: Colors.primaryDark,
    },
    headerTintColor: Colors.secondary, 
    headerTitleStyle : {
      fontWeight: undefined,
      fontFamily: Fonts.robotoRegular,
      marginLeft: -10
    }
  })
})

const AppNavigator = createAppContainer(createSwitchNavigator(
  {
    LoginScreen: RegisterLoadingSwitchNavigator,
    HomeScreen: HomeStackNavigator
  }
));

export default AppNavigator
