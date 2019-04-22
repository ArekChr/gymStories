import * as React from 'react';
import { Text, TextInputProps, StyleSheet } from 'react-native'
import { Colors } from '../../styles/colors';
import { FontSize } from '../../styles/sizes';

type Props = {
  underline?: boolean
} & TextInputProps

const H4: React.SFC<Props> = (props) => {
  return  (
    <Text 
      {...props}
      style={[{ color: Colors.fontDark, fontSize: FontSize.H4}, props.underline? styles.underline : null, props.style? props.style : {} ]}
    >
      {props.children}
    </Text>
  )
};

const styles = StyleSheet.create({
  underline: {
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary
  }
})

export default H4