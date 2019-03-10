import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WARNING_COLOR } from '../../styles/common'
import { Fonts } from '../../styles'

export default class ErrorMessage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.children}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontFamily: Fonts.robotoLight,
    color: WARNING_COLOR,
    textAlignVertical: 'center',
    marginBottom: 15
  }
});