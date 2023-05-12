import styled from '@emotion/styled'

import { theme } from '../../../styles/theme'

export const Header = styled.div`
  display: flex;
  padding: 20px 20px 0px 20px;
  position: relative;
  align-items: center;
  justify-content: center;
`

export const Title = styled.h1`
  text-align: center;
  width: 340px;
  font-weight: 600;
  padding-bottom: 15px;
  border-bottom: 1px solid ${theme.Border};
  font-size: calc(20 / 16 * 1rem);
  @media screen and (max-width: 390px) {
    font-size: calc(18 / 16 * 1rem);
  }
`

export const CloseButton = styled.button`
  top: 10px;
  right: 10px;
  border: none;
  font-size: 0.9rem;
  position: absolute;
  background-color: transparent;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 10px 0;
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  font-size: 1rem;
  border-radius: 4px;
  background-color: transparent;
  margin: 5px 10px;
  padding: 10px;
  border: none;
  transition: all 0.2s ease;
  :hover {
    background-color: ${theme.Border};
  }
`

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const NameInput = styled.input`
  border-radius: 4px;
  border: none;
  max-width: 260px;
  margin-right: 5px;
  font-weight: 500;
  padding: 6px 12px;
  background-color: ${theme.Border};
`

export const NameButton = styled.button`
  color: ${theme.White};
  font-size: 0.8rem;
  border-radius: 4px;
  border: none;
  margin-right: 5px;
  font-weight: 500;
  padding: 7px 12px;
  background-color: ${theme.PrimaryBlue};
`
