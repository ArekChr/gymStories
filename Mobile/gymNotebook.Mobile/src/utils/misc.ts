import { Platform } from 'react-native'

export const iOS = () => {
  switch(Platform.OS){
    case "ios": {
      return true;
    }
    case "android": {
      return false;
    }
  }
}
