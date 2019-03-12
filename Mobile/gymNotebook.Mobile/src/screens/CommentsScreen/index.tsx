import * as React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { Dispatch } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { createComment, fetchComments, clearComments } from '../../redux/post/actions';
import { Comment } from '../../redux/post/types';
import { Spinner } from '../../components/Spinner';

export interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<CommentScreen>
}

class CommentScreen extends React.PureComponent<Props> {

  state = {
    comment: '',
    canSend: false,
    postId: ''
  }

  componentDidMount(){
    const { navigation } = this.props;
    const postId = navigation.getParam('postId');
    this.setState({postId: postId})
    this.props.fetchComments(postId)
  }

  componentWillUnmount(){
    this.props.clearComments()
  }

  onChangeComment = (text: string) => {
    this.setState({
      comment: text, 
      canSend: text.length === 0 ? false : true
    })
  }

  onCommentSend = () => {
    const comment: Comment = {
      content: this.state.comment,
      createdAt: new Date(),
      id: undefined,
      imageURL: this.props.myProfile.imageURL,
      likes: 0,
      userId: this.props.myProfile.userId,
      userName: this.props.myProfile.firstName + " " + this.props.myProfile.lastName
    }
    this.props.createComment(this.state.postId, comment)
  }

  renderBetweenDate(creationDate: Date, dateNow: Date){
    var time = Math.round((dateNow.getTime() - creationDate.getTime()) / 1000 / 60)
    if(time < 0){
      console.error(`comment date are less than date now: ${time}.`)
    }

    var prefix;
    switch(true){
      case (time > 10080): {
        prefix = "tyg."
        time = Math.round(time / 10080)
        break
      }
      case (time > 1440): {
        prefix = "dni."
        time = Math.round(time / 1440)
        break
      }
      case (time > 60): {
        prefix = "godz."
        time = Math.round(time / 60)
        break
      }
      case (time > 0): {
        prefix = "min."
        break
      }
      case (time === 0):{
        prefix = "teraz."
        break
      }
    }

    return (
      <Text>{`${time === 0 ? '' : time + ' '}${prefix}`}</Text>
    )
  }

  renderComments() {
    const { comments } = this.props
    if(comments === undefined){
      return <Spinner />
    }
    return (
      comments.map((comment: Comment, i: number) => {
        return (
          <View key={i} style={{  display: 'flex', flexDirection: 'column'}}>
            <View style={{marginLeft: 10, marginRight: 10, marginTop: 8, marginBottom: 8, display: 'flex', flexDirection: 'row'}}>
              <Image style={{ width: 32, height: 32, marginRight: 10, borderRadius: 45, borderWidth: 0.5, borderColor: 'gray', marginTop: 'auto', display: 'flex'}} 
                source={comment.imageURL ? {uri: comment.imageURL} : require('../../images/default-user.png')}/>
              <View style={{display: 'flex', flexWrap: 'wrap', flex: 1}}>
                <Text><Text style={{fontWeight: 'bold'}}>{comment.userName} </Text>{comment.content}</Text>
                {this.renderBetweenDate(comment.id == undefined ? comment.createdAt : new Date(comment.createdAt+'Z'), new Date)}
              </View>
              {comment.id === undefined? <Spinner /> : null}
            </View>
          </View>
        )
      })
    )
  }

  render() {
    return (
      <>
      <ScrollView >
        {this.renderComments()}
      </ScrollView>
      <View style={{borderTopColor: 'black', borderTopWidth: 0.5, bottom: 0, width: '100%'}}>
        <View style={{  display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
         margin: 6, marginLeft: 12, marginRight: 12 }}>
          <Image style={{ width: 32, height: 32, borderRadius: 45, borderWidth: 0.5, borderColor: 'gray', marginTop: 'auto', display: 'flex'}} 
          source={this.props.myProfile.imageId ? {uri: `${API_URL}/Image/${this.props.myProfile.imageId}`} : require('../../images/default-user.png')}/>
          <TextInput multiline={true} 
            placeholder="Dodaj komentarz..." 
            placeholderTextColor="gray" 
            onChangeText={(text) => this.onChangeComment(text)}
            style={{display: 'flex', flex: 1, padding: 0, paddingLeft: 8, color: 'black', marginLeft: 8}} />
          <TouchableOpacity onPress={() => this.onCommentSend()} disabled={!this.state.canSend} style={{marginTop: 'auto', marginBottom: 5}}>
            <Text style={{ marginLeft: 5, color: '#1565C0', opacity: this.state.canSend ? 1 : 0.5 }}>Opublikuj</Text>
          </TouchableOpacity>
        </View>
      </View>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    comments: state.Posts.comments,
    myProfile: state.Profile.myProfile
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchComments: (postId: string) => fetchComments(postId)(dispatch),
  createComment: (postId: string, comment: Comment) => createComment(postId, comment)(dispatch),
  clearComments: () => clearComments()(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentScreen);
