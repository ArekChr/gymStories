import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class GymScreen extends Component {

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="dumbbell" size={29} color={tintColor} />
    )
  }

  render() {
    return (
      <View>
        <Text>Gym Tab</Text>
      </View>
    )
  }
}