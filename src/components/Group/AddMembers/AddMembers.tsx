import type { ConversationInfo, SavedUser } from '../../../library'

import {
  arrayUnion,
  collection,
  query,
  updateDoc,
  where,
  doc,
} from 'firebase/firestore'
import { FiPlus } from 'react-icons/fi'
import { useParams } from 'react-router-dom'

import { useCollectionQuery } from '../../../hooks'
import { IMAGE_PROXY } from '../../../library'
import { firebaseDb } from '../../../library'
import { MiniSpinner } from '../../MiniSpinner/MiniSpinner'
import {
  Button,
  Image,
  Name,
  User,
  Wrapper,
  Info,
  Container,
} from '../Members/style'

type AddMembersProps = {
  conversations: ConversationInfo
}

export function AddMembers({ conversations }: AddMembersProps) {
  const { id: conversationId } = useParams()

  const { data, loading, error } = useCollectionQuery(
    `all-users-except-${JSON.stringify(conversations.users)}`,
    query(
      collection(firebaseDb, 'users'),
      where('uid', 'not-in', conversations.users.slice(0, 10))
    )
  )

  const handleAddMember = (uid: string) => {
    updateDoc(doc(firebaseDb, 'conversations', conversationId as string), {
      users: arrayUnion(uid),
    })
  }

  if (loading || error) return <MiniSpinner />

  return (
    <Container>
      {data?.docs
        ?.map((item) => item.data() as SavedUser)
        .map((user) => (
          <Wrapper key={user.uid}>
            <User className="flex-grow">
              <Image
                className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                src={IMAGE_PROXY(user.photoURL)}
                alt=""
              />
              <Name>{user.displayName}</Name>
            </User>
            <Button onClick={() => handleAddMember(user.uid)}>
              <FiPlus style={{ fontSize: '.9rem', marginRight: '5px' }} /> add
              participants
            </Button>
          </Wrapper>
        ))}
      {data?.empty && <Info className="text-center">No more user to add</Info>}
    </Container>
  )
}
