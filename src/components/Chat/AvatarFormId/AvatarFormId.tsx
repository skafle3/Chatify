import { Skeleton } from '@mui/material'

import { useUsersInfo } from '../../../hooks'
import { DEFAULT_AVATAR, IMAGE_PROXY } from '../../../library'
import { Image } from './style'

type AvatarFromIdProps = {
  uid: string
  size?: number
}

const AvatarFromId = ({ uid, size = 20 }: AvatarFromIdProps) => {
  const { data, loading, error } = useUsersInfo([uid])

  if (loading) return <Skeleton variant="circular" width={20} height={20} />
  if (error)
    return <img src={DEFAULT_AVATAR} style={{ width: size, height: size }} />

  return (
    <Image
      title={data?.[0].data()?.displayName}
      style={{ width: size, height: size }}
      src={IMAGE_PROXY(data?.[0].data()?.photoURL)}
    ></Image>
  )
}

export default AvatarFromId
