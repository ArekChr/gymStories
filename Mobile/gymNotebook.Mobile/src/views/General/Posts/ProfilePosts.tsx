import * as React from 'react';
import { Text, FlatList, ListRenderItemInfo, Dimensions, Image, View } from 'react-native'
import { Post } from '../../../store/post/types';

interface AppProps {
  posts: Post[]
}

interface ReactPost extends Post {
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

const keyExtractor = (item: Post, index: number) => item.id;

const renderPost = ({item} : ListRenderItemInfo<ReactPost>) => {
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

const ProfilePosts: React.SFC<AppProps> = (props) => {
  const { posts } = props
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
      keyExtractor={keyExtractor}
      renderItem={renderPost} />
  )
};

export default ProfilePosts