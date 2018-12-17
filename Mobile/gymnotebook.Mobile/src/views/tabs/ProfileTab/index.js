import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Container, Content, Header, Left, Body, Right, Button } from 'native-base'
import styles from '../../../styles/styles'
import Icon from 'react-native-vector-icons/Entypo'
export default class ProfileTab extends Component {

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="user" size={26} color={tintColor} />
    )
  }

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <TouchableOpacity>
              <Image style={{ width: 20, height: 20, marginLeft: 15, marginRight: 15 }}
                  source={require('../../../images/photo-camera.png')}/>
            </TouchableOpacity>
          </Left>
          <Body><Text style={styles.title}>gymNotebook</Text></Body>
          <Right>
            <TouchableOpacity>
              <Image style={{ width: 20, height: 20, marginLeft: 15, marginRight: 15 }}
                  source={require('../../../images/send.png')}/>
            </TouchableOpacity>
          </Right>
        </Header>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ paddingTop: 15 }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'center', paddingLeft: 15 }}>
                  <Image style={{ width: 90, height: 90, borderRadius: 37.5 }} source={require('../../../images/default-user.png')}/>
                </View>
                  <View style={{ flex: 3 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }} >0</Text>
                        <Text style={{ fontSize: 11, color: 'grey' }}>posts</Text>
                      </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ fontSize: 18, fontWeight: 'bold' }} >1 551 425 325</Text>
                          <Text style={{ fontSize: 11, color: 'grey' }}>followers</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ fontSize: 18, fontWeight: 'bold' }} >548</Text>
                          <Text style={{ fontSize: 11, color: 'grey' }}>following</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 7 }}>
                      <Button bordered={true} dark={true}
                        style={{ flex: 3, marginLeft: 10, justifyContent: 'center', height: 30, borderRadius: 5 }}>
                        <Text>Edit Profile</Text>
                      </Button>
                      <Button bordered={true} dark={true}
                        style={{ flex: 1, marginLeft: 5, marginRight: 10, justifyContent: 'center', height: 30, borderRadius: 5 }}>
                      </Button>
                    </View>
                  </View>
            </View>
            <View style={{ paddingHorizontal: 15, paddingTop: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>Arek Aras</Text>
              <Text>Software | gymNotebook | User acceptance testing</Text>
              <Text>www.gymNotebook.com</Text>
            </View>
          </View>
        </View>
      </Container>
    )
  }
}