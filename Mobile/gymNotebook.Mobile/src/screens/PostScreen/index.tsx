import React, { Component } from 'react'
import { View, Text, Dimensions, ScaledSize, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
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
import { Spinner } from '../../components/Spinner';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<PostScreen>
}

interface State {
  window: ScaledSize,
  post: ReactPost | null,
  profile: Profile | null,
  loading: boolean
}

class PostScreen extends Component<Props, State> {

  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      title: 'Zdjęcie'
    }
  }

  state = {
    window: {} as ScaledSize,
    post: null,
    profile: null,
    loading: true
  }

  componentDidMount() {
    this.setState({
      post: this.props.navigation.getParam('post'), 
      profile: this.props.navigation.getParam('profile'), 
      window: Dimensions.get("window"),
      loading: false
    })
  }

  render() {
    const { window, profile, post } = this.state
    if (!profile && !post) {
      return <Spinner/>
    }
    return (
      <View >
        <ScrollView>
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
          <PostImage width={window.width} source={{uri: post.imageURL}}/>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({

})

const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen)
