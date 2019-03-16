import React, { Component } from 'react'
import { View, ScrollView, TextInput, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { NavigationScreenProp } from 'react-navigation';
import { fetchChats } from '../../redux/chats/action';
import { AppState } from '../../redux';
import { Chat, ChatDto } from '../../redux/chats/types';
import { SquarePhoto } from '../../components';
import { Fonts } from '../../styles';
import UserName from '../../components/UserName';
import PastDateTime from '../../components/PastDateTime';
import Spinner from '../../components/Spinner';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<ChatsScreen>
}

class ChatsScreen extends Component<Props> {
  
  state = {
    loading: true,
    chats: [] as ChatDto[]
  }

  componentDidMount() {
    fetchChats(this.props.myProfile.id).then(response => {
      this.setState({ chats: response, loading: false })
    })
  }

  onProfilePress = (chat: ChatDto) => {
    const { profile, ...rest } = chat
    this.props.navigation.navigate('ConversationScreen', {
      profile: profile,
      isNewChat: false,
      chat: rest
    })
  }

  renderChats() {
    if (this.state.chats.length > 0) {
      return this.state.chats.map(chat => 
        <View style={{ marginBottom: 15 }} key={chat.id}>
          <TouchableWithoutFeedback onPress={() => this.onProfilePress(chat)}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <SquarePhoto size='large' source={chat.profile.imageURL} />
              <View style={{ display: 'flex', justifyContent: 'center', paddingLeft: 8 }}>
                <UserName firstName={chat.profile.firstName} lastName={chat.profile.lastName} style={{ fontSize: 16, fontWeight: undefined, fontFamily: Fonts.robotoMedium }} /> 
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: '#888', fontFamily: Fonts.robotoRegular, fontSize: 13, marginRight: 8 }}>{chat.lastMessageId === this.props.myProfile.id ? "Ty: " : ""}{chat.lastMessage}</Text>
                  <PastDateTime timestamp={chat.updatedAt} style={{ color: '#888', fontWeight: undefined, fontFamily: Fonts.robotoRegular, fontSize: 12, marginTop: 0 }} />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={{ flex: 1, marginLeft: 15, marginRight: 15 }}>
        <View style={{marginTop: 10, marginBottom: 15 }}>
          <TextInput 
            onFocus={() => this.props.navigation.navigate('SearchChatsScreen')} 
            placeholder="Szukaj" 
            clearButtonMode="always" 
            style={{ height: 43, backgroundColor: '#EEE', borderRadius: 50, paddingLeft: 35 }} />
          <FontAwesome name="search" size={16} color="#444" style={{ position: 'absolute', top: 13, left: 12}} />
        </View>
        {
          this.state.loading ? 
          <Spinner /> 
          :
          <ScrollView keyboardShouldPersistTaps="handled">
            {this.renderChats()}
          </ScrollView>
        }        
      </View>
    )
  }
}


const mapStateToProps = (state: AppState) => ({
  myProfile: state.Profile.myProfile
})

const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ChatsScreen)
