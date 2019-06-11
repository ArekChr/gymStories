import * as React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Dimensions, ScaledSize, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { AppState } from '../../redux'
import { Dispatch } from 'redux'
import { NavigationScreenProps, NavigationScreenProp } from 'react-navigation'
import { Fonts } from '../../styles'
import { PickedImage } from '../../types/General'
import PostImage from 'react-native-scalable-image'
import { CreatePostModel } from '../../redux/post/types'
import { createPost } from '../../redux/post/actions'

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<NewPostScreen>
}

class NewPostScreen extends React.Component<Props> {
  state = {
    pickedImage: {} as PickedImage,
    window: {} as ScaledSize,
    description: '',
  }

  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam('onSharePost')}>
          <Text
            style={{
              fontWeight: undefined,
              fontFamily: Fonts.robotoMedium,
              fontSize: 17,
              padding: 10,
              color: '#0336FF',
            }}
          >
            Udostępnij
          </Text>
        </TouchableOpacity>
      ),
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSharePost: this._onSharePost })
    const { navigation } = this.props
    const pickedImage: PickedImage = navigation.getParam('pickedImage')
    this.setState({ pickedImage: pickedImage, window: Dimensions.get('window') })
  }

  setDescription = (text: string) => {
    this.setState({ description: text })
  }

  _onSharePost = () => {
    const {
      description,
      pickedImage: { path },
    } = this.state
    const { myProfile } = this.props
    const post: CreatePostModel = {
      description: description,
      filePath: path,
      profileId: myProfile.id,
      timeStamp: new Date().getTime(),
      likesCount: 0,
      likes: [],
    }
    this.props.createPost(post)
    this.props.navigation.popToTop()
  }

  render() {
    const { window } = this.state
    const margin = 20
    return (
      <View>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <PostImage
            style={{ margin: margin, marginBottom: 0 }}
            width={window.width - 2 * margin}
            source={{ uri: this.state.pickedImage.path }}
          />
          <TextInput
            onChangeText={text => this.setDescription(text)}
            style={{ marginLeft: margin, marginRight: margin }}
            placeholder='Dodaj podpis...'
          />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    myProfile: state.Profile.myProfile,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createPost: (post: CreatePostModel, cb?: () => void) => createPost(post, cb)(dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostScreen)
