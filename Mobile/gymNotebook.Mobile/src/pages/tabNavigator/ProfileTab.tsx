import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Button } from 'native-base'
import { Ionicons } from '@expo/vector-icons'

export default class ProfileTab extends Component {

  public static navigationOptions = {
    tabBarIcon: ({ tintColor }: any) => (
            <FontAwesome name="user" size={26} color={tintColor} />
    )
  }

  public render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ paddingTop: 15 }}>
          <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, alignItems: 'center', paddingLeft: 15 }}>
                <Image style={{ width: 90, height: 90, borderRadius: 37.5 }} source={require('../../images/default-user.png')}/>
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
                        <Ionicons name="ios-settings" size={25} color="black" />
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  user: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginLeft: 10
  }
})