import { Sidebar } from '../../components'
import { Wrapper, HomeWrapper, Text, Image } from './style'

export function Home() {
  return (
    <Wrapper>
      <Sidebar />
      <HomeWrapper>
        <Image src="startChating.jpg" />
        <Text>Select a conversation to start chatting.</Text>
      </HomeWrapper>
    </Wrapper>
  )
}
