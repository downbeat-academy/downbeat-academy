import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  Label,
  Input,
  FormField,
  Form,
} from '@components/form'
import { Button, ButtonWrapper } from '@components/button'
import { Wrapper } from '@components/auth/wrapper'
import { Text } from '@components/text'
import { Link } from '@components/link'
import { signup } from '@actions/auth/signup'

import { createClient } from '@lib/supabase/supabase.server'

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
      <Form>
        <FormField>
          <Label htmlFor="email">Email</Label>
          <Input type='email' id='email' name='email' />
        </FormField>
        <FormField>
          <Label htmlFor="password">Password</Label>
          <Input type='password' id='password' name='password' />
        </FormField>
        <ButtonWrapper>
          <Button formAction={signup} text='Sign up' />
        </ButtonWrapper>
      </Form>
    </Wrapper>
  )
}