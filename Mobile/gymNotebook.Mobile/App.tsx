import React from 'react'
import LoginScreen from './src/pages/LoginScreen'
import HomeScreen from './src/pages/HomeScreen'
import { StackNavigator } from 'react-navigation'
import AuthService from './src/services/AuthService'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkingAuth: false
    }
  }

  public componentDidMount() {
    AuthService.getAuthInfo((err, authInfo) => {
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
        <AppNavigator/>
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

const AppNavigator = StackNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  LoginScreen: { screen: LoginScreen }
})
