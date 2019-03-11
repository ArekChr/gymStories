import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ProfileBasic, Profile } from '../../redux/profile/types';
import { SquarePhoto } from '../../components';
import UserName from '../../components/UserName';
import { Dispatch } from 'redux';
import { follow, unfollow } from '../../redux/follow/actions';
import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { Follow } from '../../redux/follow/types';

export interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  profiles: ProfileBasic[]
  followingIds: Follow[]
  onProfileClick: (profile: ProfileBasic) => void
}

interface State {
  profiles: ProfileBasic[] | null
}

class FollowProfiles extends React.Component<Props, State> {

  state = {
    profiles: null
  }

  componentDidMount() {
    this.setState({profiles: this.sortProfiles(this.setFollowingProp(this.props.profiles, this.props.followingIds))})
  }

  componentWillReceiveProps(nextProps: Props){
    this.setState({profiles: this.sortProfiles(this.setFollowingProp(nextProps.profiles, nextProps.followingIds))})
  }

  setFollowingProp = (profiles: ProfileBasic[], followingIds: Follow[]): ProfileBasic[] => {
    return profiles.map(x => {
      const following = followingIds.find(id => Object.keys(id)[0] === x.profileId) ? true : false
      return {...x, following: following }
    })
  }

  sortProfiles(profiles: ProfileBasic[]) {
    return profiles.sort(function(a: ProfileBasic, b: ProfileBasic){
      if(a.firstName + a.lastName < b.firstName + b.lastName) { return -1; }
      if(a.firstName  + a.lastName > b.firstName + b.lastName) { return 1; }
      return 0;
    })
  }

  onFollowClick = (profileId: string) => {
    this.props.follow(this.props.myId, profileId)
  }

  onUnfollowClick = (profileId: string) => {
    this.props.unfollow(this.props.myId, profileId)
  }

  public render() {
    const { profiles } = this.state
    if (!profiles) {
      return null
    }
    return profiles.map((profile: ProfileBasic) => {
      return (
        <TouchableOpacity onPress={() => this.props.onProfileClick(profile)} key={profile.profileId} >
          <View style={[{flexDirection: 'row', padding: 10, alignItems: 'center' }]}>
            <SquarePhoto style={styles.photo} source={profile.imageURL} size='medium' />
              {profile.nickname && <Text style={styles.usernameText}>{profile.nickname}</Text>}
              <UserName style={styles.usernameText} numberOfLines={1} ellipsizeMode="tail" firstName={profile.firstName} lastName={profile.lastName}/>
              <TouchableOpacity onPress={() => profile.following? this.onUnfollowClick(profile.profileId) : this.onFollowClick(profile.profileId)} 
                style={[{ width: 100, alignItems: 'center', borderWidth: 1, marginLeft: 10, borderColor: '#ccc', justifyContent: 'center', height: 25, borderRadius: 5, flex: 2 }, 
                  profile.following? null : { backgroundColor: '#039BE5', borderColor: '#039BE5' }]}>
                <Text style={[{paddingLeft: 5, paddingRight: 5, fontSize: 13, color: 'black' }, 
                  profile.following? null : {fontWeight: 'bold', color: 'white'} ]} numberOfLines={1} ellipsizeMode="tail">{profile.following? 'Obserwujesz' : 'Obserwuj'}
                </Text>
              </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )
    })
  }
}

const styles = StyleSheet.create({
  usernameText: {
    marginTop: 'auto',
    marginBottom: 'auto',
    flex: 3,
    color: 'gray'
  },
  photo: { 
    marginRight: 10,
    paddingBottom: 5,
  },
  buttonPress: {
    backgroundColor: '#DDD'
  },
  button: {
    backgroundColor: 'white'
  }
});

const mapStateToProps = (state: AppState) => ({
  myId: state.Profile.myProfile.id
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  follow: (myId: string, profileId: string) => follow(myId, profileId)(dispatch),
  unfollow: (myId: string, profileId: string) => unfollow(myId, profileId)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(FollowProfiles);
