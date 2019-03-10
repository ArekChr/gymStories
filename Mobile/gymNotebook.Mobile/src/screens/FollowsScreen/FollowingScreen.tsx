import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../redux';
import { NavigationScreenProp, NavigationScreenProps, NavigationActions } from 'react-navigation';
import { Fonts } from '../../styles';
import { Spinner } from '../../components/Spinner';
import { SquarePhoto } from '../../components';
import { Profile } from '../../redux/profile/types';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<FollowingScreen>
  screenProps: {
    profile: Profile
    navigation: any
  }
}

class FollowingScreen extends Component<Props> {

  state = {
    pressStatus: false
  }

  static navigationOptions = ({ navigation, screenProps }: NavigationScreenProps) => {
    
    return {
      tabBarIcon: <Text style={{fontSize: 20, fontFamily: Fonts.robotoBold, fontWeight: undefined}}>{screenProps!.profile.followingCount}</Text>,
      tabBarLabel: "obserwowani"
    }
  }

  onFollowClick = (profileId: string) => {

  }

  onProfileClick = (profile: Profile) => {
    this.props.screenProps.navigation.push('ProfileScreen', {
      profileId: profile.profileId,
      profile: profile
    })
  }

  _onHideUnderlay = () => {
    this.setState({ pressStatus: false });
  }
  _onShowUnderlay = () => {
    this.setState({ pressStatus: true });
  }

  render() {
    if (this.props.loading) {   
      return <Spinner />
    }
    return (
      <View>
        {this.props.followingProfiles.map(profile => {
          return (
            <TouchableHighlight onPress={() => this.onProfileClick(profile)}  onHideUnderlay={() => this._onHideUnderlay()}
            onShowUnderlay={() => this._onShowUnderlay()} activeOpacity={1} style={ this.state.pressStatus ? styles.buttonPress : styles.button} key={profile.profileId} >

              <View style={[{flexDirection: 'row', padding: 10, alignItems: 'center' }, this.state.pressStatus ? styles.buttonPress : styles.button]}>

                <SquarePhoto style={styles.photo} source={profile.imageURL} size='medium' />

                  {profile.nickname && <Text style={styles.usernameText}>{profile.nickname}</Text>}

                  <Text numberOfLines={1} ellipsizeMode="tail" style={styles.usernameText}>{profile.firstName} {profile.lastName}</Text>

                  <TouchableOpacity onPress={() => this.onFollowClick(profile.profileId)} 
                    style={[{ width: 100, alignItems: 'center', borderWidth: 1, marginLeft: 10, borderColor: '#ccc', justifyContent: 'center', height: 25, borderRadius: 5, flex: 2 }, 
                      profile.following? null : { backgroundColor: '#039BE5', borderColor: '#039BE5' }]}>

                    <Text style={[{paddingLeft: 5, paddingRight: 5, fontSize: 13, color: 'black' }, 
                      profile.following? null : {fontWeight: 'bold', color: 'white'} ]} numberOfLines={1} ellipsizeMode="tail">{profile.following? 'Obserwujesz' : 'Obserwuj'}
                    </Text>

                  </TouchableOpacity>
              </View>
            </TouchableHighlight >
          )
        })}
      </View>
      )
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
  followingProfiles: state.Follow.myFollowingProfiles,
  followingIds: state.Follow.myFollowingIds,
  loading: state.Follow.loadingMyFollows
})

const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(FollowingScreen)
