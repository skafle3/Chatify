import { collection, query, where, orderBy } from 'firebase/firestore'
import { useParams } from 'react-router-dom'

import { useCollectionQuery } from '../../../hooks'
import { firebaseDb } from '../../../library'
import { MiniSpinner } from '../../MiniSpinner/MiniSpinner'
import { Info, Image, Grid } from '../style'

export function ImageItem() {
  const { id: conversationId } = useParams()

  const { data, loading, error } = useCollectionQuery(
    `images-${conversationId}`,
    query(
      collection(
        firebaseDb,
        'conversations',
        conversationId as string,
        'messages'
      ),
      where('type', '==', 'image'),
      orderBy('createdAt', 'desc')
    )
  )

  if (loading || error)
    return (
      <div className="flex h-80 items-center justify-center">
        <MiniSpinner />
      </div>
    )

  if (data?.empty) return <Info className="text-center">No image found</Info>

  return (
    <Grid>
      {data?.docs.map((image) => (
        <Image key={image.id} src={image.data().content} />
      ))}
    </Grid>
  )
}
