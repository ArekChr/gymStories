import React, { Component } from 'react'
import { Image, TouchableOpacity, StyleProp, ImageStyle, StyleSheet, TouchableWithoutFeedback } from 'react-native'

interface Props {
  source: string | null
  onPress?: () => void
  style?: StyleProp<ImageStyle>
  size?: 'small' | 'medium' | 'large'
}

export default class SquarePhoto extends Component<Props, {}>{

  render() {
    const source = this.props.source ? { uri: this.props.source } : require('../../images/default-user.png')
    const size = this.props.size? this.props.size : 'large' 

    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress ? this.props.onPress() : null}>
        <Image style={[styles.imageStyle, styles[size], this.props.style]} source={source} />
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    borderRadius: 45
  },
  small: {
    width: 30, 
    height: 30
  },
  medium: {
    width: 50,
    height: 50
  },
  large: {
    width: 90, 
    height: 90
  }
});