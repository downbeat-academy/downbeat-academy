import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text } from '@components/text'

export default async function AccountPage() {

  return (
    <SectionContainer>
      <SectionTitle
        title={
          <Text
            type='expressive-headline'
            size='h1'
            color='brand'
            collapse
          >Confirm</Text>
        }
        background='primary'
      />
      <Text
        tag='p'
        type='expressive-body'
        size='body-base'
        color='primary'
      >Check your email to confirm your account.</Text>
    </SectionContainer>
  )
}