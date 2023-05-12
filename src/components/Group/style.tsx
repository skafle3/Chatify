import styled from '@emotion/styled'

import { theme } from '../../styles/theme'

export const Header = styled.div`
  display: flex;
  padding: 20px 0;
  position: relative;
  align-items: center;
  justify-content: center;
`

export const Title = styled.h1`
  font-weight: 600;
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

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Button = styled.button`
  width: 150px;
  padding: 5px;
  font-size: 1rem;
  font-weight: 500;
  border-left: none;
  border-right: none;
  color: ${theme.DarkGrey};
  transition: all 0.2s ease;
  justify-content: space-between;
  border-top: 1px solid ${theme.Border};
  border-bottom: 1px solid ${theme.Border};
  :nth-of-type(2) {
    border-right: 1px solid ${theme.Border};
    border-left: 1px solid ${theme.Border};
  }
  :hover {
    background-color: #f3f8ff;
  }
  @media screen and (max-width: 390px) {
    font-size: 0.85rem;
  }
`
