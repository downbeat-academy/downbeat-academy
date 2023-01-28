import { Text, Flex, Blockquote } from '../../components'

export default function BlockQuotePage() {
  return (
    <Flex direction='column' gap='base'>
      <Text tag='h1' size='6x-large' category='headline' type='expressive'>Blockquote</Text>
      <Blockquote source='Buzzfeed' attribution='Jory Tindall'>This is a quote</Blockquote>
    </Flex>
  )
}