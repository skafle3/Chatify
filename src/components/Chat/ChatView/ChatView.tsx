/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ConversationInfo, MessageItem } from '../../../library'

import {
  collection,
  doc,
  limitToLast,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'
import { Fragment, useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams } from 'react-router-dom'

import { useCollectionQuery } from '../../../hooks'
import { firebaseDb, useUserStore } from '../../../library'
import { LeftMessage, RightMessage } from '../../Message'
import { MiniSpinner } from '../../MiniSpinner/MiniSpinner'
import AvatarFromId from '../AvatarFormId/AvatarFormId'
import { Grow, Image, Text, MiniWrapper } from './style'
import './style.css'

type ChatViewProps = {
  conversation: ConversationInfo
  inputSectionOffset: number
  replyInfo: any
  setReplyInfo: (value: any) => void
}

export const ChatView = ({
  conversation,
  inputSectionOffset,
  replyInfo,
  setReplyInfo,
}: ChatViewProps) => {
  const { id: conversationId } = useParams()

  const currentUser = useUserStore((state) => state.currentUser)

  const scrollBottomRef = useRef<HTMLDivElement>(null)

  const [limitCount, setLimitCount] = useState(10)
  const { data, loading, error } = useCollectionQuery(
    `conversation-data-${conversationId}-${limitCount}`,
    query(
      collection(
        firebaseDb,
        'conversations',
        conversationId as string,
        'messages'
      ),
      orderBy('createdAt'),
      limitToLast(limitCount)
    )
  )

  const dataRef = useRef(data)
  const conversationIdRef = useRef(conversationId)
  const isWindowFocus = useRef(true)

  useEffect(() => {
    dataRef.current = data
  }, [data])

  useEffect(() => {
    conversationIdRef.current = conversationId
  }, [conversationId])

  useEffect(() => {
    if (isWindowFocus.current) updateSeenStatus()

    scrollBottomRef.current?.scrollIntoView()

    setTimeout(() => {
      scrollBottomRef.current?.scrollIntoView()
    }, 100)
  }, [data?.docs?.slice(-1)?.[0]?.id || ''])

  const updateSeenStatus = () => {
    if (dataRef.current?.empty) return

    const lastDoc = dataRef.current?.docs?.slice(-1)?.[0]

    if (!lastDoc) return

    updateDoc(
      doc(firebaseDb, 'conversations', conversationIdRef.current as string),
      {
        [`seen.${currentUser?.uid}`]: lastDoc.id,
      }
    )
  }

  useEffect(() => {
    const focusHandler = () => {
      isWindowFocus.current = true

      updateSeenStatus()
    }

    const blurHandler = () => {
      isWindowFocus.current = false
    }

    addEventListener('focus', focusHandler)
    addEventListener('blur', blurHandler)

    return () => {
      removeEventListener('focus', focusHandler)
      removeEventListener('blur', blurHandler)
    }
  }, [])

  if (loading)
    return (
      <Grow>
        <MiniSpinner />
      </Grow>
    )

  if (error)
    return (
      <Grow>
        <Image
          src="error.png"
          alt="error message"
        />
        <Text>Something went wrong</Text>
      </Grow>
    )

  if (data?.empty)
    return (
      <Grow>
        <Image
          src="startChating.jpg"
          alt=""
        />
        <Text>No message recently. Start chatting now.</Text>
      </Grow>
    )

  return (
    <InfiniteScroll
      className="no-scrollbar"
      dataLength={data?.size as number}
      next={() => setLimitCount((prev) => prev + 10)}
      inverse
      hasMore={(data?.size as number) >= limitCount}
      loader={
        <Grow>
          <MiniSpinner />
        </Grow>
      }
      style={{ display: 'flex', flexDirection: 'column-reverse' }}
      height={`calc(100vh - ${144 + inputSectionOffset}px)`}
    >
      <div>
        {data?.docs
          .map((doc) => ({ id: doc.id, ...doc.data() } as MessageItem))
          .map((item, index) => (
            <Fragment key={item.id}>
              {item.sender === currentUser?.uid ? (
                <RightMessage
                  replyInfo={replyInfo}
                  setReplyInfo={setReplyInfo}
                  message={item}
                />
              ) : (
                <LeftMessage
                  replyInfo={replyInfo}
                  setReplyInfo={setReplyInfo}
                  message={item}
                  index={index}
                  docs={data?.docs}
                  conversation={conversation}
                />
              )}
              {Object.entries(conversation.seen).filter(
                ([key, value]) => key !== currentUser?.uid && value === item.id
              ).length > 0 && (
                <MiniWrapper>
                  {Object.entries(conversation.seen)
                    .filter(
                      ([key, value]) =>
                        key !== currentUser?.uid && value === item.id
                    )
                    .map(([key]) => (
                      <AvatarFromId key={key} uid={key} size={20} />
                    ))}
                </MiniWrapper>
              )}
            </Fragment>
          ))}
        <div ref={scrollBottomRef}></div>
      </div>
    </InfiniteScroll>
  )
}
