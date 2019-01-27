import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, ScrollView} from 'react-native'
import { STATUS_BAR_COLOR } from '../../../styles/common'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class HomeTab extends Component {

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={STATUS_BAR_COLOR} />
        <ScrollView>
          <View>
            <View style={styles.left}>
              <TouchableOpacity style={styles.profileImage}>
                <Image />
              </TouchableOpacity>
              <View>
                <TouchableOpacity style={styles.name}>
                  <Text>Arkadiusz Chrabąszczewski</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.location}>
                  <Text>Gdynia</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.right}>
              <TouchableOpacity style={styles.optionsButton}>
                <SimpleLineIcons name="options-vertical" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{backgroundColor: 'red'}}>
            <TouchableOpacity style={{}}>
              <Image style={{width: 500, height: 300 }} source={require("../../../images/post1.jpg")}/>
            </TouchableOpacity>
          </View>
          <View style={{padding: 10}}>
            <View style={{flexDirection: 'row', display: 'flex'}}>
              <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                <TouchableOpacity style={styles.icon}>
                  <FontAwesome name="heart" size={25} color="black"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                  <FontAwesome name="comment" size={25} color="black"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                  <Ionicons name="ios-send" size={30} color="black"/>
                </TouchableOpacity>
              </View>
              <View style={styles.right}>
                <TouchableOpacity style={styles.icon}>

                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text>Polubione przez Dart1123</Text>
            </View>
          </View>
        </ScrollView>
        


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },
  icon: {
    paddingRight: 5
  }
})