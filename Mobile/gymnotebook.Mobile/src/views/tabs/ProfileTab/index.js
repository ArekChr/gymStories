import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default class ProfileTab extends Component {

  onSettingsPress = () => {
    this.props.navigation.navigate('Settings')
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ paddingTop: 15 }}>
          <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, alignItems: 'center', paddingLeft: 15 }}>
                <Image style={{ width: 90, height: 90, borderRadius: 45 }} source={require('../../../images/profile2.jpg')}/>
              </View>
                <View style={{ flex: 3 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold' }} >0</Text>
                      <Text style={{ fontSize: 11, color: 'grey' }}>Posty</Text>
                    </View>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }} >1 551 425 325</Text>
                        <Text style={{ fontSize: 11, color: 'grey' }}>Obserwujący</Text>
                      </View>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }} >548</Text>
                        <Text style={{ fontSize: 11, color: 'grey' }}>Obserwuje</Text>
                      </View>
                  </View>
                  <View style={{ flexDirection: 'row', paddingTop: 7 }}>
                    <TouchableOpacity
                      style={{ alignItems: 'center', borderWidth: 1, flex: 3, marginLeft: 10, justifyContent: 'center', height: 30, borderRadius: 5 }}>
                      <Text>Edytuj profil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onSettingsPress} bordered={true} dark={true}
                        style={{ alignItems: 'center', borderWidth: 1, flex: 1, marginLeft: 5, marginRight: 10, justifyContent: 'center', height: 30, borderRadius: 5 }}>
                      <AntDesign size={20} name='setting' color='black' />
                    </TouchableOpacity>
                  </View>
                </View>
          </View>
          <View style={{ paddingHorizontal: 15, paddingTop: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>Arkadiusz Chrabąszczewski</Text>
            <Text>Trening funkcjonalny</Text>
            <Text>www.gymNotebook.com</Text>
          </View>
        </View>
      </View>
    )
  }
}