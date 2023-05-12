import styled from '@emotion/styled'

import { theme } from '../../../styles/theme'

export const Container = styled.div`
  display: flex;
  padding: 15px 20px;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${theme.Border};
  background-color: ${theme.White};
`

export const Form = styled.form`
  gap: 1;
  flex-grow: 1;
  display: flex;
  align-items: stretch;
`

export const ImageButton = styled.button`
  border: none;
  display: flex;
  font-size: 1.5rem;
  align-items: center;
  background: transparent;
  color: ${theme.DarkGrey};
`

export const FileButton = styled.button`
  border: none;
  display: flex;
  padding: 0 15px;
  font-size: 1.3rem;
  align-items: center;
  background: transparent;
  color: ${theme.DarkGrey};
`

export const InputWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  position: relative;
  align-items: center;
`

export const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 5px 15px;
  border-radius: 30px;
  background-color: ${theme.Border};
  border: 1px solid ${theme.BorderHover};

  ::placeholder {
    color: ${theme.DarkGrey};
  }
`

export const SendButton = styled.button`
  border: none;
  display: flex;
  font-size: 1.6rem;
  padding-left: 10px;
  align-items: center;
  background: transparent;
  color: ${theme.DarkGrey};
`

export const DragFile = styled.div`
  z-index: 20;
  width: 100vh;
  display: flex;
  height: 100vh;
  position: fixed;
  user-select: none;
  align-items: center;
  pointer-events: none;
  justify-content: center;
  transition: all 0.2s ease;

  background-color: #3333331b;
`

export const Title = styled.div`
  z-index: 30;
  color: ${theme.Black};
  font-size: calc(30 / 16 * 1rem);
`

// Reply

export const ReplyContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  padding: 15px 30px;
  justify-content: space-between;
  border-top: 1px solid ${theme.Border};
`

export const CloseButton = styled.button`
  top: 10px;
  right: 10px;
  border: none;
  position: absolute;
  color: ${theme.DarkGrey};
  background-color: transparent;
`

export const ReplyTitle = styled.div`
  display: flex;
  font-weight: 500;
`

export const ReplyText = styled.p`
  color: ${theme.DarkGrey};
`

export const Text = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${theme.DarkGrey};
  max-width: calc(100vw - 420px);

  @media screen and (max-width: 768px) {
    max-width: calc(100vw - 65px);
  }
`
