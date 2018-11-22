import React from 'react'
import AuthService from './src/services/AuthService'
import store from './src/configureStore'
import { Provider } from 'react-redux'
import {AppNavigator} from './src/navigation'

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
