import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Animated, Easing, TouchableWithoutFeedback, Keyboard, EmitterSubscription, Vibration } from 'react-native'
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
import { createChat, sendMessage } from '../../redux/chats/action'
import { Message, Chat, ChatDto } from '../../redux/chats/types'
import firebase from 'react-native-firebase'

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<ConversationScreen>
}

class ConversationScreen extends Component<Props> {

  state = {
    messages: [] as Message[],
    profile: {} as Profile,
    chat: {} as Chat,
    widthAnim: new Animated.Value(0),
    message: '',
    isNewChat: true,
    loading: true,
    focused: false
  }

  keyboardDidHideListener: EmitterSubscription = {} as EmitterSubscription
  keyboardDidShowListener: EmitterSubscription = {} as EmitterSubscription
  scrollView: ScrollView = {} as ScrollView
  unsubscribe: () => void | null = () => null 

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
    const chat: ChatDto = navigation.getParam('chat')

    this.setState({ isNewChat, profile, loading: false, chat })

    this.unsubscribe = firebase.firestore().collection('chats').doc(chat.id).collection('messages').orderBy('createdAt', 'ASC').onSnapshot(docSnapshot => {
      let newMessages: any[] = []
      docSnapshot.docChanges.forEach(change => {
        if (change.type === 'added') {
          newMessages.push(change.doc.data())
        }
      })
      // Vibration.vibrate(100, false)
      this.setState({ messages: [
        ...this.state.messages,
        ...newMessages
      ]})
    })
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    this.unsubscribe()
  }

  _keyboardDidHide = () => this.onBlur()
  _keyboardDidShow = () => this.onFocus()

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
    this.setState({ message: text })
  }

  sendMessage = (chatId: string, senderId: string, message: string) => {
    const messageObj: Message = {
      content: message,
      createdAt: new Date().getTime(),
      userId: senderId
    }
    sendMessage(chatId as string, messageObj).then(() => {

    })
  }

  sendEmoji = () => {
    const { myId } = this.props
    const { chat } = this.state
    this.sendMessage(chat.id as string, myId, '👍')
    this.onBlur()
  }

  onSendMessageClick = () => {
    const { myId } = this.props
    const { profile, message, chat } = this.state

    if(this.state.isNewChat) {
      createChat(myId, profile.id, message).then((reference) => {
        this.setState({ isNewChat: false, chat: {
          id: reference.id
        }})
        this.sendMessage(reference.id as string, myId, message)
      })
    } else {
      this.sendMessage(chat.id as string, myId, message)
    }
    this.setState({ message: '' })
    this.onBlur()
  }

  isEmoji(str: string) {
    var ranges = [
        '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
        '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
        '\ud83d[\ude80-\udeff]', // U+1F680 to U+1F6FF
        '\u0000[\u0e80-\uffff]'
    ];
    if (str.match(ranges.join('|'))) {
        return true;
    } else {
        return false;
    }
  }

  renderMessages() {
    const { messages } = this.state
    let nextId = ""
    return messages.map((message, i) => {
      const me = this.props.myId === message.userId
      const isPrev = nextId === message.userId
      const isNext = i + 1 >= messages.length ? false : messages[i + 1].userId === message.userId
      nextId = message.userId
      const isEmoji = this.isEmoji(message.content)
      return (
        <View key={message.createdAt} style={{ display: 'flex', alignItems: me? 'flex-end' : 'flex-start'}}>
          <Text style={[{ borderRadius: 19, 
            minHeight: 30, 
            minWidth: isEmoji? 10: 35, 
            maxWidth: '70%', display: 'flex', 
            justifyContent:"center", 
            fontSize: isEmoji? 30 : 16, 
            backgroundColor: isEmoji ? 'transparent' : me? '#0084ff' : '#EFEFEF',
            paddingTop: isEmoji? 0 : 8, 
            paddingBottom: isEmoji? 0 : 8, 
            paddingLeft: isEmoji? 0 : 12, 
            paddingRight: isEmoji? 0 : 12,
            marginRight: 15, 
            marginLeft: 15, 
            marginBottom: 3, 
            borderTopRightRadius: me? isPrev ? 3 : 19 : 19, 
            borderTopLeftRadius: me? 19: isPrev ? 3 : 19,
            borderBottomRightRadius: me? isNext ? 3 : 19 : 19,
            borderBottomLeftRadius: me? 19 : isNext ? 3 : 19,
            alignItems:'center', }, me? styles.myMessage : styles.friendMessage]}>{message.content}</Text>
        </View>
        )
      }
    )
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
        <ScrollView keyboardShouldPersistTaps="handled" 
          ref={(ref: ScrollView) => this.scrollView = ref}
          onContentSizeChange={(width, height) => {
            this.scrollView.scrollToEnd({animated: true})
          }}>
          {this.renderMessages()}
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
                  paddingRight: 32, paddingLeft: 12, paddingTop: 4, paddingBottom: 4, marginBottom: 6
                }} />
            </View>
            {this.state.message === '' ?
              <TouchableOpacity onPress={() => this.sendEmoji()}>
                <FontAwesome name="thumbs-up" size={25} style={[styles.icon, { marginRight: 9, marginBottom: 12 }]} />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => this.onSendMessageClick()}>
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
  myMessage: {
    color: 'white'
  },
  friendMessage: {
    color: 'black'
  }
})

const mapStateToProps = (state: AppState) => ({
  myId: state.Profile.myProfile.id
})

const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ConversationScreen)
