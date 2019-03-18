import firebase, { RNFirebase } from "react-native-firebase"
import { Message, Chat, ChatDto } from "./types"
import { mapSnapshotToProfile } from "../profile/actions"
import { Profile } from "../profile/types"

export const fetchMessages = (chatId: string, quantity: number, startDate: number) => {
    firebase.firestore().collection('chats').doc(chatId).collection('messages')
        .orderBy('createdAt', 'DESC').where('createdAt', '<=', startDate)
        .limit(20).get().then(snapshot => {

        const documents = snapshot.docs
        if(documents.length > 0) {
            return documents
        } else {
            return []
        }
    })


}

export const messagesObserver = (chatId: string) => {
    return firebase.firestore().collection('chats').doc(chatId).collection('messages').orderBy('createdAt', 'ASC').onSnapshot(docSnapshot => {
        docSnapshot.docChanges.forEach(change => {
            if (change.type === 'added') {
                console.log(change.doc.data())
                return change.doc.data()
            }
        })
    })
}

export const sendMessage = (chatId: string, message: Message ) => {
    return firebase.firestore().collection('chats').doc(chatId).collection('messages').add({
        userId: message.userId,
        content: message.content,
        createdAt: message.createdAt
    })
}

export const createChat = (senderId: string, receiverId: string, message: string) => {
    return firebase.firestore().collection('chats').add({
        lastMessage: message,
        lastMessageId: senderId,
        updatedAt: new Date().getTime(),
        userIds: [
            senderId,
            receiverId,
        ]
    }).then(reference => {
        const profilesRef = firebase.firestore().collection('profiles')
        profilesRef.doc(senderId).collection('chats').add({ 
            id: reference.id,
            lastMessage: message,
            lastMessageId: senderId,
            updatedAt: new Date().getTime(),
            userIds: [
                senderId,
                receiverId,
            ]
        })
        profilesRef.doc(receiverId).collection('chats').add({ 
            id: reference.id,
            lastMessage: message,
            lastMessageId: senderId,
            updatedAt: new Date().getTime(),
            userIds: [
                senderId,
                receiverId,
            ] 
        })

        return reference
    })
}

export const fetchChats = (userId: string) => {

    // TODO: store in redux
    const profileRef = firebase.firestore().collection('profiles')
    return profileRef.doc(userId).collection('chats').get().then(snapshot => {
        const documents = snapshot.docs
        if (documents.length > 0) {
            const chats: Chat[] = [
                ...snapshot.docs.map((x) => {
                    const chat = x.data() as Chat                    
                    return chat as Chat
                })
            ]

            let promises: Promise<RNFirebase.firestore.DocumentSnapshot>[] = []
            chats.forEach(chat => promises.push(profileRef.doc(chat.userIds.find(id => id !== userId)).get()))

            let profiles: Profile[] = []

            return Promise.all(promises).then(documents => {
                documents.forEach(document => {
                  profiles.push(mapSnapshotToProfile(document) as Profile)
                })
        
                const chatDtos: ChatDto[] = chats.map(chat => {
                  let profile = profiles.find(x => x.id === chat.userIds.find(id => id !== userId)) as Profile
                  return {
                      ...chat,
                      profile: profile
                  }
                })
                return chatDtos
            })

        } else {
            return []
        }
    })
}