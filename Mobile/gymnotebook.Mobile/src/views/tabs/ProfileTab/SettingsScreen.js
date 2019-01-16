import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {removeTokensFromStorage} from '../../../utils/misc'
import {logout} from '../../../store/auth/actions'
import {connect} from 'react-redux'

class SettingsScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Ustawienia'
    }
  }

  onLogOutPress = () => {
    removeTokensFromStorage(() => {
      this.props.logout();
      this.props.navigation.navigate('LoginScreen');
    })
  }

  render() {
    return (
      <View>
        <Text style={styles.titleFirst}>Konto</Text>
        <TouchableOpacity>
          <Text style={styles.button}>Hasło</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Pomoc</Text>
        <TouchableOpacity>
          <Text style={styles.button}>Centrum Pomocy</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.button}>Zgłoś problem</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Informacje</Text>
        <TouchableOpacity>
          <Text style={styles.button}>Aktualizacje aplikacji</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.button}>Regulamin</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Logowanie</Text>
        <TouchableOpacity onPress={this.onLogOutPress}>
          <Text style={{...styles.button, color: '#B00020',}}>Wyloguj się</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    textAlignVertical: 'center',
    height: 40,
    fontSize: 15,
    paddingLeft: 15,
    color: 'black'
  },
  titleFirst: {
    textAlignVertical: 'center',
    height: 50,
    fontSize: 15,
    paddingLeft: 15,
    color: 'black',
    fontWeight: 'bold',
    paddingTop: 10
  },
  title: {
    textAlignVertical: 'center',
    height: 50,
    fontSize: 15,
    paddingLeft: 15,
    color: 'black',
    fontWeight: 'bold',
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(220,220,220,1)',
    marginTop: 10,
    paddingTop: 10
  }
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => logout()(dispatch)
})

export default connect(null, mapDispatchToProps)(SettingsScreen)