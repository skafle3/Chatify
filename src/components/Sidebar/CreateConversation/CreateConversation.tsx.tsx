import { Dialog } from '@mui/material'
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import { useState } from 'react'
import { FiX } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import { useCollectionQuery } from '../../../hooks'
import { firebaseDb, IMAGE_PROXY, useUserStore } from '../../../library'
import { Grow } from '../../Chat/ChatView/style'
import { MiniSpinner } from '../../MiniSpinner/MiniSpinner'
import { CloseButton } from '../Profile/style'
import {
  Error,
  Text,
  Users,
  User,
  Image,
  Name,
  Wrapper,
  Button,
  Title,
  Container,
} from './style'
type CreateConversationProps = {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function CreateConversation({
  isModalOpen,
  setIsModalOpen,
}: CreateConversationProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [selected, setSelected] = useState<string[]>([])

  const currentUser = useUserStore((state) => state.currentUser)

  const { data, error, loading } = useCollectionQuery(
    'all-users',
    collection(firebaseDb, 'users')
  )

  const navigate = useNavigate()

  const handleToggle = (uid: string) => {
    if (selected.includes(uid)) {
      setSelected(selected.filter((item) => item !== uid))
    } else {
      setSelected([...selected, uid])
    }
  }

  const handleCreateConversation = async () => {
    setIsCreating(true)

    const sorted = [...selected, currentUser?.uid].sort()

    const QUERY = query(
      collection(firebaseDb, 'conversations'),
      where('users', '==', sorted)
    )

    const querySnapshot = await getDocs(QUERY)

    if (querySnapshot.empty) {
      const created = await addDoc(collection(firebaseDb, 'conversations'), {
        users: sorted,
        group:
          sorted.length > 2
            ? {
                admins: [currentUser?.uid],
                groupName: null,
                groupImage: null,
              }
            : {},
        updatedAt: serverTimestamp(),
        seen: {},
      })

      setIsCreating(false)

      setIsModalOpen(false)

      navigate(`/${created.id}`)
    } else {
      setIsModalOpen(false)

      navigate(`/${querySnapshot.docs[0].id}`)

      setIsCreating(false)
    }
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }
  return (
    <Dialog onClose={handleClose} open={isModalOpen}>
      {loading ? (
        <MiniSpinner />
      ) : error ? (
        <Error>
          <Text>Something went wrong</Text>
        </Error>
      ) : (
        <Container>
          {isCreating && <MiniSpinner />} <Title>New Conversation</Title>
          <Users>
            {data?.docs
              .filter((doc) => doc.data().uid !== currentUser?.uid)
              .map((doc) => (
                <User
                  key={doc.data().uid}
                  onClick={() => handleToggle(doc.data().uid)}
                >
                  <input
                    type="checkbox"
                    style={{ cursor: 'pointer' }}
                    checked={selected.includes(doc.data().uid)}
                    readOnly
                  />
                  <Image src={IMAGE_PROXY(doc.data().photoURL)} alt="" />
                  <Name>{doc.data().displayName}</Name>
                </User>
              ))}
          </Users>
          <Wrapper>
            <Button
              disabled={selected.length === 0}
              onClick={handleCreateConversation}
            >
              Start conversation
            </Button>
          </Wrapper>
          <CloseButton aria-label="close" onClick={handleClose}>
            <FiX />
          </CloseButton>
        </Container>
      )}
    </Dialog>
  )
}
