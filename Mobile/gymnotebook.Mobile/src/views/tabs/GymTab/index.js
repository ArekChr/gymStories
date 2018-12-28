import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import styles from '../../../styles/styles'
import { ACTIVE_ICON } from '../../../styles/common'

export default class GymTab extends Component {

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