/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ConversationInfo, MessageItem } from '../../../library'

import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { Fragment, useState } from 'react'
import { BsReply } from 'react-icons/bs'
import { FiSmile } from 'react-icons/fi'

import { formatFileSize, splitLinkFromMessage } from '../../../library'
import { formatDate, useUserStore } from '../../../library'
import { ReactionPopup, ReactionStatus, ReplyBadge } from '../../Chat'
import AvatarFromId from '../../Chat/AvatarFormId/AvatarFormId'
import FileIcon from '../../Media/Files/FileIcon'

import './style.css'

type LeftMessageProps = {
  message: MessageItem
  conversation: ConversationInfo
  index: number
  docs: any[]
  replyInfo: any
  setReplyInfo: (value: any) => void
}

export function LeftMessage({
  message,
  conversation,
  index,
  docs,
  setReplyInfo,
}: LeftMessageProps) {
  const [isSelectReactionOpen, setIsSelectReactionOpen] = useState(false)
  const currentUser = useUserStore((state) => state.currentUser)

  const formattedDate = formatDate(
    message.createdAt.seconds ? message.createdAt.seconds * 1000 : Date.now()
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
      <div
        id="leftReply"
        className={conversation.users.length === 2 ? 'px-8' : 'px-[70px]'}
      >
        {!!message.replyTo && (
          <ReplyBadge messageId={message.replyTo as string} />
        )}
      </div>
      <div
        id="leftMessage"
        onClick={(event) => {
          if (event.detail === 2 && message.type !== 'removed') {
            setReplyInfo(message)
          }
        }}
        className={
          Object.keys(message.reactions || {}).length > 0 ? 'util__mb' : ''
        }
      >
        {conversation.users.length > 2 && (
          <div
            className="message__avatar"
            onClick={(event) => event.stopPropagation()}
          >
            {docs[index - 1]?.data()?.sender !== message.sender && (
              <AvatarFromId uid={message.sender} />
            )}
          </div>
        )}
        {message.type === 'text' ? (
          <div
            onClick={(event) => event.stopPropagation()}
            title={formattedDate}
            className={`leftMessage__text--link ${
              conversation.users.length === 2 ? 'util__fix' : ''
            }`}
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
          <div id="leftMessage">
            <img
              className="leftMessage__image"
              onClick={(event) => {
                event.stopPropagation()
              }}
              title={formattedDate}
              src={message.content}
              alt=""
            />
          </div>
        ) : message.type === 'file' ? (
          <div
            id="leftMessage"
            className="leftMessage__file"
            onClick={(event) => event.stopPropagation()}
            title={formattedDate}
          >
            {' '}
            <FileIcon
              extension={message.file?.name.split('.').slice(-1)[0] as string}
            />
            <div className="leftMessage__file--info">
              <p>{message.file?.name}</p>

              <p>{formatFileSize(message.file?.size as number)}</p>
            </div>
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
          </div>
        ) : (
          <div
            id="leftMessage"
            className="leftMessage__removed"
            onClick={(e) => e.stopPropagation()}
            title={formattedDate}
          >
            Message has been removed
          </div>
        )}
        {message.type !== 'removed' && (
          <div id="leftMessage__actions">
            <button onClick={() => setIsSelectReactionOpen(true)}>
              <FiSmile />
            </button>
            <button
              onClick={(e) => {
                setReplyInfo(message)
                e.stopPropagation()
              }}
            >
              <BsReply />
            </button>
          </div>
        )}{' '}
        {isSelectReactionOpen && (
          <ReactionPopup
            position="left"
            isOpen={isSelectReactionOpen}
            setIsOpen={setIsSelectReactionOpen}
            messageId={message.id as string}
            currentReaction={
              message.reactions?.[currentUser?.uid as string] || 0
            }
          />
        )}
        {Object.keys(message.reactions || {}).length > 0 && (
          <ReactionStatus message={message} position="left" />
        )}{' '}
      </div>
    </motion.div>
  )
}
