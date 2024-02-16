import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Wrapper } from '@components/auth/wrapper'
import { Text } from '@components/text'
import { Link } from '@components/link'

import { createClient } from '@lib/supabase/supabase.server'
import { SignUpForm } from './sign-up-form'

export default async function SignUpPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data } = await supabase.auth.getUser()

  if (data?.user) {
    redirect('/account')
  }

  return (
    <Wrapper>
      <Text
        type='expressive-headline'
        size='h4'
        tag='h1'
        color='brand'
      >Create a free Downbeat Academy account</Text>
      <Text
        type='productive-body'
        size='body-base'
        color='primary'
        tag='p'
      >
        <Link href='/login'>Login</Link> if you already have an account.
      </Text>
      <SignUpForm />
    </Wrapper>
  )
}