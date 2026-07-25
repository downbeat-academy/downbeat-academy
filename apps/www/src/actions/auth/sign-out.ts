"use server"

import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth/auth'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { getPostHogClient } from '@/lib/posthog-server'

export async function signOut() {
  // Capture sign-out event before the session is destroyed
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (session?.user?.id) {
      const posthog = getPostHogClient()
      posthog.capture({
        distinctId: session.user.id,
        event: 'user_signed_out',
      })
      await posthog.shutdown()
    }
  } catch {
    // Non-blocking: continue with sign-out even if analytics fails
  }

  try {
    await auth.api.signOut({
      headers: await headers()
    })

    revalidatePath('/')
  } catch (error: any) {
    console.error('Sign out error:', error)
    throw new Error('Failed to sign out')
  }

  redirect('/')
}
