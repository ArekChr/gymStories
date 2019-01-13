import React, { Component } from 'react';
import { View, TextInput, Animated, StyleSheet } from 'react-native';
import { WARNING_COLOR, PRIMARY_COLOR } from '../styles/common'
import { Fonts } from '../styles'

export default class FloatingInput extends Component {

  state = {
    isFocused: false,
  };

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
    if (this.props.onRef != null) {
      this.props.onRef(this)
    }
  }

  focus() {
    this.textInput.focus()
  }

  handleFocus = () => {
    this.setState({ isFocused: true })
  }
  handleBlur = () => {
    this.setState({ isFocused: false })
  }

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
      duration: 200,
    }).start();
  }

  render() {
    const { label, ...props } = this.props;
    const FOCUSED_COLOR = this.props.isValid? this.state.isFocused ? PRIMARY_COLOR : '#aaa' : WARNING_COLOR
    const FOCUSED_BORDER = this.state.isFocused ? 2 : 1
    const labelStyle = {
      fontFamily: Fonts.primaryLight,
      position: 'absolute',
      left: 7,

      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [52, 28],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [19, 12],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', FOCUSED_COLOR],
      }),
    };
    return (
      <View style={[{ paddingTop: 18, width: '100%', padding: 2},this.props.style]}>
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        <TextInput
          {...props}
          style={{
            paddingLeft: 6,
            paddingBottom: 6,
            marginTop: 20,  
            fontSize: 19, 
            color: '#000', 
            fontFamily: Fonts.primaryRegular,
            borderBottomWidth: FOCUSED_BORDER, 
            borderBottomColor: FOCUSED_COLOR 
          }}
          ref={input => this.textInput = input}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
          selectionColor={PRIMARY_COLOR}
        />
      </View>
    );
  }
}