import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { STATUS_BAR_COLOR } from '../../../styles/common'

export default class HomeTab extends Component {

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={STATUS_BAR_COLOR} />
        <Text>HomeTab</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})