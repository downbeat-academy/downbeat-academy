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
import { login } from '@actions/auth/login'

import { createClient } from '@lib/supabase/supabase.server'

export default async function LoginPage() {
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
      >Login to your Downbeat Academy account</Text>
      <Text
        type='productive-body'
        size='body-base'
        color='primary'
        tag='p'
      >
        Don't have an account? <Link href='/sign-up'>Sign up for free.</Link>
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
          <Button formAction={login} variant='primary' text='Log in' />
        </ButtonWrapper>
      </Form>
    </Wrapper>
  )
}