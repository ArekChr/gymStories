import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Dimensions, ScaledSize, ScrollView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { Dispatch } from 'redux';
import { NavigationScreenProps, NavigationScreenProp } from 'react-navigation';
import { Fonts } from '../../styles';
import { PickedImage } from '../../types/General';
import PostImage from 'react-native-scalable-image';
import { CreatePostModel } from '../../store/post/types';
import { createPost } from '../../store/post/actions';
import LoadingModal from '../../component/LoadingModal';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<CreatePostScreen>
}

class CreatePostScreen extends React.Component<Props> {

  state = {
    pickedImage: {} as PickedImage,
    window: {} as ScaledSize,
    description: ''
  }

  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam('onSharePost')} >
          <Text style={{ fontWeight: undefined, fontFamily: Fonts.robotoMedium, fontSize: 17, padding: 10, color: '#0336FF'}}>Udostępnij</Text>
        </TouchableOpacity>
      )
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSharePost: this._onSharePost})
    const { navigation } = this.props;
    const pickedImage: PickedImage = navigation.getParam('pickedImage');
    this.setState({ pickedImage: pickedImage, window: Dimensions.get("window") })
  }

  setDescription = (text: string) => {
    this.setState({description: text})
  }

  _onSharePost = () => {
    const { description, pickedImage: { path } } = this.state;
    const { profile } = this.props;
    const post: CreatePostModel = {
      description: description,
      filePath: path,
      profilePath: profile.path,
      timeStamp: new Date().getTime(),
      likesCount: 0,
      likes: [],
      firstName: profile.firstName,
      lastName: profile.lastName,
      profileImageURL: profile.imageURL
    }

    this.props.createPost(post, () => {
      this.props.navigation.popToTop()
    })
  }

  render() {
    const { window } = this.state
    const margin = 20;
    return (
      <View >
        <LoadingModal modal={this.props.loading} />
        <ScrollView>
          <PostImage style={{margin: margin, marginBottom: 0}} width={window.width - 2 * margin} source={{uri: this.state.pickedImage.path}}/>
          <TextInput onChangeText={(text) => this.setDescription(text)} style={{marginLeft: margin, marginRight: margin}} placeholder="Dodaj podpis..."></TextInput>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    profile: state.Profile.profile,
    loading: state.Posts.loading
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createPost:(post: CreatePostModel, cb?: () => void) => createPost(post, cb)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostScreen);
