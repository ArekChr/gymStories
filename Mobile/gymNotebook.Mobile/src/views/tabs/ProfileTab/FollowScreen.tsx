import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../../store';
import { NavigationScreenProps, NavigationScreenProp } from 'react-navigation';
import { Profile } from '../../../store/profile/types';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<FollowScreen>
}

class FollowScreen extends Component<Props> {

  state = {
    profile: {} as Profile
  }

  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    let profile: Profile = navigation.getParam('profile')
    return {
      title: profile.nickname != null ? profile.nickname : profile.firstName,
    }
  }

  componentDidMount() {
    let profile: Profile = this.props.navigation.getParam('profile')
    this.setState({profile})
  }

  render() {
    return (
    <View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around',}}>
        <Text>Obserwowani</Text>
        <Text>Obserwujący</Text>
      </View>
    </View>);
  }
}

const mapStateToProps = (state: AppState) => ({

})

const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(FollowScreen)
