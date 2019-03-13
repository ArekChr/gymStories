import React, { Component } from 'react'
import { View, Text, TouchableOpacity, RefreshControl, ScrollView } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { fetchMyProfile } from '../../redux/profile/actions'
import { connect } from 'react-redux';
import { SquarePhoto } from '../../components'
import { Dispatch } from 'redux';
import { AppState } from '../../redux';
import Posts, { ReactPost } from '../../components/Posts';
import { fetchMyPosts } from '../../redux/post/actions';
import { fetchMyFollowers, fetchMyFollowing, fetchFollowingProfiles, fetchFollowersProfiles } from '../../redux/follow/actions';
import { Follow } from '../../redux/follow/types';
import { NavigationScreenProp, NavigationScreenProps } from 'react-navigation';
import UserName from '../../components/UserName';
import { Post } from '../../redux/post/types';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<MyProfileScreen>
}

class MyProfileScreen extends Component<Props> {

  state = {
    refreshing: false,
    myPosts: [] as Post[]
  }

  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      title: "name"
    }
  }

  onEditProfilePress = () => {
    this.props.navigation.navigate('EditProfileScreen')
  }

  onSettingsPress = () => {
    this.props.navigation.navigate('Settings')
  }

  onFollowPress = () => {
    const { myFollowing, myFollowers } = this.props
    this.props.fetchFollowingProfiles(myFollowing)
    this.props.fetchFollowersProfiles(myFollowers, myFollowing)
    this.props.navigation.push('Follow', { profile: this.props.myProfile })
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.props.fetchMyPosts(this.props.myProfile.id, 20, (myPosts) => {
      this.setState({ loading: false, myPosts: myPosts })
    })
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ myPosts: nextProps.myPosts})
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    const { 
      myProfile: { id }, 
      auth: { uid } 
    } = this.props

    Promise.all([
      this.props.fetchMyProfile(uid),
      this.props.fetchMyFollowers(id),
      this.props.fetchMyFollowing(id),
      this.props.fetchMyPosts(id, 20)
    ]).then(() => {
      this.setState({ refreshing: false });
    })
  }

  onPhotoClicked = () => {
    // TODO: modal for edit photo
  }

  onPostClick = (post: ReactPost) => {
    this.props.navigation.push('PostScreen', { 
      post: post,
      profile: this.props.myProfile,
      updatePost: this.updatePost
    })
  }

  updatePost = (post: ReactPost) => {
    let { key, empty, ...reducedPost } = post
    reducedPost = reducedPost as Post
    const newPosts: Post[] = this.state.myPosts.map(oldPost => {
      if(oldPost.id === reducedPost.id) {
        return reducedPost
      } else {
        return oldPost
      }
    })
    this.setState({ myPosts: newPosts })
  }

  render() {

    const { myProfile: myProfile } = this.props;

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
                  <SquarePhoto onPress={this.onPhotoClicked} source={myProfile.imageURL} />
                </View>
                  <View style={{ flex: 3 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }} >0</Text>
                        <Text style={{ fontSize: 11, color: 'grey' }}>Posty</Text>
                      </View>
                        <TouchableOpacity onPress={() => this.onFollowPress()} style={{ alignItems: 'center' }}>
                          <Text style={{ fontSize: 18, fontWeight: 'bold' }} >{myProfile.followersCount}</Text>
                          <Text style={{ fontSize: 11, color: 'grey' }}>Obserwujący</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onFollowPress()} style={{ alignItems: 'center' }}>
                          <Text style={{ fontSize: 18, fontWeight: 'bold' }} >{myProfile.followingCount}</Text>
                          <Text style={{ fontSize: 11, color: 'grey' }}>Obserwuje</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 7 }}>
                      <TouchableOpacity onPress={this.onEditProfilePress}
                        style={{ alignItems: 'center', borderWidth: 1, flex: 3, marginLeft: 10, justifyContent: 'center', height: 30, borderRadius: 5 }}>
                        <Text>Edytuj profil</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.onSettingsPress}
                          style={{ alignItems: 'center', borderWidth: 1, flex: 1, marginLeft: 5, marginRight: 10, justifyContent: 'center', height: 30, borderRadius: 5 }}>
                        <AntDesign size={20} name='setting' color='black' />
                      </TouchableOpacity>
                    </View>
                  </View>
            </View>
            <View style={{ paddingHorizontal: 15, paddingTop: 10 }}>
              <UserName firstName={myProfile.firstName} lastName={myProfile.lastName} />
              <Text>{myProfile.description}</Text>
            </View>
          </View>
          <Posts postClick={this.onPostClick} posts={this.state.myPosts} />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  profileLoading: state.Profile.loading,
  myProfile: state.Profile.myProfile,
  auth: state.Auth.auth,
  myPosts: state.Posts.myPosts,
  myFollowing: state.Follow.myFollowingIds,
  myFollowers: state.Follow.myFollowersIds
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchMyProfile: (uid: string, cb?: () => void) => fetchMyProfile(uid, cb)(dispatch),
  fetchMyPosts: (id: string, quantity: number, cb?: (myPosts: Post[]) => void) => fetchMyPosts(id, quantity, cb)(dispatch),
  fetchMyFollowers: (profileId: string) => fetchMyFollowers(profileId)(dispatch),
  fetchMyFollowing: (profileId: string) => fetchMyFollowing(profileId)(dispatch),
  fetchFollowingProfiles: (following: Follow[]) => fetchFollowingProfiles(following)(dispatch),
  fetchFollowersProfiles: (followers: Follow[], following: Follow[]) => fetchFollowersProfiles(followers, following)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileScreen)