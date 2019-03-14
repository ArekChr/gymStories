import firebase from "react-native-firebase";

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

export const sendMessage = (chatId: string, senderId: string, content: string ) => {
    firebase.firestore().collection('chats').doc(chatId).collection('messages').add({
        userId: senderId,
        content: content,
        createdAt: new Date().getTime()
    })
}

export const createChat = (senderId: string, receiverId: string) => {
    firebase.firestore().collection('chats').add({
        lastMessage: '',
        createdAt: new Date().getTime(),
        userIds: [
            senderId,
            receiverId,
        ]
    }).then(reference => {
        const profilesRef = firebase.firestore().collection('profiles')
        profilesRef.doc(senderId).collection('chats').add(reference)
        profilesRef.doc(receiverId).collection('chats').add(reference)

        return reference
    })
}

export const fetchChats = (userId: string) => {
    firebase.firestore().collection('profiles').doc(userId).collection('chats').get().then(snapshot => {
        const documents = snapshot.docs
        if (documents.length > 0) {

            let chats: any = []

            documents.forEach(x => {
                firebase.firestore().collection('chats').doc(x.id as string).get().then(chatSnapschot => {
                    chats.push(chatSnapschot.data())
                })
            })

            return chats
            
        } else {
            return []
        }
    })
}