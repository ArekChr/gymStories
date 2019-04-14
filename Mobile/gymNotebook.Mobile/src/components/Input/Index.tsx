import React, { Component } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import { Colors } from '../../styles/colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons'

export default class Input extends Component<TextInputProps> {
  render() {
    return (
      <View style={{flexDirection: 'row', marginBottom: 15, marginTop: 15, justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
        <View style={{
          backgroundColor: Colors.primaryLight,
          height: 35,
          width: 30,
          borderTopLeftRadius: 6,
          borderBottomLeftRadius: 6,
          justifyContent: 'center',
          paddingLeft: 5
        }}>
          <EvilIcons name='search' size={30} color={Colors.fontDark} />
        </View>
        <TextInput 
          placeholderTextColor={Colors.fontDark}
          style={{ 
            fontSize: 15,
            backgroundColor: Colors.primaryLight,
            color: Colors.fontDark,
            width: '94%', 
            height: 35, 
            padding: 0, 
            paddingLeft: 10,
            borderBottomRightRadius: 6,
            borderTopRightRadius: 6
          }}
          {...this.props}
        />
      </View>
    )
  }
}
