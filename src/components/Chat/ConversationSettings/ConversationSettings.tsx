import type { ConversationInfo } from '../../../library'
import type { ChangeEvent, FormEvent } from 'react'

import { Dialog } from '@mui/material'
import { updateDoc, doc, arrayRemove } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useRef, useState } from 'react'
import {
  FiChevronDown,
  FiEdit,
  FiFile,
  FiLogOut,
  FiX,
  FiCamera,
  FiChevronRight,
} from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'

import { firebaseStorage, formatFileName } from '../../../library'
import { firebaseDb } from '../../../library'
import { useUserStore } from '../../../library'
import { AlertMessage } from '../../Alert'
import {
  CloseButton,
  Header,
  Title,
  Container,
  Button,
  Form,
  NameInput,
  NameButton,
} from './styled'

type ConversationSettingsProps = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  setMediaViewOpen: (value: boolean) => void
  conversation: ConversationInfo
}
export function ConversationSettings({
  isOpen,
  setIsOpen,
  setMediaViewOpen,
  conversation,
}: ConversationSettingsProps) {
  const { id: conversationId } = useParams()

  const currentUser = useUserStore((state) => state.currentUser)

  const navigate = useNavigate()

  const [isChangeChatNameOpen, setIsChangeChatNameOpen] = useState(false)

  const [chatNameInputValue, setChatNameInputValue] = useState(
    conversation?.group?.groupName || ''
  )

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertText, setAlertText] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (!chatNameInputValue.trim()) return

    setIsOpen(false)
    updateDoc(doc(firebaseDb, 'conversations', conversationId as string), {
      'group.groupName': chatNameInputValue.trim(),
    })
  }

  const handleFileInputChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image')) {
      setAlertText('FIle is not an image')
      setIsAlertOpen(true)
      return
    }
    const FIVE_MB = 1024 * 1024 * 5

    if (file.size > FIVE_MB) {
      setAlertText('Max image size is 20MB')
      setIsAlertOpen(true)
      return
    }

    setIsAlertOpen(false)

    const fileReference = ref(firebaseStorage, formatFileName(file.name))
    await uploadBytes(fileReference, file)

    const downloadURL = await getDownloadURL(fileReference)

    updateDoc(doc(firebaseDb, 'conversations', conversationId as string), {
      'group.groupImage': downloadURL,
    })
  }

  const leaveGroup = () => {
    updateDoc(doc(firebaseDb, 'conversations', conversationId as string), {
      users: arrayRemove(currentUser?.uid as string),
      'group.admins': arrayRemove(currentUser?.uid as string),
      'group.groupImage': conversation.group?.groupImage,
      'group.groupName': conversation.group?.groupName,
    })

    navigate('/')
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <Header>
        <Title>Conversation settings</Title>
        <CloseButton onClick={() => setIsOpen(false)}>
          <FiX />
        </CloseButton>
      </Header>

      <Container>
        {conversation.users.length > 2 && (
          <>
            <Button onClick={() => setIsChangeChatNameOpen((prev) => !prev)}>
              <FiEdit style={{ fontSize: '1.3rem', marginRight: '10px' }} />{' '}
              Change chat name
              {isChangeChatNameOpen ? (
                <FiChevronDown style={{ marginLeft: 'auto' }} />
              ) : (
                <FiChevronRight style={{ marginLeft: 'auto' }} />
              )}
            </Button>
            {isChangeChatNameOpen && (
              <Form onSubmit={handleFormSubmit}>
                <NameInput
                  value={chatNameInputValue}
                  onChange={(e) => setChatNameInputValue(e.target.value)}
                  type="text"
                  placeholder="Chat name"
                />
                <NameButton>Change</NameButton>
              </Form>
            )}
            <Button onClick={() => fileInputRef.current?.click()}>
              <FiCamera style={{ fontSize: '1.3rem', marginRight: '10px' }} />
              Change group photo
            </Button>

            <input
              hidden
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
            />

            <AlertMessage
              isOpen={isAlertOpen}
              setIsOpen={setIsAlertOpen}
              text={alertText}
              isError
            />
          </>
        )}

        <Button
          onClick={() => {
            setIsOpen(false)
            setMediaViewOpen(true)
          }}
        >
          <FiFile style={{ fontSize: '1.3rem', marginRight: '10px' }} /> View
          images & files
        </Button>

        {conversation.users.length > 2 && (
          <Button onClick={() => leaveGroup()}>
            <FiLogOut style={{ fontSize: '1.25rem', marginRight: '10px' }} />{' '}
            Leave group
          </Button>
        )}
      </Container>
    </Dialog>
  )
}
