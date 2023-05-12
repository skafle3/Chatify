/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChangeEvent, ClipboardEventHandler, FormEvent } from 'react'

import { Icon } from '@iconify/react'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useEffect, useRef, useState } from 'react'
import { BsFillReplyFill } from 'react-icons/bs'
import { FiX } from 'react-icons/fi'
import { ImAttachment } from 'react-icons/im'
import { RiImageAddFill } from 'react-icons/ri'
import { useParams } from 'react-router-dom'

import { MiniSpinner } from '../..'
import {
  firebaseDb,
  firebaseStorage,
  formatFileName,
  useUserStore,
} from '../../../library'
import { AlertMessage } from '../../Alert/Alert'
import { CloseButton } from '../../Group/style'
import {
  Container,
  Form,
  ImageButton,
  FileButton,
  InputWrapper,
  Input,
  SendButton,
  DragFile,
  Title,
  ReplyContainer,
  ReplyTitle,
  ReplyText,
  Text,
} from './style'

type InputHeaderProps = {
  replyInfo: any
  setReplyInfo: React.Dispatch<React.SetStateAction<null>>
  setInputSectionOffset: React.Dispatch<React.SetStateAction<number>>
}
export function InputSection({
  replyInfo,
  setReplyInfo,
  setInputSectionOffset,
}: InputHeaderProps) {
  const [inputValue, setInputValue] = useState('')

  const [fileUploading, setFileUploading] = useState(false)

  const [previewFiles, setPreviewFiles] = useState<string[]>([])

  const [isAlertOpened, setIsAlertOpened] = useState(false)
  const [alertText, setAlertText] = useState('')

  const currentUser = useUserStore((state) => state.currentUser)
  const { id: conversationId } = useParams()

  const textInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [fileDragging, setFileDragging] = useState(false)

  const updateTimestamp = () => {
    updateDoc(doc(firebaseDb, 'conversations', conversationId as string), {
      updatedAt: serverTimestamp(),
    })
  }

  useEffect(() => {
    const handler = () => {
      textInputRef.current?.focus()
    }
    window.addEventListener('focus', handler)
    return () => window.removeEventListener('focus', handler)
  }, [])

  useEffect(() => {
    textInputRef.current?.focus()
  }, [conversationId])

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (previewFiles.length > 0) {
      setPreviewFiles([])
      for (let i = 0; i < previewFiles.length; i++) {
        const url = previewFiles[i]
        const res = await fetch(url)
        const blob = await res.blob()
        const file = new File([blob], 'image.png', {
          type: res.headers.get('content-type') as string,
        })
        await uploadFile(file)
      }
    } else {
      if (fileUploading) return
    }

    if (!inputValue.trim()) return

    setInputValue('')

    const replacedInputValue = ` ${inputValue} `

    setReplyInfo && setReplyInfo(null)

    addDoc(
      collection(
        firebaseDb,
        'conversations',
        conversationId as string,
        'messages'
      ),
      {
        sender: currentUser?.uid,
        content: replacedInputValue.trim(),
        type: 'text',
        createdAt: serverTimestamp(),
        replyTo: replyInfo?.id || null,
      }
    )

    updateTimestamp()
  }

  const uploadFile = async (file: File) => {
    try {
      const TWENTY_MB = 1024 * 1024 * 20

      if (file.size > TWENTY_MB) {
        setAlertText('Max file size is 20MB')
        setIsAlertOpened(true)
        return
      }

      setFileUploading(true)

      const fileReference = ref(firebaseStorage, formatFileName(file.name))

      await uploadBytes(fileReference, file)

      const downloadURL = await getDownloadURL(fileReference)

      addDoc(
        collection(
          firebaseDb,
          'conversations',
          conversationId as string,
          'messages'
        ),
        {
          sender: currentUser?.uid,
          content: downloadURL,
          type: file.type.startsWith('image') ? 'image' : 'file',
          file: file.type.startsWith('image')
            ? null
            : {
                name: file.name,
                size: file.size,
              },
          createdAt: serverTimestamp(),
        }
      )

      setFileUploading(false)
      updateTimestamp()
    } catch (error) {
      console.log(error)
      setFileUploading(false)
    }
  }

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    uploadFile(file)
  }

  useEffect(() => {
    if (!setInputSectionOffset) return
    if (previewFiles.length > 0) return setInputSectionOffset(128)

    if (replyInfo) return setInputSectionOffset(76)

    setInputSectionOffset(0)
  }, [previewFiles.length, replyInfo])

  const handlePaste: ClipboardEventHandler<HTMLInputElement> = (event) => {
    const file = event?.clipboardData?.files?.[0]
    if (!file || !file.type.startsWith('image')) return

    const url = URL.createObjectURL(file)

    setPreviewFiles([...previewFiles, url])
  }

  useEffect(() => {
    const dragBlurHandler = (event: any) => {
      event.preventDefault()
      event.stopPropagation()
      setFileDragging(false)
    }

    const dragFocusHandler = (event: any) => {
      event.preventDefault()
      event.stopPropagation()
      setFileDragging(true)
    }

    const dropFileHandler = async (event: any) => {
      event.preventDefault()
      event.stopPropagation()

      setFileDragging(false)

      const items = event.dataTransfer.items
      const files = event.dataTransfer.files

      const selectedFiles = []

      for (let i = 0, item; (item = items[i]); ++i) {
        const entry = item.webkitGetAsEntry()
        if (entry.isFile) {
          selectedFiles.push(files[i])
        }
      }

      for (let i = 0; i < selectedFiles.length; i++) {
        await uploadFile(selectedFiles[i])
      }
    }

    addEventListener('dragenter', dragFocusHandler)
    addEventListener('dragover', dragFocusHandler)
    addEventListener('dragleave', dragBlurHandler)
    addEventListener('drop', dropFileHandler)

    return () => {
      removeEventListener('dragenter', dragFocusHandler)
      removeEventListener('dragover', dragFocusHandler)
      removeEventListener('dragleave', dragBlurHandler)
      removeEventListener('drop', dropFileHandler)
    }
  }, [])
  return (
    <>
      {fileDragging && (
        <DragFile>
          <Title>Drop file to send</Title>
        </DragFile>
      )}

      {previewFiles.length === 0 && !!replyInfo && (
        <ReplyContainer>
          <div>
            <ReplyTitle>
              <BsFillReplyFill
                style={{
                  marginRight: '5px',
                  fontSize: '1.3rem',
                  color: '#24292f',
                }}
              />
              <p>
                Replying
                {currentUser?.uid === replyInfo.sender ? ' to yourself' : ''}
              </p>
            </ReplyTitle>
            {replyInfo.type === 'text' ? (
              <Text>{replyInfo.content}</Text>
            ) : replyInfo.type === 'image' ? (
              <ReplyText>An image</ReplyText>
            ) : replyInfo.type === 'file' ? (
              <ReplyText>A file</ReplyText>
            ) : (
              'Message has been removed'
            )}
          </div>

          <CloseButton onClick={() => setReplyInfo && setReplyInfo(null)}>
            <FiX style={{ fontSize: '1rem' }} />
          </CloseButton>
        </ReplyContainer>
      )}
      <Container>
        <ImageButton onClick={() => imageInputRef.current?.click()}>
          <RiImageAddFill />
        </ImageButton>
        <input
          ref={imageInputRef}
          hidden
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
        />
        <FileButton onClick={() => fileInputRef.current?.click()}>
          <ImAttachment />
        </FileButton>
        <input
          ref={fileInputRef}
          hidden
          className="hidden"
          type="file"
          onChange={handleFileInputChange}
        />

        <Form onSubmit={handleFormSubmit}>
          <InputWrapper>
            <Input
              maxLength={1000}
              ref={textInputRef}
              value={inputValue}
              onChange={(event) => {
                setInputValue(event.target.value)
              }}
              onPaste={handlePaste}
              type="text"
              placeholder="Message..."
            />
          </InputWrapper>
          {fileUploading ? (
            <SendButton>
              <MiniSpinner />
            </SendButton>
          ) : (
            <SendButton>
              <Icon icon="heroicons:paper-airplane-solid" />
            </SendButton>
          )}
        </Form>
      </Container>

      <AlertMessage
        isError
        text={alertText}
        isOpen={isAlertOpened}
        setIsOpen={setIsAlertOpened}
      />
    </>
  )
}
