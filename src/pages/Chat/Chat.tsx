import type { ConversationInfo } from '../../library'

import { doc } from 'firebase/firestore'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  ChatHeader,
  ChatView,
  InputSection,
  MiniSpinner,
  Sidebar,
} from '../../components'
import { Grow } from '../../components/Chat/ChatView/style'
import { useDocumentQuery } from '../../hooks/useDocumentQuery'
import { useUserStore } from '../../library'
import { firebaseDb } from '../../library'
import { ChatWrapper, Error, Text, Image, Wrapper, MobileHide } from './style'

export function Chat() {
  const { id } = useParams()
  const { data, loading, error } = useDocumentQuery(
    `conversation-${id}`,
    doc(firebaseDb, 'conversations', id as string)
  )

  const conversation = data?.data() as ConversationInfo
  const currentUser = useUserStore((state) => state.currentUser)
  const [inputSectionOffset, setInputSectionOffset] = useState(0)
  const [replyInfo, setReplyInfo] = useState(null)

  return (
    <Wrapper>
      <MobileHide>
        <Sidebar />
      </MobileHide>
      <ChatWrapper>
        {loading ? (
          <Grow>
            <MiniSpinner />
          </Grow>
        ) : !conversation ||
          error ||
          !conversation.users.includes(currentUser?.uid as string) ? (
          <Error>
            <Image
              src="https://cdn-icons-png.flaticon.com/512/763/763717.png"
              alt=""
            />
            <Text>Conversation does not exist.</Text>
          </Error>
        ) : (
          <>
            <ChatHeader conversation={conversation} />
            <ChatView
              replyInfo={replyInfo}
              setReplyInfo={setReplyInfo}
              inputSectionOffset={inputSectionOffset}
              conversation={conversation}
            />
            <InputSection
              setInputSectionOffset={setInputSectionOffset}
              replyInfo={replyInfo}
              setReplyInfo={setReplyInfo}
            />
          </>
        )}
      </ChatWrapper>
    </Wrapper>
  )
}
