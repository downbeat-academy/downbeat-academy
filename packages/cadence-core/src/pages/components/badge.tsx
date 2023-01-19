import { Flex, Text, Badge } from '../../components'

export default function BadgePage() {
  return (
    <Flex direction='column'>
      <Text tag='h1' size='6x-large' category='headline'>Badge</Text>
      <Flex direction='column' gap='base'>
        <Text category='headline' size='5x-large' tag='h2'>Type</Text>
        <Badge text='Neutral badge' type='neutral' />
        <Badge text='Positive badge' type='positive' />
        <Badge text='Informational badge' type='informational' />
        <Badge text='Warning badge' type='warning' />
        <Badge text='Critical badge' type='critical' />
      </Flex>
      <Flex direction='column' gap='base'>
        <Text category='headline' size='5x-large' tag='h2'>Size</Text>
        <Badge text='Small badge' type='informational' size='small' />
        <Badge text='Default badge' type='informational' size='default' />
        <Badge text='Large badge' type='informational' size='large' />
      </Flex>
      <Flex direction='column' gap='base'>
        <Text category='headline' size='5x-large' tag='h2'>Style</Text>
        <Badge text='Filled badge' type='informational' style='fill' />
        <Badge text='Inverse badge' type='informational' style='inverse' />
        <Badge text='Outline badge' type='informational' style='outline' />
      </Flex>
    </Flex>
  )
}