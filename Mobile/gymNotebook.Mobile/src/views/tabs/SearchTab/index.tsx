import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { PRIMARY_COLOR } from '../../../styles/common'
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import { Dispatch } from 'redux';
import { fetchUsers } from '../../../store/user/actions';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: any
}

class SearchTab extends Component<Props> {

  state = { 
    quantity: 20
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }: any) => (
      <FontAwesome name="search" size={24} color={tintColor} />
    )
  }

  onSearch = (text: string) => {
    this.props.fetchUsers(text, 20)
  }

  renderUsers() {
      return this.props.users.map((user, i) => {
        const source = user.imageURL ? {uri: user.imageURL} : require('../../../images/default-user.png')
        return (
          <View key={i} style={styles.profileTab}>
            <Image style={styles.photo} source={source}/>
            <Text style={styles.usernameText}>{user.firstName} {user.lastName}</Text>
          </View>
        )
      })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{ backgroundColor: PRIMARY_COLOR, flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity><Text style={{ color: 'white', padding: 10 }}>Filtrowanie</Text></TouchableOpacity>
          <TouchableOpacity><Text style={{ color: 'white', padding: 10 }}>Mapy</Text></TouchableOpacity>
          <TouchableOpacity><Text style={{ color: 'white', padding: 10 }}>Najpopularniejsze</Text></TouchableOpacity>
        </View>

        <View style={{ backgroundColor: PRIMARY_COLOR}}>
          <View style={{flexDirection: 'row', marginBottom: 5, justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
            <View style={{
              backgroundColor: 'white',
              height: 30,
              width: 22,
              borderTopLeftRadius: 3,
              borderBottomLeftRadius: 3,
              justifyContent: 'center',
              paddingLeft: 5
            }}>
              <EvilIcons name='search' size={20} color='black' />
            </View>
            <TextInput 
              onChangeText={(text)=> this.props.fetchUsers(text, 20)}
              placeholder='Znajdź trenera'
              style={{ 
                fontSize: 15,
                backgroundColor: 'white', 
                width: '94%', 
                height: 30, 
                padding: 0, 
                paddingLeft: 10,
                borderBottomRightRadius:3, borderTopRightRadius:3}} 
            />
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
            <View style={{
              backgroundColor: 'white',
              height: 30,
              width: 22,
              borderTopLeftRadius: 3,
              borderBottomLeftRadius: 3,
              justifyContent: 'center',
              paddingLeft: 5
            }}>
              <EvilIcons name='location' size={20} color='black' />
            </View>
            <TextInput 
              placeholder='Wybierz miasto lub dzielnice'
              style={{ 
                fontSize: 15,
                backgroundColor: 'white', 
                width: '94%', 
                height: 30, 
                padding: 0, 
                paddingLeft: 10,
                borderBottomRightRadius:3, borderTopRightRadius:3}} 
            />
          </View>
        </View>
        <ScrollView>
        {this.renderUsers()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  profileTab: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
  },
  photo: { 
    margin: 10,
    width: 50,
    height: 50,
    borderRadius: 45
  },
  usernameText: { 
    fontWeight: '600',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  premiumText: { 
    color:'#D4AF37',
    backgroundColor: 'rgba(240,230,140,0.4)',
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 4,
    alignSelf: 'flex-start'
  },
  locationIcon: { 
    marginTop: 2,
    marginLeft: -4
  }
})


const mapStateToProps = (state: ApplicationState) => ({
  users: state.Users.users
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUsers:(text: string, quantity: number) => fetchUsers(text, quantity)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchTab)