import styled from '@emotion/styled'

import { theme } from '../../../styles/theme'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Title = styled.h1`
  width: 330px;
  padding: 15px 0;
  font-weight: 600;
  text-align: center;
  color: ${theme.Black};
  font-size: calc(20 / 16 * 1rem);
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

export const User = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
`

export const Image = styled.img`
  width: 40px;
  margin-right: 10px;
  border-radius: 50%;
`
export const Name = styled.p`
  font-weight: 500;
`

export const Wrapper = styled.div`
  display: flex;
  padding: 0 15px;
  justify-content: space-between;
`
