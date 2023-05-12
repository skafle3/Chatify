import styled from '@emotion/styled'

import { theme } from '../../styles/theme'

export const Wrapper = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

export const ChatWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100vh;
  align-items: stretch;
  flex-direction: column;
  background-color: ${theme.OffWhite};
`

export const Error = styled.div`
  flex-grow: 1;
  display: flex;
  height: 100vh;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: ${theme.DarkGrey};
`

export const Text = styled.p`
  font-size: calc(18 / 16 * 1rem);
`

export const Image = styled.img`
  width: 90px;
  margin-bottom: 20px;
`

export const Line = styled.div`
  height: 80px;
  border-bottom: 1px solid ${theme.Border};
`

export const Grow = styled.div`
  flex-grow: 1;
`

export const MobileHide = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`
