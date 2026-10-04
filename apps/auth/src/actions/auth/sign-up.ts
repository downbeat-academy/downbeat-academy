"use server"

import { auth } from '@/lib/auth/auth'
import { getTrustedOrigins } from '@/lib/auth/trusted-origins'
import { resolveVerificationCallbackUrl } from '@/lib/auth/verification-callback-url'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

export async function signUp(formData: FormData) {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()
  const name = formData.get('name')?.toString()
  const redirectUri = formData.get('redirectUri')?.toString()

  if (!email || !password || !name) {
    throw new Error('Email, password, and name are required')
  }

  try {
    await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        email,
        password,
        name,
        // Where the verification link sends the user once verified, so they
        // land signed in to the app they started from
        callbackURL: resolveVerificationCallbackUrl(redirectUri, {
          authServiceUrl: process.env.AUTH_SERVICE_URL || 'http://localhost:3002',
          defaultRedirectUrl: process.env.DEFAULT_REDIRECT_URL || 'http://localhost:3000',
          trustedOrigins: getTrustedOrigins(),
        }),
      }
    })

    revalidatePath('/')
    return { success: true, email }
  } catch (error: any) {
    console.error('Sign up error:', error)
    if (error.body?.code === 'USER_ALREADY_EXISTS') {
      throw new Error('A user with this email already exists')
    }
    throw error
  }
}
