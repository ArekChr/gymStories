import * as React from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { Dispatch } from 'redux';
import { NavigationScreenProp } from 'react-navigation';

export interface Props {
  navigation: NavigationScreenProp<CommentScreen>
}

class CommentScreen extends React.Component<Props> {

  state = {
    comment: '',
    canSend: false,
    postId: undefined
  }

  componentDidMount(){
    const { navigation } = this.props;
    const postId = navigation.getParam('postId');
    this.setState({postId: postId})
    //this.props.fetchComments(postId, 20)
  }

  onChangeComment = (text: string) => {
    this.setState({
      comment: text, 
      canSend: text.length === 0 ? false : true
    })
  }

  onCommentSend = () => {
    //this.props.putComment(this.state.postId: string)
  }

  render() {
    return (
      <View style={{borderTopColor: 'black', borderTopWidth: 0.5, position: 'absolute', bottom: 0, width: '100%'}}>
        <View style={{  display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
         margin: 6, marginLeft: 12, marginRight: 12 }}>
          <Image style={{ width: 32, height: 32, borderRadius: 45, borderWidth: 1, borderColor: 'gray', marginTop: 'auto', display: 'flex'}} 
          source={require('../../images/profile3.jpg')}/>
          <TextInput multiline={true} 
            placeholder="Dodaj komentarz..." 
            placeholderTextColor="gray" 
            onChangeText={(text) => this.onChangeComment(text)}
            style={{display: 'flex', flex: 1, padding: 0, paddingLeft: 8, color: 'black', marginLeft: 8}} />
          <TouchableOpacity disabled={!this.state.canSend} style={{marginTop: 'auto', marginBottom: 5}}>
            <Text style={{ marginLeft: 5, color: '#1565C0', opacity: this.state.canSend ? 1 : 0.5 }}>Opublikuj</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentScreen);
