import * as Card from '@components/card'
import { Text } from '@components/text'

export default async function HomePostGrid() {
  return (
    <Card.Root
      borderColor='faint'
    >
      <Card.Content>
        <Text type='expressive-headline' size='h4' collapse>Card headline</Text>
        <Text type='expressive-body' size='body-small' collapse>Lorem ipsum dolor sit amet.</Text>
      </Card.Content>
    </Card.Root>
  )
}

export { HomePostGrid }