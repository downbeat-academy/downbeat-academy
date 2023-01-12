import { Flex, Text, Button, ButtonSet } from '../../components'

export default function ButtonSetPage() {
  return (
    <Flex direction='column'>
      <Text tag='h1' fontType='expressive-headline' size='6x-large'>Button Set</Text>
      <ButtonSet direction='row'>
        <Button variant='primary' text='Primary button' />
        <Button variant='secondary' text='Secondary button' />
      </ButtonSet>
    </Flex>
  )
}