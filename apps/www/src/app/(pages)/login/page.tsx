import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  Label,
  Input,
  FormField,
  Form,
} from '@components/form'
import { Button, ButtonWrapper } from '@components/button'
import { login } from '@actions/auth/login'
import { signup } from '@actions/auth/signup'

import { createClient } from '@lib/supabase/supabase.server'

export default async function LoginPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data } = await supabase.auth.getUser()

  if (data?.user) {
    redirect('/account')
  }

  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
    // <Form>
    //   <FormField>
    //     <Label htmlFor="email">Email</Label>
    //     <Input type='email' id='email' name='email' />
    //   </FormField>
    //   <FormField>
    //     <Label htmlFor="password">Password</Label>
    //     <Input type='password' id='password' name='password' />
    //   </FormField>
    //   <ButtonWrapper>
    //     <Button formAction={signup} text='Sign up' />
    //     <Button formAction={login} variant='secondary' text='Log in' />
    //   </ButtonWrapper>
    // </Form>
  )
}