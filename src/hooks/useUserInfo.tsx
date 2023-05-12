/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DocumentData, DocumentSnapshot } from 'firebase/firestore'

import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { firebaseDb } from '../library'

const cache: { [key: string]: any } = {}

export const useUsersInfo = (userIds: string[]) => {
  const [data, setData] = useState<DocumentSnapshot<DocumentData>[] | null>(
    userIds.every((id) => cache[id]) ? userIds.map((id) => cache[id]) : null
  )
  const [loading, setLoading] = useState(!data)
  const [error, setError] = useState(false)

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(async () => {
        const response = await Promise.all(
          userIds.map(async (id) => {
            if (cache[id]) return cache[id]
            const res = await getDoc(doc(firebaseDb, 'users', id))
            cache[id] = res
            return res
          })
        )

        setData(response)
        setLoading(false)
        setError(false)
      })()
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError(true)
    }
  }, [JSON.stringify(userIds)])

  return { data, loading, error }
}
