import React, { Component } from 'react'
import { View, Text, AppState, ScrollView, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { NavigationScreenProp } from 'react-navigation';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<ChatsScreen>
}

class ChatsScreen extends Component<Props> {
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{margin: 10}}>
          <TextInput 
            onFocus={() => this.props.navigation.navigate('SearchChatsScreen')} 
            placeholder="Szukaj" 
            clearButtonMode="always" 
            style={{ height: 43, backgroundColor: '#EEE', borderRadius: 50, paddingLeft: 35 }} />
          <FontAwesome name="search" size={16} color="#444" style={{ position: 'absolute', top: 13, left: 12}} />
        </View>
        <ScrollView keyboardShouldPersistTaps="handled">

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10,
    width: 28,
    color: "purple"
  },
})

const mapStateToProps = (state: AppState) => ({

})

const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ChatsScreen)
