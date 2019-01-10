import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { TitleComponent } from '../../component'
import {PRIMARY_COLOR} from '../../styles/common'

export default class RegisterEndScreen extends Component {

  render() {
    return (
      <View style={{ justifyContent: "center", flex: 1}}>
        <TitleComponent style={{marginTop: 0, marginBottom: 20}}>Rejestrowanie</TitleComponent>
        <ActivityIndicator color={PRIMARY_COLOR} size='large'/>
      </View>
    );
  }
}