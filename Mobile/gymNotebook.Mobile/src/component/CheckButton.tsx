import React, { Component } from 'react'
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface Props {
  onPress: () => void
}
class CheckButton extends Component<Props> {

  state = {
    loading: false
  }

  onPress = () => {
    this.props.onPress()
    this.setState({loading: true})
  }

  render() {
    if(this.state.loading) {
      return (<ActivityIndicator style={{padding: 10, transform: [{scale: .9}]}} color="black" size="large" ></ActivityIndicator>)
    }
    return (
      <TouchableOpacity style={{padding: 10}} onPress={() => this.onPress()}>
        <MaterialIcons name="check" size={25} color='black' /> 
      </TouchableOpacity>
    );
  }
}

export default CheckButton;
