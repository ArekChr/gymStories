import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default class GymTab extends Component {

  public static navigationOptions = {
    tabBarIcon: ({ tintColor }: any) => (
      <MaterialCommunityIcons name="dumbbell" size={29} color={tintColor} />
    )
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text>GymTab</Text>
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