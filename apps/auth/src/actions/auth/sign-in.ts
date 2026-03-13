"use server"

import { auth, validateRedirectUri } from '@/lib/auth/auth'
import { headers } from 'next/headers'

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
    console.error('Sign in error:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2))
    console.error('Error body:', error.body)
    console.error('Error status:', error.status)
    console.error('Error message:', error.message)
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

  // Return the validated redirect URL for the client to navigate to
  const targetUrl = validateRedirectUri(redirectUri) || DEFAULT_REDIRECT
  return { redirectUrl: targetUrl }
}
