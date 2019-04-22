import * as React from 'react';
import { Text, TextInputProps } from 'react-native'
import { Colors } from '../../styles/colors';
import { FontSize } from '../../styles/sizes';

const H1: React.SFC<TextInputProps> = (props) => {
  return  (
    <Text 
      {...props}
      style={[{ color: Colors.fontDark, fontSize: FontSize.H1}, props.style? props.style : {} ]}
    >
      {props.children}
    </Text>
  )
};

export default H1