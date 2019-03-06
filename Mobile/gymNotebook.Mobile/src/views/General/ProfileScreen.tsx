import * as React from 'react';
import { View, Text, ScrollView, RefreshControl, Image, FlatList, ListRenderItem, ListRenderItemInfo, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { Dispatch } from 'redux';
import { fetchProfile } from '../../store/profile/actions';
import { NavigationScreenProps, NavigationScreenProp } from 'react-navigation';
import { Profile } from '../../store/profile/types';
import { ProfilePhoto } from '../../component';
import { fetchPosts } from '../../store/post/actions';
import { Post } from '../../store/post/types';
import { follow, unfollow, fetchMyFollowing, fetchMyFollowers, fetchFollowingProfiles } from '../../store/follow/actions';
import { Follow } from '../../store/follow/types';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<ProfileScreen>
}

interface State {
  profile: Profile
  refreshing: boolean
  loading: boolean
  following: boolean
}

interface ReactPost extends Post {
  key: string
  empty: true
}

const formatData = (data: ReactPost[], numberColumns: number) => {
  const numberOfFullRows = Math.floor(data.length / numberColumns)

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numberColumns)

  while (numberOfElementsLastRow !== numberColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true } as ReactPost)
    numberOfElementsLastRow = numberOfElementsLastRow + 1
  }

  return data
}

const numberColumns = 3

class ProfileScreen extends React.Component<Props, State> {

  state: State = {
    profile: {} as Profile,
    refreshing: false,
    loading: false,
    following: false
  }

  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    let profile: Profile = navigation.getParam('profile')
    return {
      title: profile.nickname != null ? profile.nickname : profile.firstName
    }
  }

  componentDidMount() {
    let profile: Profile = this.props.navigation.getParam('profile')
    const follow = this.props.myFollowing.find(x => x[profile.id] === true)
    this.setState({ profile: profile, loading: true, following: follow? true : false })
    this.props.fetchPosts(profile.id, 20, () => {
      this.setState({ loading: false})
    })
  }

  componentWillReceiveProps(nextProps: Props){
    let newProfile = nextProps.profiles.find(x => x.id === this.state.profile.id)
    if(newProfile !== undefined) {
      this.setState({ profile: newProfile})
    }
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    const { id } = this.state.profile
    this.props.fetchProfile(id, () => {
      this.props.fetchPosts(id, 20, () => {
        this.setState({ refreshing: false });
      })
    })
  }

  onFollowClick = () => {
    if(this.state.following) {
      this.props.unfollow(this.props.myId, this.state.profile.id)
      this.setState({following: false})
    } else {
      this.props.follow(this.props.myId, this.state.profile.id)
      this.setState({following: true})
    }
  }

  keyExtractor = (item: Post, index: number) => item.id;

  renderPost = ({item} : ListRenderItemInfo<ReactPost>) => {
    const margin = 1
    const length = Dimensions.get('window').width / numberColumns - margin * 2

    if(!item.empty) {
      return (
        <View key={item.id} style={{display: 'flex', marginBottom: margin * 2}}>
          <Image style={{width: length, height: length}} source={{uri: item.imageURL}}></Image>
        </View>
      )
    }
    return (
      <View key={item.id} style={{display: 'flex', marginBottom: margin * 2, width: length, height: length, bacgroundColor: 'transparent'}}/>
    )
  }

  renderPosts() {
    const { profile: { posts } } = this.state
    if(!posts){
      return (
        <Text>Brak</Text>
      )
    }
    return (
      <FlatList<ReactPost>
        data={formatData(posts as ReactPost[], numberColumns)}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        numColumns={numberColumns}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderPost} />
    )
  }

  render() {
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
                  <ProfilePhoto source={profile.imageURL} />
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
              <Text style={{ fontWeight: 'bold' }}>{`${profile.firstName} ${profile.lastName}`}</Text>
              <Text>{profile.description}</Text>
            </View>
              {this.renderPosts()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  profiles: state.Profile.profiles,
  myFollowing: state.Follow.myFollowingIds,
  myId: state.Profile.myProfile.id
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProfile: (id: string, cb?: () => void) => fetchProfile(id, cb)(dispatch),
  fetchPosts: (id: string, quantity: number, cb?: () => void) => fetchPosts(id, quantity, cb)(dispatch),
  follow: (myId: string, profileId: string) => follow(myId, profileId)(dispatch),
  unfollow: (myId: string, profileId: string) => unfollow(myId, profileId)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
