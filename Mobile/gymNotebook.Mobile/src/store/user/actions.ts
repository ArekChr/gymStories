import { Dispatch } from "redux";
import { UserActionTypes } from "./types";
import firebase from "react-native-firebase";

export const fetchUsers = (text: string, quantity: number) => {
  return async(dispatch: Dispatch) => {
    dispatch({
      type: UserActionTypes.FETCH_USERS_REQ
    })

    const profileRef = firebase.database().ref('profiles')

    var result1 = {}
    var result2 = {}
    result1 = await profileRef.orderByChild('firstName').startAt(text).endAt(text + '\uf8ff').once('value').then(snapshot => {
      // dispatch({
      //   type: UserActionTypes.FETCH_USERS_SUC,
      //   payload: users
      // })
      return snapshot.val()
    })

    result2 = await profileRef.orderByChild('lastName').startAt(text).endAt(text + '\uf8ff').once('value').then(snapshot => {
      return snapshot.val()
    })

    var result = {...result1, ...result2}
    var list = Object.keys(result).map((x) => Object.assign(result[x], {id: x}))
    dispatch({
      type: UserActionTypes.FETCH_USERS_SUC,
      payload: list
    })
  }
}