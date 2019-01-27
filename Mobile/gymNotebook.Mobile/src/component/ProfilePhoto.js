import React, { Component } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image';
import { API_URL } from '../utils/misc'

export default class ProfilePhoto extends Component {

  renderImage = () => {
    if(this.props.source === null){
      return <Image style={[{ width: 90, height: 90, borderRadius: 45 }, this.props.style]} source={require('../images/default-user.png')} />
    } else {
      return (
        <ImageCacheProvider urlsToPreload={[this.props.source]}>
          <CachedImage style={[{ width: 90, height: 90, borderRadius: 45 }, this.props.style]} source={{uri: this.props.source}}/>
        </ImageCacheProvider>
      )
    }
  }

  render() {
    const source = this.props.source ? {uri: `${API_URL}/Image/${this.props.source}`} : require('../images/default-user.png')
    return (
      <TouchableOpacity onPress={() => this.props.onPress}>
        <Image style={[{ width: 90, height: 90, borderRadius: 45 }, this.props.style]} source={source} />
      </TouchableOpacity>
    )
  }
}
