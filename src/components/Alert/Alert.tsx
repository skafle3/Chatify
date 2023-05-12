import Alert from '@mui/material/Alert'
import { useEffect } from 'react'

import { Error } from './style'

type AlertProps = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  text: string
  isError?: boolean
  duration?: number
}

export const AlertMessage = ({
  isOpen,
  setIsOpen,
  text,
  duration = 3000,
}: AlertProps) => {
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
          <Alert severity="error">{text}</Alert>{' '}
        </Error>
      ) : (
        ''
      )}
    </>
  )
}
