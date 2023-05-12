import { onAuthStateChanged } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { PrivateRoute, Spinner } from './components'
import { firebaseAuth, firebaseDb, useUserStore } from './library/index'
import { Chat, Home, SignIn } from './pages'

export function App() {
  const currentUser = useUserStore((state) => state.currentUser)
  const setCurrentUser = useUserStore((state) => state.setCurrentUser)

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setCurrentUser(user)
        setDoc(doc(firebaseDb, `users/${user.uid}`), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber || user.providerData?.[0]?.phoneNumber,
        })
      } else setCurrentUser(null)
    })
  }, [])

  if (typeof currentUser === 'undefined') return <Spinner />

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route path="/sign-in" element={<SignIn />} />

        <Route
          path=":id"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}
