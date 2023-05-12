import styled from '@emotion/styled'

import { theme } from '../../../styles/theme'

export const Container = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 565px) {
    flex-direction: column;
    text-align: center;
  }
`

export const Wrapper = styled.div`
  padding: 15px;
`
export const Title = styled.h1`
  padding: 15px 0;
  font-size: calc(20 / 16 * 1rem);
  font-weight: 600;
  text-align: center;
  color: ${theme.Black};
  border-bottom: 1px solid ${theme.Border};
`

export const CloseButton = styled.button`
  top: 6px;
  right: 8px;
  border: none;
  font-size: 1rem;
  position: absolute;
  background-color: transparent;
`

export const Image = styled.img`
  border-radius: 50%;
  width: 80px;
`

export const Thick = styled.span`
  font-weight: 600;
  padding-right: 5px;
`

export const Text = styled.p`
  line-height: 2;
  @media screen and (max-width: 565px) {
    font-size: 0.9rem;
  }
`

export const Info = styled.p`
  margin: 0 auto;
  padding: 0 20px 20px;
  text-align: center;
  color: ${theme.LightGrey};
  font-size: 0.9rem;
  width: 100%;
  @media screen and (max-width: 565px) {
    font-size: 0.9rem;
  }
`
