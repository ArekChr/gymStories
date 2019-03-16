import React, { Component } from 'react'
import { Image, StyleProp, ImageStyle, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import FastImage from 'react-native-fast-image';

interface Props {
  source: string | null
  onPress?: () => void
  style?: StyleProp<ImageStyle>
  size?: 'small'| 'xmedium' | 'medium' | 'large' | 'xlarge'
}

export default class SquarePhoto extends Component<Props>{

  render() {
    const source = this.props.source ? { uri: this.props.source } : require('../../images/default-user.png')
    const size = this.props.size? this.props.size : 'large' 

    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress ? this.props.onPress() : null}>
        <FastImage style={[{borderRadius: 45}, styles[size], this.props.style]} source={source} />
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    borderRadius: 45
  },
  small: {
    width: 35, 
    height: 35
  },
  xmedium: {
    width: 40, 
    height: 40
  },
  medium: {
    width: 50,
    height: 50
  },
  large: {
    width: 55, 
    height: 55
  },
  xlarge: {
    width: 90, 
    height: 90
  }
});