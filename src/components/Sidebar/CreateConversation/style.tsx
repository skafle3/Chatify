import styled from '@emotion/styled'

import { theme } from '../../../styles/theme'

export const Container = styled.div`
  position: relative;
`

export const Error = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: ${theme.LightGrey};
`
export const Text = styled.p`
  font-size: calc(18 / 16 * 1rem);
`

export const Users = styled.div`
  display: flex;
  max-height: 300px;
  overflow-y: scroll;
  flex-direction: column;
  /* border-bottom: 1px solid ${theme.BorderHover}; */
`

export const Title = styled.h1`
  padding: 20px;
  font-weight: 600;
  text-align: center;
  font-size: calc(20 / 16 * 1rem);
  border-bottom: 1px solid ${theme.BorderHover};
`

export const User = styled.div`
  width: 350px;
  display: flex;
  padding: 15px;
  height: 80px;
  cursor: pointer;
  align-items: center;
  transition: all 0.2s ease;
  border-bottom: 1px dotted ${theme.BorderHover};

  :hover {
    background-color: ${theme.Border};
  }
`

export const Image = styled.img`
  width: 40px;
  border-radius: 50%;
  margin: 0 10px 0 15px;
`

export const Name = styled.p`
  font-size: 1rem;
`

export const Wrapper = styled.p`
  display: flex;
  padding: 15px;
  justify-content: end;
`

export const Button = styled.button`
  border: none;
  font-weight: 500;
  padding: 8px 10px;
  font-size: 0.9rem;
  border-radius: 4px;
  color: ${theme.White};
  background-color: ${theme.PrimaryBlue};
  transition: all 0.2s ease;
  :hover {
    background-color: #3b7be3;
  }
`
