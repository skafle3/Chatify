/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MessageItem } from '../../../library'

import { Icon } from '@iconify/react'
import { updateDoc, doc } from 'firebase/firestore'
import { motion } from 'framer-motion'
import { Fragment, useState } from 'react'
import { BsReply } from 'react-icons/bs'
import { FiSmile, FiTrash2 } from 'react-icons/fi'
import { useParams } from 'react-router-dom'

import { formatFileSize } from '../../../library'
import { splitLinkFromMessage } from '../../../library'
import { formatDate } from '../../../library'
import { firebaseDb } from '../../../library'
import { useUserStore } from '../../../library'
import { ReactionPopup, ReactionStatus, ReplyBadge } from '../../Chat'
import FileIcon from '../../Media/Files/FileIcon'

import './style.css'
type RightMessageProps = {
  message: MessageItem
  replyInfo: any
  setReplyInfo: (value: any) => void
}

export function RightMessage({ message, setReplyInfo }: RightMessageProps) {
  const [isSelectReactionOpen, setIsSelectReactionOpen] = useState(false)

  const { id: conversationId } = useParams()

  const currentUser = useUserStore((state) => state.currentUser)

  const removeMessage = (messageId: string) => {
    updateDoc(
      doc(
        firebaseDb,
        'conversations',
        conversationId as string,
        'messages',
        messageId
      ),
      {
        type: 'removed',
        file: null,
        content: '',
        reactions: [],
      }
    )
  }

  const formattedDate = formatDate(
    message.createdAt?.seconds ? message.createdAt?.seconds * 1000 : Date.now()
  )
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          translateY: '20px',
          opacity: 0,
        },
        visible: {
          translateY: '0px',
          opacity: 1,
          transition: {
            delay: 0.2,
            type: 'spring',
            duration: 0.8,
          },
        },
      }}
      id={`message-${message.id}`}
    >
      <div id="rightReply" className="rightMessage__reply--badge">
        {!!message.replyTo && (
          <ReplyBadge messageId={message.replyTo as string} />
        )}
      </div>
      <div
        id="rightMessage"
        onClick={(event) => {
          if (event.detail === 2 && message.type !== 'removed') {
            setReplyInfo(message)
          }
        }}
        className={
          Object.keys(message.reactions || {}).length > 0 ? 'mb-2' : ''
        }
      >
        {message.type === 'text' ? (
          <div
            id="rightMessage  "
            className="rightMessage__text--link"
            onClick={(event) => event.stopPropagation()}
            title={formattedDate}
          >
            {splitLinkFromMessage(message.content).map((item, index) => (
              <Fragment key={index}>
                {typeof item === 'string' ? (
                  <span>{item}</span>
                ) : (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.link}
                  </a>
                )}
              </Fragment>
            ))}
          </div>
        ) : message.type === 'image' ? (
          <div id="rightMessage">
            <img
              className="rightMessage__image"
              title={formattedDate}
              src={message.content}
              alt=""
            />
          </div>
        ) : message.type === 'file' ? (
          <div
            id="rightMessage"
            className="rightMessage__file"
            onClick={(event) => event.stopPropagation()}
            title={formattedDate}
          >
            <a
              href={message.content}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                icon="ic:baseline-download"
                style={{
                  fontSize: '1.5rem',
                  color: '#4b5563',
                }}
              />
            </a>

            <div className="rightMessage__file--info">
              <p>{message.file?.name}</p>

              <p>{formatFileSize(message.file?.size as number)}</p>
            </div>
            <FileIcon
              extension={message.file?.name.split('.').slice(-1)[0] as string}
            />
          </div>
        ) : (
          <div
            id="rightMessage"
            className="rightMessage__removed"
            onClick={(event) => event.stopPropagation()}
            title={formattedDate}
          >
            Message has been removed
          </div>
        )}
        {message.type !== 'removed' && (
          <div id="rightMessage__actions">
            <button
              onClick={(event) => {
                setReplyInfo(message)
                event.stopPropagation()
              }}
            >
              <BsReply />
            </button>

            <button
              onClick={() => setIsSelectReactionOpen(!isSelectReactionOpen)}
            >
              <FiSmile />
            </button>

            <button
              onClick={(event) => {
                removeMessage(message.id as string)
                event.stopPropagation()
              }}
            >
              <FiTrash2 />
            </button>
          </div>
        )}{' '}
        {isSelectReactionOpen && (
          <ReactionPopup
            position="right"
            isOpen={isSelectReactionOpen}
            setIsOpen={setIsSelectReactionOpen}
            messageId={message.id as string}
            currentReaction={
              message.reactions?.[currentUser?.uid as string] || 0
            }
          />
        )}
        {Object.keys(message.reactions || {}).length > 0 && (
          <ReactionStatus message={message} position="right" />
        )}{' '}
      </div>
    </motion.div>
  )
}
