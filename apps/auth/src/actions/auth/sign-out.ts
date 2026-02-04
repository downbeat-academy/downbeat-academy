"use server"

import { redirect } from 'next/navigation'
import { auth, validateRedirectUri } from '@/lib/auth/auth'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

const DEFAULT_REDIRECT = process.env.DEFAULT_REDIRECT_URL || 'http://localhost:3000'

export async function signOut(redirectUri?: string) {
  try {
    await auth.api.signOut({
      headers: await headers()
    })

    revalidatePath('/')
  } catch (error: any) {
    console.error('Sign out error:', error)
    throw new Error('Failed to sign out')
  }

  // Validate and redirect to the provided URI or default
  const targetUrl = validateRedirectUri(redirectUri) || DEFAULT_REDIRECT
  redirect(targetUrl)
}
