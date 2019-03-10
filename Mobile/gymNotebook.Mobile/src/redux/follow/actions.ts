import { Dispatch } from "redux"
import firebase, { RNFirebase, firestore } from "react-native-firebase"
import { FollowActionTypes, Follow } from "./types"
import { Profile, ProfileBasic } from "../profile/types"

export interface FollowUpdatedData {
    profileId: string
    myFollowingCount: number
    userFollowersCount: number
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

export const fetchFollowingProfiles = (following: Follow[]) => {
    return (dispatch: Dispatch) => {
        dispatch({ type: FollowActionTypes.FETCH_FOLLOWING_PROFILES_REQ })

        let promises: Promise<RNFirebase.firestore.DocumentSnapshot>[] = []

        following.forEach(id => promises.push(firebase.firestore().collection('profiles').doc(Object.keys(id)[0]).get()))
        const profiles: any[] = []
        Promise.all(promises).then(documents => {
            documents.forEach(x => {
                let profile = x.data() as Profile
                const basicProfile: ProfileBasic = {
                    profileId: x.id as string,
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    nickname: profile.nickname,
                    imageURL: profile.imageURL,
                    following: true,
                    followApproved: following.find(follow => Object.keys(follow)[0] === x.id)![x.id!]
                }
                profiles.push(basicProfile)
            })
            
            dispatch({
                type: FollowActionTypes.FETCH_FOLLOWING_PROFILES_SUC,
                payload: profiles
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
            const myFollowingDoc = await transaction.get(myFollowsRef)
            const userFollowsDoc = await transaction.get(userFollowsRef)

            let myFollowingCount = 0
            if(!myFollowingDoc.exists) {
                transaction.set(myFollowsRef, { [followingId]: true })
            } else {
                transaction.update(myFollowsRef, { [followingId]: true })
                myFollowingCount = Object.keys(myFollowingDoc.data() as object).length + 1
            }

            transaction.update(myProfileRef, { followingCount: myFollowingCount })

            let userFollowersCount = 0
            if(!userFollowsDoc.exists) {
                transaction.set(userFollowsRef, { [myId]: true })
            } else {
                transaction.update(userFollowsRef, { [myId]: true })
                userFollowersCount = Object.keys(userFollowsDoc.data() as object).length + 1
            }

            transaction.update(userProfileRef, { followersCount: userFollowersCount })
            
            const updatedData: FollowUpdatedData = {
                profileId: followingId,
                myFollowingCount,
                userFollowersCount
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
        const myFollowingRef = myProfileRef.collection('following').doc(myId)
        const userFollowersRef = userProfileRef.collection('followers').doc(followingId)

        firebase.firestore().runTransaction(async transaction => {
            const myFollowingDoc = await transaction.get(myFollowingRef)
            const userFollowersDoc = await transaction.get(userFollowersRef)

            transaction.update(myFollowingRef, { [followingId]: firebase.firestore.FieldValue.delete() })
            const myFollowingCount = Object.keys(myFollowingDoc.data() as object).length - 1
            transaction.update(myProfileRef, { followingCount: myFollowingCount })

            transaction.update(userFollowersRef, { [myId]: firebase.firestore.FieldValue.delete() })
            const userFollowersCount = Object.keys(userFollowersDoc.data() as object).length - 1
            transaction.update(userProfileRef, { followersCount: userFollowersCount })
            
            const updatedData: FollowUpdatedData = {
                profileId: followingId,
                myFollowingCount,
                userFollowersCount
            }

            return updatedData

        }).then((updatedData: FollowUpdatedData) => {
            dispatch({ type: FollowActionTypes.UNFOLLOW_SUC, payload: updatedData })
        }).catch(() => console.warn('Transaction failed'))
    }
}