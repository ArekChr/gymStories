import { Dispatch } from "redux";
import firebase from "react-native-firebase";
import { FollowActionTypes } from "./types";


export const fetchFollowers = (profileUid: string) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: FollowActionTypes.FETCH_FOLLOWERS_REQ
        })

        firebase.database().ref(`following/${profileUid}`).once('value')
        .then((snapshot) => {
            dispatch({
                type: FollowActionTypes.FETCH_FOLLOWERS_SUC,
                payload: []
            })
        })
    }
}

export const fetchFollowing = (profileUid: string) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: FollowActionTypes.FETCH_FOLLOWING_REQ
        })

        firebase.database().ref(`followers/${profileUid}`).once('value')
        .then((snapshot) => {
            dispatch({
                type: FollowActionTypes.FETCH_FOLLOWING_SUC,
                payload: []
            })
        })
    }
}

export const follow = (profileUid: string, followingUid: string) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: FollowActionTypes.FOLLOW_REQ
        })

        firebase.database().ref(`following/${profileUid}`).push({
            [followingUid]: true
        })
        .then(() => {
            firebase.database().ref(`followers/${followingUid}`).push({
                [profileUid]: true
            })
            .then(() => {
                dispatch({
                    type: FollowActionTypes.FOLLOW_SUC
                })
            })
        })
    }
}

export const unfollow = (profileUid: string, followingUid: string) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: FollowActionTypes.UNFOLLOW_REQ
        })

        firebase.database().ref(`following/${profileUid}/${followingUid}`).remove()
        .then(() => {
            firebase.database().ref(`followers/${followingUid}/${profileUid}`).remove()
            .then(() => {
                dispatch({
                    type: FollowActionTypes.UNFOLLOW_SUC
                })
            })
        })
    }
}