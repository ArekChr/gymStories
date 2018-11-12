import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Initializer } from '../../samples/initializer'
import { Entypo } from '@expo/vector-icons'
import { Container, Content, Header, Left, Body, Right, Button } from 'native-base'
import styles from '../../styles/styles'
import { ACTIVE_ICON } from '../../styles/common'

interface Props{
  navigation: any
}

export default class GymTab extends Component<Props> {

  public static navigationOptions = {
    tabBarIcon: ({ tintColor }: any) => (
      <MaterialCommunityIcons name="dumbbell" size={29} color={tintColor} />
    ),
    header: false
  }
  public data = new Initializer()

  public constructor(props: any){
    super(props)

  }

  public render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left><TouchableOpacity><Entypo name="camera" size={25} color={ACTIVE_ICON} /></TouchableOpacity></Left>
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
            { this.data.trainings.map((t: Training) =>
            <TouchableOpacity key={t.Id} style={styles.trainingButton}>
              <Text style={{ paddingLeft: 10, fontSize: 18, fontWeight: 'bold' }}>{t.Description}</Text>
            </TouchableOpacity>
            )}
          </View>
        </View>
      </Container>
    )
  }
}