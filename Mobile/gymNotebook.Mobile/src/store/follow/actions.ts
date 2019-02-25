import { Dispatch } from "redux";
import firebase from "react-native-firebase";
import { FollowActionTypes } from "./types";


export const fetchFollowers = (profileId: string) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: FollowActionTypes.FETCH_FOLLOWERS_REQ
        })

        firebase.database().ref(`following/${profileId}`).once('value')
        .then((snapshot) => {
            dispatch({
                type: FollowActionTypes.FETCH_FOLLOWERS_SUC,
                payload: []
            })
        })
    }
}

export const fetchFollowing = (profileId: string) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: FollowActionTypes.FETCH_FOLLOWING_REQ
        })

        firebase.database().ref(`followers/${profileId}`).once('value')
        .then((snapshot) => {
            dispatch({
                type: FollowActionTypes.FETCH_FOLLOWING_SUC,
                payload: []
            })
        })
    }
}

export const follow = (profileId: string, followingId: string) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: FollowActionTypes.FOLLOW_REQ
        })

        firebase.database().ref(`following/${profileId}`).push({
            [followingId]: true
        })
        .then(() => {
            firebase.database().ref(`followers/${followingId}`).push({
                [profileId]: true
            })
            .then(() => {
                dispatch({
                    type: FollowActionTypes.FOLLOW_SUC
                })
            })
        })
    }
}

export const unfollow = (profileId: string, followingId: string) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: FollowActionTypes.UNFOLLOW_REQ
        })

        firebase.database().ref(`following/${profileId}/${followingId}`).remove()
        .then(() => {
            firebase.database().ref(`followers/${followingId}/${profileId}`).remove()
            .then(() => {
                dispatch({
                    type: FollowActionTypes.UNFOLLOW_SUC
                })
            })
        })
    }
}