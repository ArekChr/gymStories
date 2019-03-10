import * as React from 'react';
import { View, StyleSheet, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Profile } from '../../redux/profile/types';
import { SquarePhoto } from '../../components';
import UserName from '../../components/UserName';

export interface Props {
  profiles: Profile[],
  onProfileClick: (profile: Profile) => void
}

export default class FollowProfiles extends React.Component<Props> {

  onFollowClick = (profileId: string) => {

  }

  public render() {
    return this.props.profiles.map(profile => {
      return (
        <TouchableOpacity onPress={() => this.props.onProfileClick(profile)} key={profile.profileId} >

          <View style={[{flexDirection: 'row', padding: 10, alignItems: 'center' }]}>

            <SquarePhoto style={styles.photo} source={profile.imageURL} size='medium' />

              {profile.nickname && <Text style={styles.usernameText}>{profile.nickname}</Text>}
              
              <UserName style={styles.usernameText} numberOfLines={1} ellipsizeMode="tail" firstName={profile.firstName} lastName={profile.lastName}/>

              <TouchableOpacity onPress={() => this.onFollowClick(profile.profileId)} 
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
