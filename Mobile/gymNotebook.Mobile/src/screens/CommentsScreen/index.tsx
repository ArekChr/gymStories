import * as React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { Dispatch } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { Comment, CommentModel, Post } from '../../redux/post/types';
import Spinner from '../../components/Spinner';
import { SquarePhoto } from '../../components';
import { fetchCommentsWithProfilesPromise, createComment } from '../../redux/post/actions';
import PastDateTime from '../../components/PastDateTime';
import { Profile } from '../../redux/profile/types';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<CommentsScreen>
}

class CommentsScreen extends React.PureComponent<Props> {

  state = {
    comment: '',
    canSend: false,
    post: {} as Post,
    profile: {} as Profile,
    comments: [] as CommentModel[],
    loading: true,
    loadingScreen: true,
    sendingComment: false
  }

  componentDidMount(){
    const { navigation } = this.props;
    const post: Post = navigation.getParam('post')
    const profile: Profile = navigation.getParam('profile')
    this.setState({ profile: profile, post: post, loadingScreen: false})
    fetchCommentsWithProfilesPromise(profile.id, post.id).then((response: CommentModel[]) => {
      this.setState({ comments: response, loading: false })
    })
  }

  onChangeComment = (text: string) => {
    this.setState({
      comment: text, 
      canSend: text.length === 0 ? false : true
    })
  }

  onProfileClick = (comment: CommentModel) => {
    const profile = {
      firstName: comment.firstName,
      lastName: comment.lastName,
      nickname: comment.nickname
    } as Profile

    this.props.navigation.navigate('ProfileScreen', {
      profileId: comment.userId,
      profile: profile
    })
  }

  onCommentSend = () => {
    const { myProfile } = this.props
    const { profile, post, comment } = this.state
    this.setState({ sendingComment: true })
    createComment(myProfile.id, profile.id, post.id, comment).then((response) => {
      const newComment: CommentModel = {
        createdAt: new Date().getTime(),
        description: comment,
        firstName: myProfile.firstName,
        lastName: myProfile.lastName,
        id: response.id as string,
        imageURL: myProfile.imageURL,
        likes: [],
        likesCount: 0,
        nickname: myProfile.nickname,
        userId: myProfile.id
      }
      
      this.setState({ comment: '', comments: [...this.state.comments, newComment], sendingComment: false })
    })
  }

  renderDescription(text: string){
    if(text != null) {
      if(text.length > 0){
        return text.split(' ').map((text, i) => {
          if(text.charAt(0) === '#') {
            return <Text key={i} style={{ color: '#4682B4' }}>{text} </Text>
          } else {
            return <Text key={i} style={{ color: '#444' }}>{text} </Text>
          }
        })
      }
    }
  }

  renderPostDetails() {
    const { profile, post } = this.state
    return (
      <View style={{ borderBottomWidth: .5, borderBottomColor: '#ddd' }} >
        <View style={{ display: 'flex', flexDirection: 'row', margin: 10 }}>
          <View style={{ marginRight: 5 }} > 
            <SquarePhoto size="small" source={profile.imageURL} />
          </View>
          <View style={{ flex: 1}}>
            <Text style={{ display: 'flex' }}>
              {this.renderDescription(post.description)}
            </Text>
            <PastDateTime timestamp={post.createdAt} />
          </View>
        </View>
      </View>

    )
  }

  renderComments() {
    const { comments, loading } = this.state
    if (loading) {
      return 
    }
    if(comments.length === 0) {
      return <ScrollView keyboardShouldPersistTaps="handled"></ScrollView>
    }
    return (
      comments.map((comment, i: number) => {
        return (
          <View key={i} style={{  display: 'flex', flexDirection: 'column'}}>
            <View style={{marginLeft: 10, marginRight: 10, marginTop: 8, marginBottom: 8, display: 'flex', flexDirection: 'row'}}>
              <SquarePhoto onPress={() => this.onProfileClick(comment)} size={"small"} source={comment.imageURL}/>
              <View style={{ display: 'flex', flexWrap: 'wrap', flex: 1, marginLeft: 10}}>
                <Text style={{ color: '#444'}} onPress={() => this.onProfileClick(comment)} ><Text style={{fontWeight: 'bold'}}>{comment.firstName} </Text>{comment.description}</Text>
                <PastDateTime timestamp={comment.createdAt} />
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
      <View style={{flex: 1}}>
        <ScrollView keyboardShouldPersistTaps="handled">
          {this.renderPostDetails()}
          {this.renderComments()}
        </ScrollView>
        {this.state.loading && <View style={{flex: 20}}><Spinner/></View>}
        <View style={{ borderTopWidth: .5, borderTopColor: '#ddd' , bottom: 0, width: '100%'}}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 8, marginLeft: 12, marginRight: 12 }}>
            <SquarePhoto source={this.props.myProfile.imageURL} size="small" />
            <TextInput multiline={true} 
              placeholder="Dodaj komentarz..." 
              placeholderTextColor="gray" 
              value={this.state.comment}
              onChangeText={(text) => this.onChangeComment(text)}
              style={{display: 'flex', flex: 1, padding: 0, paddingLeft: 8, color: 'black', marginLeft: 8}} />
            {this.state.sendingComment ? 
              <View style={{marginRight: 10}}><Spinner size={25} /></View>
              :
              <View style={{ display: 'flex', justifyContent: 'center',}}>
                <TouchableOpacity onPress={() => this.onCommentSend()} disabled={!this.state.canSend} >
                  <Text style={{ marginLeft: 5, color: '#1565C0', opacity: this.state.canSend ? 1 : 0.5 }}>Opublikuj</Text>
                </TouchableOpacity>
              </View>
            }
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  myProfile: state.Profile.myProfile
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentsScreen);
