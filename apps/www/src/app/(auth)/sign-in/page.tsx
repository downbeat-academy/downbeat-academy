import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@lib/auth/auth"
import * as Tabs from '@components/tabs'
import { Text } from 'cadence-core'
import { Link } from '@components/link'
import s from './login.module.scss'
import { SignInForm } from "./sign-in-form"
import { SignUpForm } from "./sign-up-form"

export default async function SignIn() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session) {
    redirect('/account')
  }

  return (
    <section className={s['login--wrapper']}>
      <div className={s['login--wrapper-inner']}>
        <Tabs.Root defaultValue="Login">
          <Tabs.List>
            <Tabs.Trigger value="Login">Sign in</Tabs.Trigger>
            <Tabs.Trigger value="Sign up">Sign up</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="Login" className={s['login--content']}>
            <Text type="expressive-headline" size="h4" tag="h1" color="brand">
              Login to your Downbeat Academy account
            </Text>
            <SignInForm />
          </Tabs.Content>
          <Tabs.Content value="Sign up" className={s['login--content']}>
            <Text type="expressive-headline" size="h4" tag="h1" color="brand">
              Sign up for a free Downbeat Academy account
            </Text>
            <SignUpForm />
          </Tabs.Content>
        </Tabs.Root>
      </div>
      <Link href="/">Back to home</Link>
    </section>
  )
}