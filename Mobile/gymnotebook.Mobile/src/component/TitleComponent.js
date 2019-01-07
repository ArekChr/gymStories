import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FONT_COLOR } from '../styles/common';

class TitleComponent extends Component {

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
    fontWeight: 'bold',
    fontSize: 18,
    color: FONT_COLOR,
    textAlignVertical: 'center',
    marginTop: 50,
    marginBottom: 15
  }
});

export default TitleComponent;
