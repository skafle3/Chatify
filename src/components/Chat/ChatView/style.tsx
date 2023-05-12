import styled from '@emotion/styled'

import { theme } from '../../../styles/theme'

export const Grow = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: ${theme.OffWhite};
`

export const Text = styled.p`
  color: ${theme.DarkGrey};
  font-size: calc(18 / 16 * 1rem);
  @media screen and (max-width: 440px) {
    font-size: 1rem;
  }
`

export const Image = styled.img`
  width: 90px;
  margin-bottom: 20px;
  @media screen and (max-width: 440px) {
    width: 80px;
  }
`

export const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  height: 100vh;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

export const MiniWrapper = styled.div`
  gap: 1px;
  padding: 0 8px;
  display: flex;
  justify-content: end;
`
