import React from 'react'
import LoginScreen from './src/pages/LoginScreen'
import { StackNavigator, TabNavigator } from 'react-navigation'
import AuthService from './src/services/AuthService'
import ActiveTab from './src/pages/tabNavigator/ActiveTab'
import GymTab from './src/pages/tabNavigator/GymTab'
import HomeTab from './src/pages/tabNavigator/HomeTab'
import ProfileTab from './src/pages/tabNavigator/ProfileTab'
import SearchTab from './src/pages/tabNavigator/SearchTab'
import AddTraining from './src/pages/AddTraining'
import store from './src/configureStore'
import { Provider, connect } from 'react-redux'
import { ACTIVE_ICON, INACTIVE_ICON, COLOR_SECONDARY } from './src/styles/common'

export default class App extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = {
      checkingAuth: false
    }
  }

  public componentDidMount() {
    AuthService.getAuthInfo((err: any, authInfo: any) => {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo !== null
      })
    })
  }

  public render() {
    // if(this.state.checkingAuth){
    //   return (
    //     <View style={style.container}>
    //     <ActivityIndicator
    //     animating={true}
    //     size="large"
    //     style={styles.loader}
    //     />
    //     </View>
    //   );
    // }
    return (
        // <View style={styles.container}>
        //   <StatusBar backgroundColor="#1c313a" barStyle="light-content" />
        //   <Login onLogin={this.onLogin}/>
        // </View>
        <Provider store={store}><AppNavigator/></Provider>
        
    )
  }
  public onLogin = () => {
    console.log('App Component invoked')
  }
  public getInitialState = () => {
    return {
      checkingAuth: true,
      isLoggedIn: false
    }
  }
}

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

const AppNavigator = StackNavigator({
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