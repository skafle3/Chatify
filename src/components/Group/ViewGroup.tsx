import type { ConversationInfo } from '../../library'

import { Dialog } from '@mui/material'
import { useState } from 'react'
import { FiX } from 'react-icons/fi'

import { AddMembers } from './AddMembers/AddMembers'
import { Admin } from './Admin/Admin'
import { Members } from './Members/Members'
import { Buttons, Button, CloseButton, Header, Title } from './style'

import './style.css'

type ViewGroupProps = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  conversation: ConversationInfo
}

export function ViewGroup({ isOpen, setIsOpen, conversation }: ViewGroupProps) {
  enum Sections {
    members,
    admins,
    addMembers,
  }
  const [selectedSection, setSelectedSection] = useState(Sections.members)
  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <div onClick={(event) => event.stopPropagation()}>
        <Header>
          <Title>Group Members</Title>
          <CloseButton onClick={() => setIsOpen(false)}>
            <FiX />
          </CloseButton>
        </Header>

        <Buttons>
          <Button
            onClick={() => setSelectedSection(Sections.members)}
            className={
              selectedSection === Sections.members
                ? 'active-button'
                : 'not-active-button'
            }
          >
            Members
          </Button>
          <Button
            onClick={() => setSelectedSection(Sections.admins)}
            className={
              selectedSection === Sections.admins
                ? 'active-button'
                : 'not-active-button'
            }
          >
            Admins
          </Button>
          <Button
            onClick={() => setSelectedSection(Sections.addMembers)}
            className={
              selectedSection === Sections.addMembers
                ? 'active-button'
                : 'not-active-button'
            }
          >
            Add members
          </Button>
        </Buttons>
        {selectedSection === Sections.members ? (
          <Members conversation={conversation} />
        ) : selectedSection === Sections.admins ? (
          <Admin conversation={conversation} />
        ) : selectedSection === Sections.addMembers ? (
          <AddMembers conversations={conversation} />
        ) : (
          <></>
        )}
      </div>
    </Dialog>
  )
}
