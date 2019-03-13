import * as React from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { Dispatch } from 'redux';
import { fetchProfile } from '../../redux/profile/actions';
import { NavigationScreenProps, NavigationScreenProp } from 'react-navigation';
import { Profile } from '../../redux/profile/types';
import { SquarePhoto } from '../../components';
import { fetchPosts } from '../../redux/post/actions';
import { Post } from '../../redux/post/types';
import { follow, unfollow } from '../../redux/follow/actions';
import Spinner from '../../components/Spinner';
import Posts, { ReactPost } from '../../components/Posts';
import UserName from '../../components/UserName';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<ProfileScreen>
}

interface State {
  profile: Profile
  posts: Post[]
  refreshing: boolean
  loading: boolean
  following: boolean
}

class ProfileScreen extends React.Component<Props, State> {

  state: State = {
    profile: {} as Profile,
    posts: [] as Post[],
    refreshing: false,
    loading: true,
    following: false
  }

  static navigationOptions = (props: NavigationScreenProps) => {
    let profile: Profile = props.navigation.getParam('profile')
    return {
      title: profile.nickname != null ? profile.nickname : profile.firstName
    }
  }

  async componentDidMount() {
    const profileId: string = this.props.navigation.getParam('profileId')
    const follow = this.props.myFollowing.find(x => x[profileId] === true)

    await this.props.fetchProfile(profileId, (profile) => {
      this.setState({profile: profile, following: follow? true : false, loading: false})
    })
    await this.props.fetchPosts(profileId, 20, (posts) => {
      this.setState({posts: posts})
    })
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    const { id } = this.state.profile
    Promise.all([
      this.props.fetchProfile(id, (profile) => {
        this.setState({profile: profile})
      }),
      this.props.fetchPosts(id, 20, (posts) => {
        this.setState({posts: posts})
      })
    ]).then(() => this.setState({ refreshing: false }))
  }

  onFollowClick = () => {
    if(this.state.following) {
      this.props.unfollow(this.props.myId, this.state.profile.id)
      this.setState({following: false, profile: {
        ...this.state.profile,
        followersCount: this.state.profile.followersCount - 1
      }})
    } else {
      this.props.follow(this.props.myId, this.state.profile.id)
      this.setState({following: true, profile: {
        ...this.state.profile,
        followersCount: this.state.profile.followersCount + 1
      }})
    }
  }

  onPostClick = (post: ReactPost) => {
    this.props.navigation.push('PostScreen', { 
      post: post,
      profile: this.state.profile,
      updatePost: this.updatePost
    })
  }

  updatePost = (post: ReactPost) => {
    let { key, empty, ...reducedPost } = post
    reducedPost = reducedPost as Post
    const newPosts: Post[] = this.state.posts.map(oldPost => {
      if(oldPost.id === reducedPost.id) {
        return reducedPost
      } else {
        return oldPost
      }
    })
    this.setState({ posts: newPosts })
  }

  render() {
    if(this.state.loading) {
      return <Spinner/>
    }
    const { profile, following } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView 
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
         style={{height: '100%'}}>
          <View style={{ paddingTop: 15 }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'center', paddingLeft: 15 }}>
                  <SquarePhoto source={profile.imageURL} />
                </View>

                <View style={{ flex: 3 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold' }} >0</Text>
                      <Text style={{ fontSize: 11, color: 'grey' }}>Posty</Text>
                    </View>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }} >{profile.followersCount}</Text>
                        <Text style={{ fontSize: 11, color: 'grey' }}>Obserwujący</Text>
                      </View>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }} >{profile.followingCount}</Text>
                        <Text style={{ fontSize: 11, color: 'grey' }}>Obserwuje</Text>
                      </View>
                  </View>
                  <View style={{ flexDirection: 'row', paddingTop: 7, paddingRight: 15 }}>
                    <TouchableOpacity onPress={() => this.onFollowClick()} 
                      style={[{ alignItems: 'center', borderWidth: 1, flex: 3, marginLeft: 10, justifyContent: 'center', height: 30, borderRadius: 5 }, following? null : { backgroundColor: '#039BE5', borderColor: '#039BE5' }]}>
                      <Text style={[{paddingLeft: 5, paddingRight: 5}, following? null : {fontWeight: 'bold', color: 'white'} ]} numberOfLines={1} ellipsizeMode="tail">{following? 'Obserwujesz' : 'Obserwuj'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', borderWidth: 1, flex: 3, marginLeft: 5, justifyContent: 'center', height: 30, borderRadius: 5 }}>
                      <Text style={{paddingLeft: 5, paddingRight: 5}} numberOfLines={1} ellipsizeMode="tail">Wyślij wiadomość</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </View>
            
            <View style={{ paddingHorizontal: 15, paddingTop: 10 }}>
              <UserName firstName={profile.firstName} lastName={profile.lastName} />
              <Text>{profile.description}</Text>
            </View>
            <Posts postClick={this.onPostClick} posts={this.state.posts} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  myFollowing: state.Follow.myFollowingIds,
  myId: state.Profile.myProfile.id
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProfile: (id: string, cb?: (profile: Profile) => void) => fetchProfile(id, cb)(dispatch),
  fetchPosts: (id: string, quantity: number, cb?: (posts: Post[]) => void) => fetchPosts(id, quantity, cb)(dispatch),
  follow: (myId: string, profileId: string) => follow(myId, profileId)(dispatch),
  unfollow: (myId: string, profileId: string) => unfollow(myId, profileId)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
