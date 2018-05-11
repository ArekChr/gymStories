import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

export default class SearchTab extends Component {

  public static navigationOptions = {
    tabBarIcon: ({ tintColor }: any) => (
      <FontAwesome name="search" size={24} color={tintColor} />
    )
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text>SearchTab</Text>
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
