import { Text, Flex } from '../../components'
import { Link } from 'react-router-dom'

export default function ComponentsPage() {
  return (
    <Flex direction='column'>
      <Text tag='h1' fontType='expressive-headline' size='6x-large' type='expressive'>Components</Text>
      <Link to='/components/avatar'>Avatar</Link>
      <Link to='/components/badge'>Badge</Link>
      <Link to='/components/button'>Button</Link>
      <Link to='/components/button-set'>Button set</Link>
      <Link to='/components/logo'>Logo</Link>
      <Link to='/components/text'>Text</Link>
    </Flex>
  )
}