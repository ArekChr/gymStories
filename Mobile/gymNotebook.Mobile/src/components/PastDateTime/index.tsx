import * as React from 'react';
import { Text } from 'react-native'

interface AppProps {
  timestamp: number
}

const PastDateTime: React.SFC<AppProps> = (props) => {
  var time = Math.round((new Date().getTime() - new Date(props.timestamp).getTime()) / 1000 / 60)
  var prefix;
  switch(true){
    case (time > 10080):
      prefix = "TYG. TEMU"
      time = Math.round(time / 10080)
      break
    case (time > 1440):
      time = Math.round(time / 1440)
      if(time === 1)
        prefix = "DZIEŃ TEMU"
      else
        prefix = "DNI TEMU"
      break
    case (time > 60):
      prefix = "GODZ. TEMU"
      time = Math.round(time / 60)
      break
    case (time > 0):
      prefix = "MIN. TEMU"
      break
    case (time === 0):
      prefix = "TERAZ"
      break
  }
  return (
    <Text style={{ fontSize: 10, color: 'gray', marginTop: 2 }}>{`${time === 0 ? '' : time + ' '}${prefix}`}</Text>
  )
};

export default PastDateTime