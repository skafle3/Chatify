import styled from '@emotion/styled'

import { theme } from '../../../styles/theme'

export const Header = styled.div`
  height: 80px;
  display: flex;
  padding: 0 20px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${theme.BorderHover};
  background-color: ${theme.White};

  @media screen and (max-width: 768px) {
    padding: 0 15px;
  }
`
export const Name = styled.p`
  font-weight: 500;
  margin-left: 15px;
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

export const SingleImage = styled.img`
  width: 40px;
  border-radius: 50%;
`
export const Relative = styled.div`
  margin: 0 15px;
  position: relative;
  padding-right: 10px;
`

export const ImagePrimary = styled.img`
  top: -5px;
  left: -30px;
  z-index: 2;
  width: 30px;
  padding: 1px;
  display: flex;
  border-radius: 50%;
  position: absolute;
  align-items: center;
  margin: 0 10px 2px 10px;
  border: double 1px transparent;
  background-clip: content-box, border-box;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at 20% 107%, #fff 0%, #fff 60%);
`
export const ImageSecondary = styled.img`
  top: -19px;
  left: -8px;
  width: 30px;
  border-radius: 50%;
  position: absolute;
`

export const SettingButton = styled.button`
  border: none;
  display: flex;
  font-size: 1.5rem;
  margin-left: 30px;
  color: ${theme.DarkGrey};
  background-color: transparent;
`

export const GroupButton = styled.button`
  border: none;
  display: flex;
  font-size: 2rem;
  margin-left: 30px;
  color: ${theme.DarkGrey};
  background-color: transparent;
`
