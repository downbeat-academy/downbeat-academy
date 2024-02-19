import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Button } from '@components/button'
import { Text } from '@components/text'
import { Form } from '@components/form'
import { Flex } from '@components/flex'

import { createClient } from '@lib/supabase/supabase.server'

export default async function AccountPage() {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
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
        <Text
          tag='p'
          type='expressive-body'
          size='body-base'
          color='primary'
        ><strong>Email:</strong> {data.user.email}</Text>
        <Form>
          <Button href='/logout' text='Log out' />
        </Form>
      </Flex>
    </SectionContainer>
  )
}