import type { ConversationInfo, SavedUser } from '../../../library'

import { updateDoc, doc, arrayRemove } from 'firebase/firestore'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useUsersInfo } from '../../../hooks'
import { IMAGE_PROXY } from '../../../library'
import { firebaseDb } from '../../../library'
import { useUserStore } from '../../../library'
import { SuccessMessage } from '../../Alert'
import { MiniSpinner } from '../../MiniSpinner/MiniSpinner'
import {
  Button,
  Container,
  Image,
  Name,
  User,
  Wrapper,
  Highlight,
} from '../Members/style'

type AdminProps = {
  conversation: ConversationInfo
}
export function Admin({ conversation }: AdminProps) {
  const [successMessage, setSuccessMessage] = useState('')
  const [isSuccessMessageOpen, setIsSuccesMessageOpen] = useState(false)

  const { id: conversationId } = useParams()

  const currentUser = useUserStore((state) => state.currentUser)

  const { data, loading, error } = useUsersInfo(
    conversation.group?.admins as string[]
  )

  const handleRemoveAdminPosition = (uid: string) => {
    updateDoc(doc(firebaseDb, 'conversations', conversationId as string), {
      'group.admins': arrayRemove(uid),
      'group.groupImage': conversation.group?.groupImage,
      'group.groupName': conversation.group?.groupName,
    })
    setIsSuccesMessageOpen(true)
    setSuccessMessage(
      `Done removing ${currentUser?.displayName} from the admin position`
    )
  }

  if (loading || error) return <MiniSpinner />
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
              ) && user.uid !== currentUser?.uid ? (
                <Button onClick={() => handleRemoveAdminPosition(user.uid)}>
                  Remove admin position
                </Button>
              ) : (
                <Highlight>Admin</Highlight>
              )}
            </Wrapper>
          ))}
      </Container>

      <SuccessMessage
        text={successMessage}
        isOpen={isSuccessMessageOpen}
        setIsOpen={setIsSuccesMessageOpen}
      />
    </>
  )
}
