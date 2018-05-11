import React, { Component } from 'react'
import {
    Image
} from 'react-native'

export default class Logo extends Component {
  public render(){
    return(
      <Image style={{ width: 200, height: 200 }}
      source={{ uri: 'https://cdn-images-1.medium.com/max/1200/1*K0a7xINk0RM5gfXGSN68cw.png' }}/>
    )
  }
}
