export type ConversationInfo = {
  users: string[]
  group?: {
    admins: string[]
    groupName: null | string
    groupImage: null | string
  }

  seen: {
    [key: string]: string
  }
  updatedAt: {
    seconds: number
    nanoseconds: number
  }
  theme: string
}

export interface SavedUser {
  uid: string
  email: string | null
  displayName: string
  photoURL: string
  phoneNumber: string | null
}

export interface MessageItem {
  id?: string
  sender: string
  content: string
  replyTo?: string
  file?: {
    name: string
    size: number
  }
  createdAt: {
    seconds: number
    nanoseconds: number
  }
  type: 'text' | 'image' | 'file' | 'sticker' | 'removed'
  reactions: {
    [key: string]: number
  }
}
