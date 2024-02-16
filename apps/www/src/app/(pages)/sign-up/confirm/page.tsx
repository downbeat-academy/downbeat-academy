import { Text } from '@components/text'
import { Wrapper } from '@components/auth'

export default async function AccountPage() {

  return (
    <Wrapper>
      <Text
        tag='p'
        type='expressive-body'
        size='body-base'
        color='primary'
        collapse
      >Check your email to confirm your account.</Text>
    </Wrapper>
  )
}