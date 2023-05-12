/* eslint-disable @typescript-eslint/no-unused-vars */
import type { MessageItem } from '../../../library'

import { Dialog } from '@mui/material'
import { useState } from 'react'
import { FiX } from 'react-icons/fi'

import { useUsersInfo } from '../../../hooks'
import { IMAGE_PROXY } from '../../../library'
import { REACTIONS_UI } from '../../../library'
// eslint-disable-next-line import/order
import { MiniSpinner } from '../../MiniSpinner/MiniSpinner'

import './style.css'

import {
  CloseButton,
  Container,
  Title,
  User,
  Wrapper,
  Image,
  Name,
} from './style'

type ReactionStatusProps = {
  position: 'left' | 'right' | 'left-tab'
  message: MessageItem
}

export function ReactionStatus({ message, position }: ReactionStatusProps) {
  const {
    data: usersInfo,
    loading,
    error,
  } = useUsersInfo(Object.keys(message.reactions || {}))

  const [isReactionStatusOpened, setIsReactionStatusOpened] = useState(false)

  const handleClose = () => {
    setIsReactionStatusOpened(false)
  }

  return (
    <>
      <div
        onClick={() => setIsReactionStatusOpened(true)}
        className={
          position === 'right'
            ? 'status__right'
            : position === 'left-tab'
            ? 'status__left-seventy'
            : 'status__left-twenty'
        }
      >
        {Object.entries(
          Object.entries(message.reactions).reduce((acc, [key, value]) => {
            if (value) acc[value] = (acc[value] || 0) + 1
            return acc
          }, {} as { [key: number]: number })
        )
          .sort(([key1, value1], [key2, value2]) => value1 - value2)
          .slice(0, 3)
          .map(([key, value]) => (
            <img
              key={key}
              src={Object.entries(REACTIONS_UI)[Number(key) - 1][1].icon}
              alt=""
            />
          ))}

        <span>
          {
            Object.entries(message.reactions).filter(([key, value]) => value)
              .length
          }
        </span>
      </div>

      {isReactionStatusOpened && (
        <Dialog onClose={handleClose} open={isReactionStatusOpened}>
          <Container>
            <Title>Reactions</Title>

            <CloseButton onClick={() => setIsReactionStatusOpened(false)}>
              <FiX />
            </CloseButton>
          </Container>

          {loading || error ? (
            <MiniSpinner />
          ) : (
            <div>
              {Object.entries(message.reactions)
                .filter(([key, value]) => value)
                .map(([key, value]) => (
                  <Wrapper key={key}>
                    <User>
                      <Image
                        src={IMAGE_PROXY(
                          usersInfo?.find((user) => user.id === key)?.data()
                            ?.photoURL
                        )}
                        alt=""
                      />
                      <Name>
                        {
                          usersInfo?.find((user) => user.id === key)?.data()
                            ?.displayName
                        }
                      </Name>
                    </User>

                    <img
                      src={Object.values(REACTIONS_UI)[value - 1].icon}
                      alt=""
                    />
                  </Wrapper>
                ))}
            </div>
          )}
        </Dialog>
      )}
    </>
  )
}
