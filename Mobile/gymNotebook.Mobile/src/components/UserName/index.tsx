import * as React from 'react';
import { Text, StyleSheet, StyleProp, TextStyle, TextProps } from 'react-native';

interface Props extends TextProps {
  firstName: string
  lastName: string
  style?: StyleProp<TextStyle>
}

const UserName: React.SFC<Props> = (props) => {
  const {firstName, lastName, style} = props
  return <Text {...props} style={[styles.usernameText, style? style: null]}>
      {firstName.charAt(0).toUpperCase() + firstName.slice(1)} {lastName.charAt(0).toUpperCase() + lastName.slice(1)}
    </Text>
};

const styles = StyleSheet.create({
  usernameText: { 
    fontWeight: '600',
    marginTop: 'auto',
    marginBottom: 'auto',
    color: 'black'
  }
})

export default UserName