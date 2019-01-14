import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'

export default class TextButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text style={[{}, this.props.style]}>{this.props.children}</Text>
      </TouchableOpacity>
    )
  }
}