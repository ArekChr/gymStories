import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'

export default class HomeTab extends Component {

  public static navigationOptions = {
    tabBarIcon: ({ tintColor }: any) => (
        <Entypo name="home" size={25} color={tintColor} />
    )
  }

  public render() {
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