import { ACTIVE_ICON, INACTIVE_ICON, COLOR_SECONDARY } from '../styles/common'
import ActiveTab from '../pages/tabs/ActiveTab'
import GymTab from '../pages/tabs/GymTab'
import HomeTab from '../pages/tabs/HomeTab'
import ProfileTab from '../pages/tabs/ProfileTab'
import SearchTab from '../pages/tabs/SearchTab'
import AddTraining from '../pages/AddTraining'
import LoginScreen from '../pages/LoginScreen'
import RegisterScreen from '../pages/RegisterScreen'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'

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

const AppTabNavigator = createBottomTabNavigator({
    HomeTab: HomeTab,
    SearchTab: SearchTab,
    ActiveTab: ActiveTab,
    GymTab: GymTab,
    ProfileTab: ProfileTab
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions : {
      activeTintColor: ACTIVE_ICON,
      inactiveTintColor: INACTIVE_ICON,
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: COLOR_SECONDARY,
        elevation: 15
      },
      indicatorStyle: {
        opacity: 0
      }
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