import { Text, Flex, Divider } from '../../components'

export default function DividerPage() {
  return (
    <Flex direction='column' gap='base' align='start'>
      <Text tag='h1' type='expressive' category='headline' size='6x-large'>Divider</Text>
      <Divider
        width='small'
        align='left'
        thickness='large'
        color='interactive'
      />
    </Flex>
  )
}