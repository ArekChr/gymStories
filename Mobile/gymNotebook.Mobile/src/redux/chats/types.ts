import { Profile } from "../profile/types";

export enum ChatActionTypes {
    FETCH_CHATS_REQ = '@chat/FETCH_CHATS_REQ',
    FETCH_CHATS_SUC = '@chat/FETCH_CHATS_SUC',
    FETCH_MESSAGES_REQ = '@chat/FETCH_MESSAGES_REQ',
    FETCH_MESSAGES_SUC = '@chat/FETCH_MESSAGES_SUC',
    SEND_MESSAGE_REQ = '@chat/SEND_MESSAGE_REQ',
    SEND_MESSAGE_SUC = '@chat/SEND_MESSAGE_SUC',
    CREATE_NEW_CHAT_REQ = '@chat/CREATE_NEW_CHAT_REQ',
    CREATE_NEW_CHAT_SUC = '@chat/CREATE_NEW_CHAT_SUC'
}

export interface Message {
    content: string
    createdAt: number
    userId: string
}

export interface Chat {
    id: string
    updatedAt: number
    lastMessage: string
    lastMessageId: string
    userIds: string[]
}

export interface ChatDto extends Chat {
    profile: Profile
}