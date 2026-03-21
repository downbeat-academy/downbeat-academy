import { Metadata } from "next"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth, validateRedirectUri } from "@/lib/auth/auth"
import * as Tabs from '@/components/tabs'
import { Text } from 'cadence-core'
import { Link } from '@/components/link'
import s from './sign-in.module.css'
import { SignInForm } from "./sign-in-form"
import { SignUpForm } from "./sign-up-form"

export const metadata: Metadata = {
    title: 'Sign in - Downbeat Academy',
    description: 'Sign in to your Downbeat Academy account or create a new account to access music education resources and lessons.'
}

interface SignInPageProps {
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams
  const session = await auth.api.getSession({
    headers: await headers()
  })

  // Detect if this is an OAuth authorization flow (has client_id param)
  const isOAuthFlow = !!params.client_id

  // If already logged in during an OAuth flow, redirect back to the
  // authorization endpoint so it can issue the code
  if (session && isOAuthFlow) {
    const authUrl = new URL('/api/auth/oauth2/authorize', process.env.AUTH_SERVICE_URL || 'http://localhost:3002')
    for (const [key, value] of Object.entries(params)) {
      if (value) authUrl.searchParams.set(key, value)
    }
    redirect(authUrl.toString())
  }

  // If already logged in (non-OAuth), redirect to the target or default
  if (session) {
    const defaultRedirect = process.env.DEFAULT_REDIRECT_URL || 'http://localhost:3000'
    const targetUrl = validateRedirectUri(params.redirect_uri) || defaultRedirect
    redirect(targetUrl)
  }

  // Build the OAuth redirect URL for after sign-in
  // This lets the sign-in form redirect back to the authorization endpoint
  let oauthRedirectUrl: string | undefined
  if (isOAuthFlow) {
    const authUrl = new URL('/api/auth/oauth2/authorize', process.env.AUTH_SERVICE_URL || 'http://localhost:3002')
    for (const [key, value] of Object.entries(params)) {
      if (value) authUrl.searchParams.set(key, value)
    }
    oauthRedirectUrl = authUrl.toString()
  }

  return (
    <section className={s['login--wrapper']}>
      <div className={s['login--wrapper-inner']}>
        <Tabs.Root defaultValue="Login">
          <Tabs.List>
            <Tabs.Trigger value="Login">Sign in</Tabs.Trigger>
            <Tabs.Trigger value="Sign up" data-testid="create-account-tab">Sign up</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="Login" className={s['login--content']}>
            <Text type="expressive-headline" size="h4" tag="h1" color="brand">
              Login to your Downbeat Academy account
            </Text>
            <SignInForm redirectUri={oauthRedirectUrl || params.redirect_uri} />
          </Tabs.Content>
          <Tabs.Content value="Sign up" className={s['login--content']}>
            <Text type="expressive-headline" size="h4" tag="h1" color="brand">
              Sign up for a free Downbeat Academy account
            </Text>
            <SignUpForm redirectUri={oauthRedirectUrl || params.redirect_uri} />
          </Tabs.Content>
        </Tabs.Root>
      </div>
      <Link href={process.env.DEFAULT_REDIRECT_URL || '/'}>Back to home</Link>
    </section>
  )
}
