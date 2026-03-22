"use server"

import { auth, validateRedirectUri } from '@/lib/auth/auth'
import { headers } from 'next/headers'
import { eq } from 'drizzle-orm'
import { authDb } from '@/lib/db/drizzle'
import * as schema from '@/lib/db/schema'
import { ADMIN_ROLES } from 'auth-permissions'

const DEFAULT_REDIRECT = process.env.DEFAULT_REDIRECT_URL || 'http://localhost:3000'

export async function signIn(formData: FormData) {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()
  const redirectUri = formData.get('redirectUri')?.toString()

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password
      }
    })
  } catch (error: any) {
    console.error('Sign in error:', error.message)
    if (error.body?.code === 'INVALID_CREDENTIALS') {
      return { error: 'Invalid email or password' }
    }
    if (error.body?.code === 'USER_NOT_FOUND') {
      return { error: 'This email is not registered. Please create an account first.' }
    }
    if (error.body?.code === 'EMAIL_NOT_VERIFIED') {
      return { error: 'Please verify your email address.' }
    }
    return { error: error.message || 'An unexpected error occurred. Please try again.' }
  }

  // If an explicit redirect was provided (OAuth flow or consumer app), use it
  if (redirectUri) {
    const targetUrl = validateRedirectUri(redirectUri) || DEFAULT_REDIRECT
    return { redirectUrl: targetUrl }
  }

  // No redirect context — user logged in directly on the auth service.
  // Check their role: admins go to the dashboard, everyone else goes to the main site.
  // We query the DB directly because the session cookie isn't readable within
  // the same server action that created it.
  const [user] = await authDb
    .select({ role: schema.user.role })
    .from(schema.user)
    .where(eq(schema.user.email, email))
    .limit(1)

  if (user?.role && ADMIN_ROLES.includes(user.role as any)) {
    return { redirectUrl: '/admin' }
  }

  return { redirectUrl: DEFAULT_REDIRECT }
}
