import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface Props {
  onPress: void
}
class CheckButton extends Component<Props, {}> {

  render() {
    return (
      <TouchableOpacity style={{padding: 10}} onPress={() => this.props.onPress}>
        <MaterialIcons name="check" size={25} color='white' /> 
      </TouchableOpacity>
    );
  }
}

export default CheckButton;
