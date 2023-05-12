import { Dialog } from '@mui/material'
import { useState } from 'react'
import { FiX } from 'react-icons/fi'

import '../../styles/index.css'
import { Files } from './Files/Files'
import { ImageItem } from './Image/Images'
import { Button, Buttons, CloseButton, Header, Title } from './style'

type ViewMediaProps = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}
export function ViewMedia({ setIsOpen, isOpen }: ViewMediaProps) {
  enum Sections {
    images,
    files,
  }
  const [selectedSection, setSelectedSection] = useState(Sections.images)

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <div onClick={(event) => event.stopPropagation()}>
        <Header>
          <Title>View images and files</Title>
          <CloseButton onClick={handleClose}>
            <FiX />
          </CloseButton>
        </Header>

        <Buttons>
          <Button
            onClick={() => setSelectedSection(Sections.images)}
            className={
              selectedSection === Sections.files
                ? 'not-active-button'
                : 'active-button'
            }
          >
            Images
          </Button>
          <Button
            onClick={() => setSelectedSection(Sections.files)}
            className={
              selectedSection === Sections.files
                ? 'active-button'
                : 'not-active-button'
            }
          >
            Files
          </Button>
        </Buttons>
      </div>

      {selectedSection === Sections.images ? (
        <ImageItem />
      ) : selectedSection === Sections.files ? (
        <Files />
      ) : (
        <></>
      )}
    </Dialog>
  )
}
