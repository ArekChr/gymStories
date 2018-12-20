import React, { Component } from 'react'
import { Image, StyleSheet, Text, Animated, Easing } from 'react-native'
import { View } from 'native-base';

export default class Logo extends Component {

  state = {
    gymAnim: new Animated.Value(0),
    notebookAnim: new Animated.Value(0)
  }

  componentWillMount() {
    Animated.sequence([
      Animated.timing(this.state.gymAnim, {
        toValue:1,
        duration:1000,
        easing:Easing.easeOutCubic
      }),
      Animated.timing(this.state.notebookAnim, {
        toValue:1,
        duration:500,
        easing:Easing.easeOutCubic
      })
    ]).start(() => {
      alert('Done')
    })
  }

  render(){
    return(
      <View>
        <View style={styles.logoStyles}>
          <Animated.View style={{ 
            opacity: this.state.gymAnim,
            top: this.state.gymAnim.interpolate({
              inputRange:[0,1],
              outputRange:[100,0]
            }) 
          }}>
            <Text style={{...styles.logoText, color: 'white'}}>gym</Text>
          </Animated.View>
          <Animated.View style={{ 
            opacity:this.state.notebookAnim
          }}>
            <Text style={styles.logoText}>Notebook</Text>
          </Animated.View>
        </View>
        {/* <Image style={styles.logo}
        source={{ uri: 'https://cdn-images-1.medium.com/max/1200/1*K0a7xINk0RM5gfXGSN68cw.png' }}/> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200
  },
  logoStyles: {
    marginTop: 50,
    flex:1,
    flexDirection: 'row',
    maxHeight: 100
  },
  logoText: {
    fontSize: 40,
    fontFamily: 'Ubuntu-Medium',
    color: 'rgba(74,217,255,1)'
  }
})
 