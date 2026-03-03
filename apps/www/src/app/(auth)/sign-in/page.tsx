import { Metadata } from "next"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@lib/auth/auth"
import { Tabs, TabsList, TabsTrigger, TabsContent, Text } from 'cadence-core'
import { Link } from '@components/link'
import s from './sign-in.module.css'
import { SignInForm } from "./sign-in-form"
import { SignUpForm } from "./sign-up-form"

export const metadata: Metadata = {
    title: 'Sign in 🎵 Downbeat Academy',
    description: 'Sign in to your Downbeat Academy account or create a new account to access music education resources and lessons.'
}

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
        <Tabs defaultValue="Login">
          <TabsList>
            <TabsTrigger value="Login">Sign in</TabsTrigger>
            <TabsTrigger value="Sign up" data-testid="create-account-tab">Sign up</TabsTrigger>
          </TabsList>
          <TabsContent value="Login" className={s['login--content']}>
            <Text type="expressive-headline" size="h4" tag="h1" color="brand">
              Login to your Downbeat Academy account
            </Text>
            <SignInForm />
          </TabsContent>
          <TabsContent value="Sign up" className={s['login--content']}>
            <Text type="expressive-headline" size="h4" tag="h1" color="brand">
              Sign up for a free Downbeat Academy account
            </Text>
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
      <Link href="/">Back to home</Link>
    </section>
  )
}
