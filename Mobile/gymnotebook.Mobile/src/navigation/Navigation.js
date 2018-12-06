import { ACTIVE_ICON, INACTIVE_ICON, COLOR_SECONDARY } from '../styles/common'
import ActiveTab from '../pages/tabNavigator/ActiveTab'
import GymTab from '../pages/tabNavigator/GymTab'
import HomeTab from '../pages/tabNavigator/HomeTab'
import ProfileTab from '../pages/tabNavigator/ProfileTab'
import SearchTab from '../pages/tabNavigator/SearchTab'
import AddTraining from '../pages/AddTraining'
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

const AppNavigator = createAppContainer(Home);

export default AppNavigator