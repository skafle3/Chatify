import type { ConversationInfo } from '../../../library'

import { Skeleton } from '@mui/material'
import { useState } from 'react'
import { GoChevronLeft } from 'react-icons/go'
import { MdGroups, MdInfo } from 'react-icons/md'
import { Link } from 'react-router-dom'

import './style.css'
import { useUsersInfo } from '../../../hooks'
import { IMAGE_PROXY } from '../../../library'
import { useUserStore } from '../../../library'
import { ViewGroup } from '../../Group'
import { ViewMedia } from '../../Media'
import { ConversationSettings } from '../index'
import {
  Name,
  Header,
  Wrapper,
  Relative,
  SingleImage,
  ImagePrimary,
  ImageSecondary,
  GroupButton,
  SettingButton,
} from './style'

type ChatHeaderProps = {
  conversation: ConversationInfo
}
export function ChatHeader({ conversation }: ChatHeaderProps) {
  const { data: users, loading } = useUsersInfo(conversation.users)
  const currentUser = useUserStore((state) => state.currentUser)

  const filtered = users?.filter((user) => user.id !== currentUser?.uid)

  const [isConversationSettingsOpen, setIsConversationSettingsOpen] =
    useState(false)

  const [isGroupMembersOpen, setIsGroupMembersOpen] = useState(false)
  const [isViewMediaOpen, setIsViewMediaOpen] = useState(false)

  return (
    <>
      <Header>
        <Wrapper>
          <Link className="mobile__link" to="/" aria-label="Home" style={{}}>
            <GoChevronLeft />
          </Link>

          {loading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <>
              {conversation.users.length === 2 ? (
                <SingleImage
                  src={IMAGE_PROXY(filtered?.[0]?.data()?.photoURL)}
                  alt=""
                />
              ) : (
                <>
                  {conversation?.group?.groupImage ? (
                    <SingleImage src={conversation.group.groupImage} alt="" />
                  ) : (
                    <Relative>
                      <ImagePrimary
                        src={IMAGE_PROXY(filtered?.[0]?.data()?.photoURL)}
                        alt=""
                      />
                      <ImageSecondary
                        src={IMAGE_PROXY(filtered?.[1]?.data()?.photoURL)}
                        alt=""
                      />
                    </Relative>
                  )}
                </>
              )}
            </>
          )}

          {loading ? (
            <Skeleton
              width={100}
              height={15}
              variant="rectangular"
              sx={{ ml: '10px' }}
            />
          ) : (
            <Name>
              {conversation.users.length > 2 && conversation?.group?.groupName
                ? conversation.group.groupName
                : filtered
                    ?.map((user) => user.data()?.displayName)
                    .slice(0, 3)
                    .join(', ')}
            </Name>
          )}
        </Wrapper>

        {!loading && (
          <Wrapper>
            {conversation.users.length > 2 && (
              <GroupButton onClick={() => setIsGroupMembersOpen(true)}>
                <MdGroups />
              </GroupButton>
            )}

            <SettingButton onClick={() => setIsConversationSettingsOpen(true)}>
              <MdInfo />
            </SettingButton>
          </Wrapper>
        )}
      </Header>

      {isConversationSettingsOpen && (
        <ConversationSettings
          conversation={conversation}
          setMediaViewOpen={setIsViewMediaOpen}
          isOpen={isConversationSettingsOpen}
          setIsOpen={setIsConversationSettingsOpen}
        />
      )}

      {isGroupMembersOpen && (
        <ViewGroup
          conversation={conversation}
          isOpen={isGroupMembersOpen}
          setIsOpen={setIsGroupMembersOpen}
        />
      )}

      {isViewMediaOpen && (
        <ViewMedia setIsOpen={setIsViewMediaOpen} isOpen={isViewMediaOpen} />
      )}
    </>
  )
}
