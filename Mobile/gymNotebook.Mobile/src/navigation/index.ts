import { ACTIVE_ICON, INACTIVE_ICON, COLOR_SECONDARY } from '../styles/common'
import ActiveTab from '../pages/tabNavigator/ActiveTab'
import GymTab from '../pages/tabNavigator/GymTab'
import HomeTab from '../pages/tabNavigator/HomeTab'
import ProfileTab from '../pages/tabNavigator/ProfileTab'
import SearchTab from '../pages/tabNavigator/SearchTab'
import AddTraining from '../pages/AddTraining'
import LoginScreen from './src/pages/LoginScreen'
import { StackNavigator, TabNavigator } from 'react-navigation'

const GymNavigator = StackNavigator({
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
    screen: GymNavigator
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

export const AppNavigator = StackNavigator({
  LoginScreen: {
    screen: AppTabNavigator,
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