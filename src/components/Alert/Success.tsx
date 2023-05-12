import Alert from '@mui/material/Alert'
import { useEffect } from 'react'

import { Error } from './style'

type SuccessProps = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  text: string
  duration?: number
}

export const SuccessMessage = ({
  isOpen,
  setIsOpen,
  text,
  duration = 3000,
}: SuccessProps) => {
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false)
      }, duration)
    }
  }, [isOpen])

  return (
    <>
      {isOpen ? (
        <Error>
          <Alert severity="success">{text}</Alert>{' '}
        </Error>
      ) : (
        ''
      )}
    </>
  )
}
