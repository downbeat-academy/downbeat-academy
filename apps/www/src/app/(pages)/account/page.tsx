import { redirect } from 'next/navigation'
import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text } from '@components/text'
import { Flex } from '@components/flex'
import { readUserSession } from '@actions/auth/read-user-session'

import { UpdateEmailForm } from './components/update-email-form'
import { UpdatePasswordForm } from './components/update-password-form'
import { EditProfileForm } from './components/edit-profile-form'
import { LogoutForm } from './components/logout-form'

export default async function AccountPage() {

  const { data, error } = await readUserSession()

  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <SectionContainer>
      <SectionTitle
        title={
          <Text
            type='expressive-headline'
            size='h1'
            color='brand'
            collapse
          >Account</Text>
        }
        background='primary'
      />
      <Flex
        direction='column'
        gap='medium'
        padding='x-large'
      >
        <Text
          tag='p'
          type='expressive-body'
          size='body-base'
          color='primary'>
          We&apos;re working on new account features, check back soon to get the latest updates.
        </Text>
        <UpdateEmailForm email={data.user.email} />
        <UpdatePasswordForm />
        {/* <EditProfileForm /> */}
        {/* <LogoutForm /> */}
      </Flex>
    </SectionContainer>
  )
}