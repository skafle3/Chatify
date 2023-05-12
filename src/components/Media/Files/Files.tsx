import { Icon } from '@iconify/react'
import { collection, orderBy, where, query } from 'firebase/firestore'
import { useParams } from 'react-router-dom'

import { useCollectionQuery } from '../../../hooks'
import { firebaseDb, formatFileSize } from '../../../library'
import { MiniSpinner } from '../../MiniSpinner/MiniSpinner'
import {
  FileName,
  Info,
  Wrapper,
  Container,
  FileSize,
  FileWrapper,
} from '../style'
import FileIcon from './FileIcon'

export function Files() {
  const { id: conversationId } = useParams()

  const { data, loading, error } = useCollectionQuery(
    `files-${conversationId}`,
    query(
      collection(
        firebaseDb,
        'conversations',
        conversationId as string,
        'messages'
      ),
      where('type', '==', 'file'),
      orderBy('createdAt', 'desc')
    )
  )

  if (loading || error) return <MiniSpinner />

  if (data?.empty) return <Info>No file found</Info>

  return (
    <Container>
      {data?.docs.map((file) => (
        <Wrapper key={file.id}>
          <FileWrapper>
            <FileIcon
              extension={file.data().file.name.split('.').slice(-1)[0]}
            />
            <div>
              <FileName>{file.data()?.file?.name}</FileName>
              <FileSize>{formatFileSize(file.data()?.file?.size)}</FileSize>
            </div>
          </FileWrapper>
          <a
            href={file.data().content}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              icon="ic:baseline-download"
              style={{
                fontSize: '1.4rem',
                color: '#4b5563',
              }}
            />
          </a>
        </Wrapper>
      ))}
    </Container>
  )
}
