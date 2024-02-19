import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Text } from '@components/text'
import * as Tabs from '@components/tabs'
import { createClient } from '@lib/supabase/supabase.server'
import s from './login.module.scss'

import type { Metadata } from 'next'

import { LoginForm } from './login-form'
import { SignUpForm } from './sign-up-form'

export const metadata: Metadata = {
  title: 'Login | Downbeat Academy',
  description: 'Login to your Downbeat Academy account.',
}


export default async function LoginPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data } = await supabase.auth.getUser()

  if (data?.user) {
    redirect('/account')
  }

  return (
    <section className={s['login--wrapper']}>
      <div className={s['login--wrapper-inner']}>
        <Tabs.Root defaultValue='Login'>
          <Tabs.List>
            <Tabs.Trigger value='Login'>Login</Tabs.Trigger>
            <Tabs.Trigger value='Sign up'>Sign up</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value='Login' className={s['login--content']}>
            <Text
              type='expressive-headline'
              size='h4'
              tag='h1'
              color='brand'
            >Login to your Downbeat Academy account</Text>
            <LoginForm />
          </Tabs.Content>
          <Tabs.Content value='Sign up' className={s['login--content']}>
            <Text
              type='expressive-headline'
              size='h4'
              tag='h1'
              color='brand'
            >Sign up for a free Downbeat Academy account</Text>
            <SignUpForm />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </section>
  )
}