import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleProp, TextStyle } from 'react-native'

interface Props {
  onPress: Function,
  style: StyleProp<TextStyle>
}

export default class TextButton extends Component<Props, {}> {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress}>
        <Text style={[{}, this.props.style]}>{this.props.children}</Text>
      </TouchableOpacity>
    )
  }
}