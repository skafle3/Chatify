import type { ConversationInfo, SavedUser } from '../../..//library'

import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { firebaseDb, IMAGE_PROXY, useUserStore } from '../../..//library'
import { useUsersInfo } from '../../../hooks'
import { SuccessMessage } from '../../Alert'
import { AlertMessage } from '../../Alert/Alert'
import { MiniSpinner } from '../../MiniSpinner/MiniSpinner'
import { Container, Wrapper, User, Image, Name, Button, Menu } from './style'

type MembersProps = {
  conversation: ConversationInfo
}

export const Members = ({ conversation }: MembersProps) => {
  const { id: conversationId } = useParams()

  const currentUser = useUserStore((state) => state.currentUser)

  const { data, loading, error } = useUsersInfo(conversation.users)

  const navigate = useNavigate()

  const [isAlertMessageOpen, setIsAlertMessageOpen] = useState(false)
  const [isSuccessMessageOpen, setIsSuccesMessageOpen] = useState(false)

  const [alertMessage, setAlertMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleRemoveFromGroup = (uid: string) => {
    if (
      conversation.group?.admins.length === 1 &&
      conversation.group.admins[0] === uid
    ) {
      setAlertMessage('You must set another one to be an admin')
      setIsAlertMessageOpen(true)
    } else {
      updateDoc(doc(firebaseDb, 'conversations', conversationId as string), {
        users: arrayRemove(uid),
        'group.admins': arrayRemove(uid),
        'group.groupImage': conversation.group?.groupImage,
        'group.groupName': conversation.group?.groupName,
      })

      if (currentUser?.uid === uid) {
        navigate('/')
      }

      setSuccessMessage(
        `Done kicking ${currentUser?.displayName} out of the group`
      )
      setIsSuccesMessageOpen(true)
    }
  }

  const handleMakeAdmin = (uid: string) => {
    updateDoc(doc(firebaseDb, 'conversations', conversationId as string), {
      'group.admins': arrayUnion(uid),
      'group.groupImage': conversation.group?.groupImage,
      'group.groupName': conversation.group?.groupName,
    })
    setIsSuccesMessageOpen(true)
    setSuccessMessage('Done making an admin')
  }

  if (loading || error)
    return (
      <div>
        <MiniSpinner />
      </div>
    )

  return (
    <>
      <Container>
        {data
          ?.map((item) => item.data() as SavedUser)
          .map((user) => (
            <Wrapper key={user.uid}>
              <User>
                <Image src={IMAGE_PROXY(user.photoURL)} alt="" />
                <Name>{user.displayName}</Name>
              </User>

              {conversation.group?.admins?.includes(
                currentUser?.uid as string
              ) && (
                <Menu>
                  {conversation.users.length > 3 && (
                    <Button onClick={() => handleRemoveFromGroup(user.uid)}>
                      <>
                        {user.uid === currentUser?.uid
                          ? 'Leave group'
                          : 'Kick from group'}
                      </>
                    </Button>
                  )}
                  {user.uid !== currentUser?.uid && (
                    <Button onClick={() => handleMakeAdmin(user.uid)}>
                      Make an admin
                    </Button>
                  )}
                </Menu>
              )}
            </Wrapper>
          ))}
      </Container>

      <SuccessMessage
        text={successMessage}
        isOpen={isSuccessMessageOpen}
        setIsOpen={setIsSuccesMessageOpen}
      />

      <AlertMessage
        text={alertMessage}
        isOpen={isAlertMessageOpen}
        setIsOpen={setIsAlertMessageOpen}
      />
    </>
  )
}
