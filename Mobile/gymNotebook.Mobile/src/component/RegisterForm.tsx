import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native'

export default class RegisterForm extends React.Component {
  public render(){
    return(
      <View style={styles.container}>
        <TextInput style={styles.inputBox} underlineColorAndroid="rgba(0,0,0,0)" placeholder="Email"/>
        <TextInput style={styles.inputBox} underlineColorAndroid="rgba(0,0,0,0)" placeholder="Password" secureTextEntry={true}/>
        <TextInput style={styles.inputBox} underlineColorAndroid="rgba(0,0,0,0)" placeholder="Confirm Password" secureTextEntry={true}/>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{this.props.type}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputBox: {
    width: 250,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginVertical: 10,
    fontSize: 16,
    color: '#ffffff'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'rgba(74,217,255,1)',
    borderRadius: 25,
    width: 250,
    height: 50,
    marginVertical: 10,
    paddingVertical: 14
  }
})