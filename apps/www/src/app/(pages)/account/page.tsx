import { redirect } from 'next/navigation'
import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text } from '@components/text'
import { Flex } from '@components/flex'
import { Separator } from '@components/separator'
import { readUserSession } from '@actions/auth/read-user-session'
import { getProfile } from '@actions/profile/get-profile'

import { UpdateLogin } from './update-login'
import { ProfileSettings } from './update-profile'

export default async function AccountPage() {

  const { data: accountData, error } = await readUserSession()

  if (error || !accountData?.user) {
    redirect('/login')
  }

  const { data: profileData } = await getProfile()

  // console.log(profileData)

  const hasFirstName = profileData[0]?.first_name ? profileData[0].first_name : 'Enter your first name'
  const hasLastName = profileData[0]?.last_name ? profileData[0].last_name : 'Enter your last name'

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
        gap='3x-large'
        padding='x-large'
        tag='section'
      >
        <Text
          tag='p'
          type='expressive-body'
          size='body-base'
          color='primary'
          collapse
        >
          We&apos;re working on new account features, check back soon to get the latest updates.
        </Text>
        <Separator />
        <UpdateLogin email={accountData.user.email} />
        <Separator />
        <ProfileSettings
          firstName={hasFirstName}
          lastName={hasLastName}
        />
      </Flex>
    </SectionContainer>
  )
}