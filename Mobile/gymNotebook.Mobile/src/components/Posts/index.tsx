import * as React from 'react';
import { FlatList, ListRenderItemInfo, Dimensions, View, TouchableWithoutFeedback } from 'react-native'
import { Post } from '../../redux/post/types';
import FastImage from 'react-native-fast-image'

interface Props {
  posts: Post[] | null
  postClick: (post: ReactPost) => void
}

export interface ReactPost extends Post {
  key: string
  empty: true
}

const numberColumns = 3

const formatData = (data: ReactPost[], numberColumns: number) => {
  const numberOfFullRows = Math.floor(data.length / numberColumns)

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numberColumns)

  while (numberOfElementsLastRow !== numberColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true } as ReactPost)
    numberOfElementsLastRow = numberOfElementsLastRow + 1
  }

  return data
}

export default class Posts extends React.Component<Props> {

  componentDidMount() {
    if(this.props.posts) {
      this.setState({ posts: this.props.posts})
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if(nextProps.posts) {
      this.setState({ posts: nextProps.posts})
    }
  }

  keyExtractor = (item: Post, index: number) => item.id;

  renderPost = ({item} : ListRenderItemInfo<ReactPost>) => {
    const margin = 1
    const length = Dimensions.get('window').width / numberColumns - margin * 2
  
    if(!item.empty) {
      return (
        <TouchableWithoutFeedback onPress={() => this.props.postClick(item)}>
          <View key={item.id} style={{display: 'flex', marginBottom: margin * 2}}>
            <FastImage style={{width: length, height: length}} source={{uri: item.imageURL}}></FastImage>
          </View>
        </TouchableWithoutFeedback>
      )
    }
    return (
      <View key={item.id} style={{display: 'flex', marginBottom: margin * 2, width: length, height: length, bacgroundColor: 'transparent'}}/>
    )
  }
  
  render() {
    const { posts } = this.props
    if(posts){
      return (
        <FlatList<ReactPost>
          data={formatData(posts as ReactPost[], numberColumns)}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          numColumns={numberColumns}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderPost} />
      )
    } else {
      return null
    }
  }
}

