import { Text, Flex, Avatar, AvatarGroup } from '../../components'

export default function AvatarPage() {
  return (
    <Flex direction='column' gap='medium'>
      <Text
        tag='h1'
        type='expressive'
        category='headline'
        size='6x-large'
      >Avatar</Text>
      <Flex direction='column' gap='medium'>
        <Text
          tag='h2'
          type='expressive'
          category='headline'
          size='5x-large'
        >Size</Text>
        <Avatar size='small' />
        <Avatar size='medium' />
        <Avatar size='large' />
      </Flex>
      <Flex direction='column' gap='medium'>
        <Text
          tag='h2'
          type='expressive'
          category='headline'
          size='5x-large'
        >Avatar group</Text>
        <Flex direction='column' gap='small'>
          <Text
            tag='h2'
            type='expressive'
            category='headline'
            size='4x-large'
          >Avatar group</Text>
          <AvatarGroup
            direction='horizontal'
            overlap
            isInteractive
            avatars={[
              <Avatar size='medium' />,
              <Avatar size='medium' />,
              <Avatar size='medium' />
            ]} />
          <AvatarGroup
            direction='vertical'
            overlap
            isInteractive
            avatars={[
              <Avatar size='medium' />,
              <Avatar size='medium' />,
              <Avatar size='medium' />
            ]} />
        </Flex>
      </Flex>
    </Flex>
  )
}