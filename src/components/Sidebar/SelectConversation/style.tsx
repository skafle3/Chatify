import styled from '@emotion/styled'

import { theme } from '../../../styles/theme'

export const Flex = styled.div`
  display: flex;
  height: 100px;
  padding: 15px;
  align-items: center;
  position: relative;
  border-bottom: 1px dotted ${theme.BorderHover};
`

export const Image = styled.img`
  width: 65px;
  border-radius: 50%;
  margin-right: 10px;
`

export const Name = styled.p`
  font-weight: 500;
  color: ${theme.Black};
`

export const LastMessage = styled.p`
  color: ${theme.LightGrey};
  font-size: calc(14 / 16 * 1rem);
`

export const Notify = styled.div`
  right: 20px;
  font-size: 0.5rem;
  color: ${theme.PrimaryBlue};
  position: absolute;
`

export const Relative = styled.div`
  margin: 0 30px;
  position: relative;
  padding-right: 15px;
`

export const ImagePrimary = styled.img`
  top: -6px;
  left: -40px;
  z-index: 2;
  width: 40px;
  padding: 1px;
  display: flex;
  border-radius: 50%;
  position: absolute;
  align-items: center;
  margin: 0 10px 2px 10px;
  border: double 1px transparent;
  background-clip: content-box, border-box;
`
export const ImageSecondary = styled.img`
  top: -30px;
  left: -13px;
  width: 45px;
  border-radius: 50%;
  position: absolute;
`
