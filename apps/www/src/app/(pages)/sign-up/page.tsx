import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  Label,
  Input,
  FormField,
  Form,
} from '@components/form'
import { Button, ButtonWrapper } from '@components/button'
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
  )
}