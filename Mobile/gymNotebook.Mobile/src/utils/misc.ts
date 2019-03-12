import { Platform } from 'react-native'

export const FIREBASEURL = `gymnotebook-cd027.firebaseapp.com`
export const APIKEY = `AIzaSyAIZeGBNAIxVqWpammuVflQVuYy2mWwUL0`;
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`
export const SIGNIN = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`

export const iOS = () => {
  switch(Platform.OS){
    case "ios": 
      return true
    case "android": 
      return false
  }
}
