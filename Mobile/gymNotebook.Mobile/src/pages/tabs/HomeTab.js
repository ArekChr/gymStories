import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

export default class HomeTab extends Component {

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={25} color={tintColor} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
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