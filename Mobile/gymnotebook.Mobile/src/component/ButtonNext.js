import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { SECONDARY_COLOR } from '../styles/common';

export default class ButtonNext extends Component {

  render() {
    return (
      <TouchableOpacity {...this.props} style={{padding: 2, marginTop: 30}}>
        <Text style={{ 
          width: '100%', 
          backgroundColor: SECONDARY_COLOR, 
          color: 'black', 
          textAlignVertical: "center",
          textAlign: 'center',
          height: 35,
          borderRadius: 4
        }}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}