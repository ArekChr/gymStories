import React, { Component } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, Animated, Platform, TextInput } from 'react-native'
import { Container, Content, Header, Left, Body, Right, Button, Input, Item } from 'native-base'
import styles from '../styles/styles'

export default class AddTraining extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ViewArray: [],
      Disable_Button: false
    }
  }

  render() {
    let routines = <View/>
    let exercises = <View/>

    exercises =
      <View>
        <Item>
          <Input
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Exercise Name"
              keyboardType="default"
              selectionColor="#fff"
              multiline={true}
          />
        </Item>
        <Item>
          <Input
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Muscle Part"
              keyboardType="default"
              selectionColor="#fff"
              multiline={true}
          />
        </Item>
      </View>

    routines =
      <View>
          <Item>
            <Input
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Routine Name"
                keyboardType="default"
                selectionColor="#fff"
                multiline={true}
            />
          </Item>
        {exercises}
        <Button bordered={true}>
                <Text>Add Exercise</Text>
        </Button>
      </View>

    return (
      <Container>
        <Header style={styles.header}>
          <Body><Text style={styles.title}>Add Training</Text></Body>
        </Header>
        <Content>
          <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
            <Text style={{ paddingTop: 10 }}>Training Name:</Text>
            <TextInput style={styles.inputBox}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Training name"
                keyboardType="default"
                selectionColor="#fff"
            />
            <Text>Description:</Text>
            <View style={{ flex: 1 }}>
              <Item>
                <Input
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Training description"
                    keyboardType="default"
                    selectionColor="#fff"
                    multiline={true}
                />
              </Item>
              {routines}
              <Button onPress={() => this.onAddRoutine()} bordered={true}>
                <Text>Add Routine</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}
