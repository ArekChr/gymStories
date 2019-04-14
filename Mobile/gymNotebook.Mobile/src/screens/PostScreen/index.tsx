import React, { Component } from 'react'
import { View, Text, Dimensions, ScaledSize, ScrollView, TouchableOpacity, Image, StyleSheet, Animated  } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../redux';
import { NavigationScreenProp, NavigationScreenProps } from 'react-navigation';
import PostImage from 'react-native-scalable-image';
import { ReactPost } from '../../components/Posts';
import { Profile } from '../../redux/profile/types';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import UserName from '../../components/UserName';
import { SquarePhoto } from '../../components';
import Spinner from '../../components/Spinner';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DoubleTap from '../../components/DoubleTap';
import { likePost, unlikePost, fetchCommentsWithProfilesPromise } from '../../redux/post/actions';
import PastDateTime from '../../components/PastDateTime';
import FastImage, { OnLoadEvent } from 'react-native-fast-image';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<PostScreen>
}

interface State {
  window: ScaledSize,
  post: ReactPost,
  profile: Profile,
  loading: boolean,
  loadingImage: boolean,
  liked: boolean,
  height: number,
  width: number,
  updateParentPost: (post: ReactPost) => void | null
}

class PostScreen extends Component<Props, State> {

  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      title: 'Zdjęcie'
    }
  }

  animatedValue = new Animated.Value(0);

  state = {
    height: 0,
    width: 0,
    window: {} as ScaledSize,
    post: {} as ReactPost,
    profile: {} as Profile,
    loading: true,
    loadingImage: true,
    liked: false,
    updateParentPost: (post: ReactPost) => null
  }

  componentDidMount() {
    const post: ReactPost = this.props.navigation.getParam('post')
    const updatePost: (post: ReactPost) => void = this.props.navigation.getParam('updatePost')
    const myId = post.likes.find(x => x === this.props.myId)
    this.setState({
      post: post, 
      profile: this.props.navigation.getParam('profile'), 
      window: Dimensions.get("window"),
      loading: false,
      liked: myId ? true : false,
      updateParentPost: updatePost? updatePost : () => null
    })
  }



  onCommentClick = () => {
    this.props.navigation.navigate('CommentsScreen', {
      profile: this.state.profile, 
      post: this.state.post
    })
  }

  like = () => {
    const { profile, post, updateParentPost } = this.state
    const { likePost, myId } = this.props
    likePost(myId, profile.id, post.id)
    const newPost = {
      ...post, 
      likesCount: post.likes.length +1, 
      likes: [...post.likes, myId] 
    }
    this.setState({ post: newPost })
    updateParentPost(newPost)
  }

  unlike = () => {
    const { profile, post, updateParentPost } = this.state
    const { unlikePost, myId } = this.props
    unlikePost(myId, profile.id, post.id)
    const newPost = {
      ...post, 
      likesCount: post.likes.length -1, 
      likes: [...post.likes.filter(x => x !== myId)] 
    }
    this.setState({ post: newPost })
    updateParentPost(newPost)
  }

  toggleLikeIcon = () => {
    this.state.liked ? this.unlike() : this.like()
    this.setState({liked: !this.state.liked})
  }

  toggleLike = () => {
    this.state.liked ? this.unlike() : this.like()
    this.setState((state) => {
      const newLiked = !state.liked;

      if (newLiked) {
        Animated.sequence([
          Animated.spring(this.animatedValue, { toValue: 1 }),
          Animated.spring(this.animatedValue, { toValue: 0 }),
        ]).start();
      }

      return { liked: newLiked };
    });
  }

  renderOverlay() {
    const imageStyles = [
      styles.overlayHeart,
      {
        opacity: this.animatedValue,
        transform: [
          {
            scale: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.7, 1.5],
            }),
          },
        ],
      },
    ];

    return (
      <View style={styles.overlay}>
        <Animated.Image
          source={require('../../images/heart.png')}
          style={imageStyles}
        />
      </View>
    );
  }

  renderDescription(text: string){
    return text.split(' ').map((text, i) => {
      if(text.charAt(0) === '#') {
        return <Text key={i} style={{ color: '#4682B4'}}>{text} </Text>
      } else {
        return <Text key={i} style={{color: '#444'}}>{text} </Text>
      }
    })
  }

  renderLikes(likesCount: number) {
    if (likesCount === 0) {
      return null
    }
    else if (likesCount === 1) {
      return <Text>{`${likesCount} poubienie`}</Text>
    }
    else if (likesCount > 1) {
      return <Text>{`${likesCount} polubień`}</Text>
    }
  }

  onLoad = (e: OnLoadEvent) => {
    const {
      nativeEvent: { width, height },
    } = e
    this.setState({ width, height })
  }

  getHeight = () => {
    if (!this.state.height) return 360
    const ratio = this.state.height / this.state.width
    const height = this.state.window.width * ratio
    return height
  }

  render() {
    const { window, profile, post, loading, loadingImage } = this.state
    if (loading) {
      return <Spinner/>
    }
    const height = this.getHeight()
    return (
      <View >
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <SquarePhoto size="small" source={profile.imageURL} style={{margin: 10}} /> 
              <UserName firstName={profile.firstName} lastName={profile.lastName} style={{color: '#333'}} />
            </View>
            <View >
              <TouchableOpacity>
                <SimpleLineIcons name="options-vertical" size={15} style={{marginRight: 8}} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
          <DoubleTap onDoubleTap={this.toggleLike}>
            <View>
              {/* <PostImage width={window.width} source={{uri: post.imageURL}}/> */}
              <FastImage onLoad={e => this.onLoad(e)} style={{ width: window.width, height }} onLoadEnd={() => this.setState({ loadingImage: false })} source={{uri: post.imageURL}} />
              {this.renderOverlay()}
            </View>
          </DoubleTap>
          <View style={{ padding: 12 }}>
            <View style={{flexDirection: 'row', alignContent: 'center', marginBottom: 5}}>
              <TouchableOpacity onPress={() => this.toggleLikeIcon()} style={[{...styles.icon}]}>
                {this.state.liked? <FontAwesome name="heart" size={26} color="rgb(178,0,0)" /> : <FontAwesome name="heart-o" size={26} color="black" />}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onCommentClick()} style={{...styles.icon}} >
                <FontAwesome name="comment-o" size={27} color="black" style={{marginTop: -3}}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon}>
                <FontAwesome name="send-o" size={25} color="black" />
              </TouchableOpacity>
            </View>
            {this.renderLikes(post.likesCount)}
            <View>
              <Text>
                <Text style={{fontWeight: 'bold'}}>{profile.firstName} </Text> 
                {this.renderDescription(post.description)}
              </Text>
            </View>
            {post.commentCount > 0 ? 
              <TouchableOpacity>
                <Text onPress={() => this.onCommentClick()} style={{marginTop: 3, marginBottom: 2}}>Zobacz wszystkie komentarze: {post.commentCount}</Text>
              </TouchableOpacity> 
              : null
            }
            <PastDateTime timestamp={post.createdAt} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    paddingRight: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  overlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  overlayHeart: {
    width: 43,
    height: 40,
    tintColor: '#fff',
  },
});

const mapStateToProps = (state: AppState) => ({
  myId: state.Profile.myProfile.id
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  likePost: (myId: string, profileId: string, postId: string) => likePost(myId, profileId, postId)(dispatch),
  unlikePost: (myId: string, profileId: string, postId: string) => unlikePost(myId, profileId, postId)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen)
