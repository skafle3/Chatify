import type {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
} from 'firebase/firestore'

import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache: { [key: string]: any } = {}

export const useDocumentQuery = (
  key: string,
  document: DocumentReference<DocumentData>
) => {
  const [data, setData] = useState<DocumentSnapshot<DocumentData> | null>(
    cache[key] || null
  )
  const [loading, setLoading] = useState(!data)
  const [error, setError] = useState(false)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      document,
      (snapshot) => {
        setData(snapshot)
        setLoading(false)
      },
      (err) => {
        console.log(err)
        setData(null)
        setLoading(false)
        setError(true)
      }
    )

    return () => {
      unsubscribe()
    }
  }, [key])

  return { loading, error, data }
}
