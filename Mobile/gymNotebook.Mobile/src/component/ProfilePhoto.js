import React, { Component } from 'react'
import { Image, TouchableOpacity } from 'react-native'

export default class ProfilePhoto extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress}>
        <Image style={[{ width: 90, height: 90, borderRadius: 45 }, this.props.style]} source={this.props.source}/>
      </TouchableOpacity>
    )
  }
}
