"use server"

import { redirect } from 'next/navigation'
import { auth, validateRedirectUri } from '@/lib/auth/auth'
import { headers } from 'next/headers'

const DEFAULT_REDIRECT = process.env.DEFAULT_REDIRECT_URL || 'http://localhost:3000'

export async function signIn(formData: FormData) {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()
  const redirectUri = formData.get('redirectUri')?.toString()

  if (!email || !password) {
    throw new Error('Email and password are required')
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
    console.error('Sign in error:', error)
    if (error.body?.code === 'INVALID_CREDENTIALS') {
      throw new Error('Invalid email or password')
    }
    if (error.body?.code === 'USER_NOT_FOUND') {
      throw new Error('This email is not registered. Please create an account first.')
    }
    if (error.body?.code === 'EMAIL_NOT_VERIFIED') {
      throw new Error('Please verify your email address.')
    }
    throw error
  }

  // Validate and redirect to the provided URI or default
  const targetUrl = validateRedirectUri(redirectUri) || DEFAULT_REDIRECT
  redirect(targetUrl)
}
