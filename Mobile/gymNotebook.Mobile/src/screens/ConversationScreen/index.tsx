import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Animated, Easing, TouchableWithoutFeedback, Keyboard, EmitterSubscription } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { NavigationScreenProp } from 'react-navigation';
import { AppState } from '../../redux'
import { Profile } from '../../redux/profile/types'
import Spinner from '../../components/Spinner'
import { SquarePhoto } from '../../components'
import Feather from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient';
import { Fonts } from '../../styles';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<ConversationScreen>
}

class ConversationScreen extends Component<Props> {

  state = {
    isNewChat: true,
    profile: {} as Profile,
    loading: true,
    message: '',
    focused: false,
    widthAnim: new Animated.Value(0)
  }

  keyboardDidHideListener: EmitterSubscription = {} as EmitterSubscription
  keyboardDidShowListener: EmitterSubscription = {} as EmitterSubscription

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );

    const { navigation } = this.props;
    const isNewChat: boolean = navigation.getParam('isNewChat')
    const profile: Profile = navigation.getParam('profile')
    this.setState({ isNewChat, profile, loading: false })
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidHide = () => {
    // if(this.onBlur instanceof Function ) {
      this.onBlur()
    // }
  }

  _keyboardDidShow = () => {
    this.onFocus()
  }

  onFocus = () => {
    this.setState({ focused: true})
    Animated.sequence([
      Animated.timing(this.state.widthAnim, {
        toValue:1,
        duration:100,
        easing:Easing.linear
      }),
    ]).start()
  }

  onBlur = () => {
    this.setState({ focused: false})
    Animated.sequence([
      Animated.timing(this.state.widthAnim, {
        toValue:0,
        duration:100,
        easing:Easing.linear
      }),
    ]).start()
  }

  onChangeText = (text: string) => {
    if(this.state.focused) {
      this.setState({ message: text })
    } else {
      this.onFocus()
      this.setState({ message: text })
    }
  }

  render() {
    if (this.state.loading) {
      return <Spinner />
    }
    const { profile } = this.state
    return (
      <View style={{ flex: 1 }} >
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',}}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity style={{margin: 10}} onPress={() => this.props.navigation.pop()}>
              <Feather name="arrow-left" size={32} color="#0084ff" />
            </TouchableOpacity>  
            <SquarePhoto size='xmedium' source={profile.imageURL} />
            <Text style={{ color: 'black', fontSize: 17, fontFamily: Fonts.robotoRegular, marginLeft: 5 }}>{profile.firstName.charAt(0).toUpperCase() + profile.firstName.slice(1)}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 5}}>
            <Ionicons style={[styles.icon]} name="ios-call" size={25} color="#0084ff" />
            <FontAwesome style={[styles.icon]} name="video-camera" size={22} color="#0084ff" />
            <Feather style={[styles.icon]} name="info" size={22} color="#0084ff" />
          </View>
        </View>
        <LinearGradient colors={['#DDD', '#FFF']} style={{ display: 'flex', width: '100%', height: 3 }}/>
        <ScrollView keyboardShouldPersistTaps="handled">

        </ScrollView>
        <View style={{ height: 45, display: 'flex', bottom: 0, flexDirection: 'row', alignItems: 'center' }}>
          {
            this.state.focused ? 
            <TouchableWithoutFeedback onPress={() => this.onBlur()}>
              <Ionicons name='ios-arrow-forward' size={27} style={[styles.icon, { marginLeft: 20 }]} />
            </TouchableWithoutFeedback>
            :
            <MaterialIcons style={[styles.icon]} name="photo-camera" size={27} />
          }
          <MaterialIcons style={[styles.icon]} name="insert-photo" size={27} />
          <FontAwesome style={[styles.icon]} name="microphone" size={24} />
          <Animated.View 
            style={{
              alignSelf: 'flex-end', alignItems: 'flex-end',
              width: this.state.widthAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['70%', '87%']
              }),

              right: 0, position: 'absolute', flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={{ position: 'absolute', zIndex: 10, right: 8, bottom: 13 }}>
                <FontAwesome5 name='smile' size={20} color='#0084ff' />
              </TouchableOpacity>
              <TextInput 
                onChangeText={(text) => this.onChangeText(text)} 
                placeholder={this.state.focused? 'Napisz wiadomość...' : 'Aa'} 
                value={this.state.message}
                multiline={this.state.focused? true : false}
                onFocus={() => this.onFocus()}
                onBlur={() => this.onBlur()}
                style={{ backgroundColor: '#EEE', fontSize: 16, 
                  minHeight: 20, maxHeight: 122, padding: 0, borderRadius: 20,
                  paddingRight: 32, paddingLeft: 10, paddingTop: 4, paddingBottom: 4, marginBottom: 6
                }} />
            </View>
            {this.state.message === '' ?
              <TouchableOpacity>
                <FontAwesome name="thumbs-up" size={25} style={[styles.icon, { marginRight: 9, marginBottom: 12 }]} />
              </TouchableOpacity>
              :
              <TouchableOpacity>
                <FontAwesome name="send" size={25} style={[styles.icon, { marginRight: 9, marginBottom: 12 }]} />
              </TouchableOpacity>
            }
          </Animated.View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 9,
    marginBottom: 4,
    width: 28,
    color: '#0084ff'
  },
})

const mapStateToProps = (state: AppState) => ({

})

const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ConversationScreen)
