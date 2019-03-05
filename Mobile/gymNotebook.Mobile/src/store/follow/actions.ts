import { Dispatch } from "redux"
import firebase, { RNFirebase } from "react-native-firebase"
import { FollowActionTypes, Follow } from "./types"
import { Profile } from "../profile/types";

export interface FollowUpdatedData {
    profileId: string
    myfollowersCount: number
    userFollowingCount: number
}

export function mapRawObjectToFollows(snapshot: RNFirebase.firestore.DocumentSnapshot): Follow[] {
    let followingObj: any = snapshot.data() as object
    let following: Follow[] = [] 
    if(followingObj) {
        Object.keys(followingObj).forEach(key => following.push({[key]: followingObj[key]}))
    }
    return following
}

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

export const fetchMyFollowers = (profileId: string) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: FollowActionTypes.FETCH_MYFOLLOWERS_REQ
        })

        firebase.firestore().collection('profiles').doc(profileId).collection('followers').doc(profileId).get()
        .then((snapshot) => {
            const followers = mapRawObjectToFollows(snapshot)

            dispatch({
                type: FollowActionTypes.FETCH_MYFOLLOWERS_SUC,
                payload: followers
            })
        })
    }
}

export const fetchMyFollowing = (profileId: string) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: FollowActionTypes.FETCH_MYFOLLOWING_REQ
        })
        firebase.firestore().collection('profiles').doc(profileId).collection('following').doc(profileId).get()
        .then((snapshot) => {
            const following = mapRawObjectToFollows(snapshot)
            
            dispatch({
                type: FollowActionTypes.FETCH_MYFOLLOWING_SUC,
                payload: following
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

export const follow = (myId: string, followingId: string) => {
    return (dispatch: Dispatch) => {
        dispatch({ type: FollowActionTypes.FOLLOW_REQ, payload: { profileId: followingId } })
        
        const myProfileRef = firebase.firestore().collection('profiles').doc(myId)
        const userProfileRef = firebase.firestore().collection('profiles').doc(followingId)
        const myFollowsRef = myProfileRef.collection('following').doc(myId)
        const userFollowsRef = userProfileRef.collection('followers').doc(followingId)

        firebase.firestore().runTransaction(async transaction => {
            const myFollowsDoc = await transaction.get(myFollowsRef)
            const userFollowsDoc = await transaction.get(userFollowsRef)
            const myProfileDoc = await transaction.get(myProfileRef)
            const userProfileDoc = await transaction.get(userProfileRef)

            if(!myFollowsDoc.exists) {
                transaction.set(myFollowsRef, { [followingId]: true })
            } else {
                transaction.update(myFollowsRef, { [followingId]: true })
            }

            const myProfileData = <Profile>myProfileDoc.data()
            const myfollowersCount = myProfileData.followersCount + 1
            transaction.update(myProfileRef, { followersCount: myfollowersCount })

            if(!userFollowsDoc.exists) {
                transaction.set(userFollowsRef, { [myId]: true })
            } else {
                transaction.update(userFollowsRef, { [myId]: true })
            }

            const userProfileData = <Profile>userProfileDoc.data()
            const userFollowingCount = userProfileData.followingCount + 1
            transaction.update(userProfileRef, { followingCount: userFollowingCount })
            
            const updatedData: FollowUpdatedData = {
                profileId: followingId,
                myfollowersCount,
                userFollowingCount
            }

            return updatedData

        }).then((updatedData: FollowUpdatedData) => {
            dispatch({ type: FollowActionTypes.FOLLOW_SUC, payload: updatedData })
        }).catch(() => console.warn('Transaction failed'))
    }
}

export const unfollow = (myId: string, followingId: string) => {
    return (dispatch: Dispatch) => {
        dispatch({ type: FollowActionTypes.UNFOLLOW_REQ, payload: { profileId: followingId } })
        
        const myProfileRef = firebase.firestore().collection('profiles').doc(myId)
        const userProfileRef = firebase.firestore().collection('profiles').doc(followingId)
        const myFollowsRef = myProfileRef.collection('following').doc(myId)
        const userFollowsRef = userProfileRef.collection('followers').doc(followingId)

        firebase.firestore().runTransaction(async transaction => {
            const myProfileDoc = await transaction.get(myProfileRef)
            const userProfileDoc = await transaction.get(userProfileRef)

            transaction.update(myFollowsRef, { [followingId]: firebase.firestore.FieldValue.delete() })

            const myProfileData = <Profile>myProfileDoc.data()
            const myfollowersCount = myProfileData.followersCount - 1
            transaction.update(myProfileRef, { followersCount: myfollowersCount })
            transaction.update(userFollowsRef, { [myId]: firebase.firestore.FieldValue.delete() })

            const userProfileData = <Profile>userProfileDoc.data()
            const userFollowingCount = userProfileData.followingCount - 1
            transaction.update(userProfileRef, { followingCount: userFollowingCount })
            
            const updatedData: FollowUpdatedData = {
                profileId: followingId,
                myfollowersCount,
                userFollowingCount
            }

            return updatedData

        }).then((updatedData: FollowUpdatedData) => {
            dispatch({ type: FollowActionTypes.UNFOLLOW_SUC, payload: updatedData })
        }).catch(() => console.warn('Transaction failed'))
    }
}