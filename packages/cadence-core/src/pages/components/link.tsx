import { Flex, InlineLink, Text } from "../../components";

export default function LinkPage() {
  return (
    <Flex gap='base' direction='column' padding='large'>
      <Text size='base' category='body' tag='p' collapse><InlineLink href='https://google.com' type='interactive'>Primary link</InlineLink></Text>
      <Text size='base' category='body' tag='p' collapse><InlineLink href='https://google.com' type='primary'>Primary link</InlineLink></Text>
      <Text size='base' category='body' tag='p' collapse><InlineLink href='https://google.com' type='secondary'>Secondary link</InlineLink></Text>
    </Flex>
  )
}

