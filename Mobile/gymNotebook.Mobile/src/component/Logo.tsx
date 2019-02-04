import React, { Component } from 'react'
import { StyleSheet, Text, Animated, Easing, View } from 'react-native'
import { PRIMARY_COLOR } from '../styles/common'
import { Fonts,  } from '../styles'

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
        easing:Easing.cubic
      }),
      Animated.timing(this.state.notebookAnim, {
        toValue:1,
        duration:500,
        easing:Easing.cubic
      })
    ]).start(() => {
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
            <Text style={{...styles.logoText, color: 'black'}}>gym</Text>
          </Animated.View>
          <Animated.View style={{ 
            opacity:this.state.notebookAnim
          }}>
            <Text style={styles.logoText}>Notebook</Text>
          </Animated.View>
        </View>
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
    flexDirection: 'row',
    maxHeight: 100,
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 40,
    fontFamily: Fonts.robotoLight,
    color: PRIMARY_COLOR
  }
})
 