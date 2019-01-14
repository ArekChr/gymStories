import React, { Component } from 'react'
import { Image, View } from 'react-native'

export class ProfilePhoto extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress}>
        <Image style={[{ width: 90, height: 90, borderRadius: 45 }, this.props.style]} source={this.props.source}/>
      </TouchableOpacity>
    )
  }
}

export default ProfilePhoto
