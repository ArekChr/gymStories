import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { HEADER_COLOR } from '../../../styles/common'


export default class SearchTab extends Component {

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <FontAwesome name="search" size={24} color={tintColor} />
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{ backgroundColor: HEADER_COLOR, flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity><Text style={{ color: 'white', padding: 10 }}>Filtrowanie</Text></TouchableOpacity>
          <TouchableOpacity><Text style={{ color: 'white', padding: 10 }}>Mapy</Text></TouchableOpacity>
          <TouchableOpacity><Text style={{ color: 'white', padding: 10 }}>Najpopularniejsze</Text></TouchableOpacity>
        </View>

        <View style={{ backgroundColor: HEADER_COLOR}}>
          <View style={{flexDirection: 'row', marginBottom: 5, justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
            <View style={{
              backgroundColor: 'white',
              height: 30,
              width: '6%',
              borderTopLeftRadius: 3,
              borderBottomLeftRadius: 3,
              justifyContent: 'center',
              paddingLeft: 5
            }}>
              <EvilIcons name='search' size={20} color='black' />
            </View>
            <TextInput 
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
              width: '6%',
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
          <View style={styles.profileContainer}>
            <View style={styles.profileTab}>
              <View style={styles.leftTab}>
                <Image style={styles.photo} source={require('../../../images/profile.jpg')}/>
                <View style={styles.ratingContainer}>
                  <TouchableOpacity>
                    <AntDesignIcon name="star" size={20} color={HEADER_COLOR} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <AntDesignIcon name="star" size={20} color={HEADER_COLOR} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <AntDesignIcon name="star" size={20} color={HEADER_COLOR} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <AntDesignIcon name="star" size={20} color={HEADER_COLOR} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <AntDesignIcon name="staro" size={20} color={HEADER_COLOR} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.ratingButton}>
                  <Text style={styles.ratingText}>
                    5 248 opinii
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileNavButton}>
                  <Text style={styles.profileNavText}>
                    Przejdz{"\n"}do profilu
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rightTab}>
                <Text style={styles.usernameText}>Patrycja Kubińska</Text>
                <Text style={styles.premiumText}>Uzytkownik Premium</Text>
                <Text>Trening Funkcjonalny</Text>
                <View>
                  <TouchableOpacity style={{ flexDirection:'row'}}>
                    <EvilIcons name="location" style={styles.locationIcon} size={20} color='black' />
                    <Text>Gdynia</Text>
                  </TouchableOpacity>
                </View>
                <Text style={{paddingBottom: 5, paddingTop: 3}}>
                  Studentka Dietetyki &#128170;&#128170; {'\n'}
                  Pasjonatka gotowania {'\n'}
                  Zakochana w treningu {'\n'}
                  funkcjonalnym &#9829; &#9829; &#9829;
                </Text>
                <TouchableOpacity style={{ flexDirection:'row'}}>
                  <FontAwesome style={{paddingRight: 5}} name='calendar' size={18} />
                  <Text>Umów na trening</Text>
                </TouchableOpacity>
                
              </View>
            </View>
            <View style={styles.profileTab}>
              <View style={styles.leftTab}>
                <Image style={styles.photo} source={require('../../../images/profile2.jpg')}/>
                <View style={styles.ratingContainer}>
                  <TouchableOpacity>
                    <AntDesignIcon name="star" size={20} color={HEADER_COLOR} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <AntDesignIcon name="star" size={20} color={HEADER_COLOR} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <AntDesignIcon name="star" size={20} color={HEADER_COLOR} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <AntDesignIcon name="star" size={20} color={HEADER_COLOR} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <AntDesignIcon name="star" size={20} color={HEADER_COLOR} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.ratingButton}>
                  <Text style={styles.ratingText}>
                    25 041 opinii
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileNavButton}>
                  <Text style={styles.profileNavText}>
                    Przejdz{"\n"}do profilu
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rightTab}>
                <Text style={styles.usernameText}>Arkadiusz Chrabąszczewski</Text>
                <Text style={styles.premiumText}>Uzytkownik Platinium</Text>
                <Text>Trening Siłowy</Text>
                <View>
                  <TouchableOpacity style={{ flexDirection:'row'}}>
                    <EvilIcons name="location" style={styles.locationIcon} size={20} color='black' />
                    <Text>Gdynia</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.profileTab}>
              <View style={styles.leftTab}>
                <Image style={styles.photo} source={require('../../../images/profile3.jpg')}/>
                <View style={styles.ratingContainer}>
                  <TouchableOpacity>
                    <AntDesignIcon name="star" size={20} color={HEADER_COLOR} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <AntDesignIcon name="staro" size={20} color={HEADER_COLOR} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <AntDesignIcon name="staro" size={20} color={HEADER_COLOR} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <AntDesignIcon name="staro" size={20} color={HEADER_COLOR} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <AntDesignIcon name="staro" size={20} color={HEADER_COLOR} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.ratingButton}>
                  <Text style={styles.ratingText}>
                    1 opinia
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileNavButton}>
                  <Text style={styles.profileNavText}>
                    Przejdz{"\n"}do profilu
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rightTab}>
                <Text style={styles.usernameText}>Damian Hejda</Text>
                <Text>Sezonowiec</Text>
                <View>
                  <TouchableOpacity style={{ flexDirection:'row'}}>
                    <EvilIcons name="location" style={styles.locationIcon} size={20} color='black' />
                    <Text>Gdynia</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  profileContainer: {
  },
  profileTab: {
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
  },
  leftTab: {
    width: '30%'
  },
  rightTab: {
    padding: 10,
    width: '70%'
  },
  photo: { 
    marginLeft: 'auto',
    marginRight:'auto',
    marginTop: 10,
    width: 90,
    height: 90,
    borderRadius: 45
  },
  ratingContainer: { 
    flexDirection:'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5
  },
  ratingButton: { 
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 6
  },
  ratingText: {
    color: HEADER_COLOR, 
    fontWeight:'600',
    backgroundColor: 'rgba(0,121,107,0.2)', 
    paddingRight: 4,
    paddingLeft: 4,
    borderRadius: 4
  },
  profileNavButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 6
  },
  profileNavText: { 
    width: 80,
    height: 35,
    textAlignVertical: "center",
    textAlign: "center",
    alignItems:'center',
    justifyContent:'center',
    textAlign: 'center',
    fontWeight:'600',
    color: 'white',
    backgroundColor: HEADER_COLOR,
    paddingRight: 4,
    paddingLeft: 4,
    borderRadius: 4
  },
  usernameText: { 
    fontWeight: '600'
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
