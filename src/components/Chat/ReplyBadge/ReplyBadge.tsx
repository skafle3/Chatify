import { doc } from 'firebase/firestore'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useDocumentQuery } from '../../../hooks'
import { firebaseDb } from '../../../library'
import { AlertMessage } from '../../Alert'
type ReplyBadgeProps = {
  messageId: string
}
export function ReplyBadge({ messageId }: ReplyBadgeProps) {
  const { id: conversationId } = useParams()

  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const { data, loading, error } = useDocumentQuery(
    `message-${messageId}`,
    doc(
      firebaseDb,
      'conversations',
      conversationId as string,
      'messages',
      messageId
    )
  )

  if (loading || error) return <div>waiting</div>

  return (
    <>
      <div
        onClick={() => {
          const element = document.querySelector(`#message-${messageId}`)
          if (element) element.scrollIntoView({ behavior: 'smooth' })
          else setIsAlertOpen(true)
        }}
      >
        {data?.data()?.type === 'text' ? (
          <p>{data?.data()?.content}</p>
        ) : data?.data()?.type === 'image' ? (
          'An image'
        ) : data?.data()?.type === 'file' ? (
          'A file'
        ) : (
          'Message has been removed'
        )}
      </div>
      <AlertMessage
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        text="Cannot find your message. Try to scroll up to load more."
      />
    </>
  )
}
