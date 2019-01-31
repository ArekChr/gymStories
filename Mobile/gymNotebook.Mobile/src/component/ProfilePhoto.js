import React, { Component } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { API_URL } from '../utils/misc'

export default class ProfilePhoto extends Component {
  render() {
    const source = this.props.source ? {uri: `${API_URL}/Image/${this.props.source}`} : require('../images/default-user.png')
    return (
      <TouchableOpacity onPress={() => this.props.onPress}>
        <Image style={[{ width: 90, height: 90, borderRadius: 45 }, this.props.style]} source={source} />
      </TouchableOpacity>
    )
  }
}
