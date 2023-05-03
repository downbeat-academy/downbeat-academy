import { Text, Flex, List } from '../../components'

export default function ListPage() {
  return (
    <Flex
      direction='column'
      gap='base'
    >
      <Text tag='h1' size='6x-large' category='headline' type='expressive'>List</Text>
      <List listType='ol' context='expressive'>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </List>
      <List listType='ul' context='expressive'>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </List>
      <List listType='ol' context='productive'>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </List>
      <List listType='ul' context='productive'>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </List>
    </Flex>
  )
}