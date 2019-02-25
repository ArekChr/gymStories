import * as React from 'react';
import { View, Text, ScrollView, RefreshControl, Image, FlatList, ListRenderItem, ListRenderItemInfo, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { Dispatch } from 'redux';
import { fetchProfile } from '../../store/profile/actions';
import { NavigationScreenProps, NavigationScreenProp } from 'react-navigation';
import { Profile } from '../../store/profile/types';
import { ProfilePhoto } from '../../component';
import { fetchPosts as fetchProfilePosts } from '../../store/post/actions';
import profileReducer from '../../store/profile/reducer';
import { Post } from '../../store/post/types';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<ProfileScreen>
}

interface State {
  profile: Profile
  refreshing: boolean
  loading: boolean
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
    loading: false
  }

  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    let profile: Profile = navigation.getParam('profile')
    return {
      title: profile.nickname !== undefined ? profile.nickname : profile.firstName
    }
  }

  componentDidMount() {
    let profile: Profile = this.props.navigation.getParam('profile')
    this.setState({ profile: profile, loading: true })
    this.props.fetchProfilePosts(profile.id, 20, () => {
      this.setState({ loading: false })
    })
  }

  componentWillReceiveProps(nextProps: Props){
    let newProfile = nextProps.profiles.find(x => x.id === this.state.profile.id)
    if(newProfile !== undefined) {
      this.setState({ profile: newProfile})
    }
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    const { id } = this.state.profile
    this.props.fetchProfile(id, () => {
      this.props.fetchProfilePosts(id, 20, () => {
        this.setState({refreshing: false});
      })
    })
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
    const { profile } = this.state;
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
                          <Text style={{ fontSize: 18, fontWeight: 'bold' }} >{profile.followingCount}</Text>
                          <Text style={{ fontSize: 11, color: 'grey' }}>Obserwujący</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ fontSize: 18, fontWeight: 'bold' }} >{profile.followersCount}</Text>
                          <Text style={{ fontSize: 11, color: 'grey' }}>Obserwuje</Text>
                        </View>
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
  profiles: state.Profile.profiles
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProfile: (id: string, cb?: () => void) => fetchProfile(id, cb)(dispatch),
  fetchProfilePosts: (id: string, quantity: number, cb?: () => void) => fetchProfilePosts(id, quantity, cb)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
