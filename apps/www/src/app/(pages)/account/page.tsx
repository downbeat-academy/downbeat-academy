import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Button } from '@components/button'
import { Text } from '@components/text'
import { Form } from '@components/form'
import { logout } from '@actions/auth/logout'

import { createClient } from '@lib/supabase/supabase.server'

export default async function AccountPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  console.log(data)

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
      <Text
        tag='p'
        type='expressive-body'
        size='body-base'
        color='primary'
      >{data.user.email}</Text>
      <Form>
        <Button href='/logout' text='Log out' />
      </Form>
    </SectionContainer>
  )
}