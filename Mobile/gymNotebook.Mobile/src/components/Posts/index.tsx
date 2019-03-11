import * as React from 'react';
import { Text, FlatList, ListRenderItemInfo, Dimensions, Image, View, TouchableWithoutFeedback } from 'react-native'
import { Post } from '../../redux/post/types';

interface AppProps {
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

export default class Posts extends React.Component<AppProps> {

  keyExtractor = (item: Post, index: number) => item.id;

  renderPost = ({item} : ListRenderItemInfo<ReactPost>) => {
    const margin = 1
    const length = Dimensions.get('window').width / numberColumns - margin * 2
  
    if(!item.empty) {
      return (
        <TouchableWithoutFeedback onPress={() => this.props.postClick(item)}>
          <View key={item.id} style={{display: 'flex', marginBottom: margin * 2}}>
            <Image style={{width: length, height: length}} source={{uri: item.imageURL}}></Image>
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

