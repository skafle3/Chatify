import styled from '@emotion/styled'

import { theme } from '../../styles/theme'

export const Text = styled.p`
  color: ${theme.DarkGrey};
  font-size: calc(18 / 16 * 1rem);
`

export const Image = styled.img`
  width: 400px;
  height:350px;
  margin-bottom: 10px;
  border-radius:20px;
`

export const Wrapper = styled.div`
  display: flex;
`

export const HomeWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  height: 100vh;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #cdd3e0;

  @media screen and (max-width: 768px) {
    display: none;
  }
`
