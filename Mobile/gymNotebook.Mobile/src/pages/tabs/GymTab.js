import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { Container, Content, Header, Left, Body, Right, Button } from 'native-base'
import styles from '../../styles/styles'
import { ACTIVE_ICON } from '../../styles/common'

export default class GymTab extends Component {

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="dumbbell" size={29} color={tintColor} />
    )
  }

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <TouchableOpacity>
              <Icon name="camera" size={25} color={ACTIVE_ICON} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={styles.title}>My Trainings</Text>
          </Body>
          <Right>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AddTraining')}>
              <Entypo name="add-to-list" size={30} color={ACTIVE_ICON} />
            </TouchableOpacity>
          </Right>
        </Header>
        <View>
          <View style={{ paddingTop: 7, flex: 1, paddingHorizontal: 10 }}>
          </View>
        </View>
      </Container>
    )
  }
}