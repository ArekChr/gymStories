import React, { Component } from 'react';
import { View, TextInput, Animated, StyleProp, ViewStyle, TextInputProps } from 'react-native';
import { WARNING_COLOR, PRIMARY_COLOR } from '../styles/common'
import { Fonts } from '../styles'

interface Props {
  label: string
  isValid: boolean
  value: string
  onRef?: any
}

type AllProps = Props & TextInputProps

export default class FloatingInput extends Component<AllProps> {

  state = {
    isFocused: false,
  };

  private textInput: TextInput | null = TextInput.prototype;

  private _animatedIsFocused : Animated.Value = Animated.Value.prototype

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
    if (this.props.onRef != null) {
      this.props.onRef(this)
    }
  }

  focus() {
    if(this.textInput){
      this.textInput.focus()
    }
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
      fontFamily: Fonts.robotoLight,
      position: 'absolute',
      left: 7,

      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 28],
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
            marginTop: 15,  
            fontSize: 19, 
            color: '#000', 
            fontFamily: Fonts.robotoRegular,
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