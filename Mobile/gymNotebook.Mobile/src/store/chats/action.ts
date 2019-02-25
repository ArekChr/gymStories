import { Dispatch } from "redux";
import firebase from "react-native-firebase";
import { ChatActionTypes } from "./types";

export const fetchMessages = (chatId: string, quantity: number) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: ChatActionTypes.FETCH_MESSAGES_REQ
        })

        firebase.database().ref(`messages/${chatId}`)
        .orderByChild('timestamp')
        .limitToFirst(quantity)
        .on('value', (snapshot) => {

            dispatch({
                type: ChatActionTypes.FETCH_MESSAGES_SUC
            })
        })
    }
}

export const sendMessage = (chatId: string, userId: string, message: string) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: ChatActionTypes.SEND_MESSAGE_REQ
        })

        firebase.database().ref(`messages/${chatId}`).push({
            message: message,
            sender: userId,
            timestamp: new Date().getTime()
        })
        .then(() => {
            dispatch({
                type: ChatActionTypes.SEND_MESSAGE_SUC
            })
        })
    }
}

// TODO: investigate if can fetch data with limit of nest, if not, create chat relations otherwise create created chats inside profile
export const fetchChats = (userId: string) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: ChatActionTypes.FETCH_CHATS_REQ
        })

        firebase.database().ref(`chats/${userId}`).once('value').then((response) => {


            dispatch({
                type: ChatActionTypes.FETCH_CHATS_SUC
            })
        })
    }
}

export const openNewChat = (senderId: string, recipientId: string) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: ChatActionTypes.CREATE_NEW_CHAT_REQ
        })

        let chatId = ''
        firebase.database().ref(`messages`).push({
            userId: senderId,                          // init? "senderId opened new chat"
            init: true,
            message: ''
        }).then((response) => {
            // TODO: set chatId
            response
            chatId // = response.chatId ? 

            firebase.database().ref(`chats/${senderId}`).push({
                userId: recipientId,
                chatId: chatId
            })
            .then(() => {
                firebase.database().ref(`chats/${recipientId}`).push({
                    userId: senderId,
                    chatId: chatId
                }).then(() => {


                    dispatch({
                        type: ChatActionTypes.CREATE_NEW_CHAT_SUC
                    })
                })
            })
        })
    }
}