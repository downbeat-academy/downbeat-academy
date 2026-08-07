import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth, validateRedirectUri } from '@/lib/auth/auth'
import { captureAuthEvent } from '@/lib/analytics'

interface SignOutPageProps {
  searchParams: Promise<{ redirect_uri?: string }>
}

export default async function SignOutPage({ searchParams }: SignOutPageProps) {
  const { redirect_uri } = await searchParams
  const defaultRedirect = process.env.DEFAULT_REDIRECT_URL || 'http://localhost:3000'

  // Read the session before destroying it — afterwards there is no user id to
  // attribute the event to. This page is the real sign-out path: consumer apps
  // redirect here to clear the auth service session, so instrumenting it covers
  // all of them.
  try {
    const session = await auth.api.getSession({ headers: await headers() })

    if (session?.user?.id) {
      captureAuthEvent({
        distinctId: session.user.id,
        event: 'sign_out_completed',
      })
    }
  } catch {
    // Analytics must never block signing out.
  }

  // Sign out the user (clears the auth service session cookie)
  try {
    await auth.api.signOut({
      headers: await headers(),
    })
  } catch {
    // Session may already be cleared
  }

  // Redirect back to the requesting app
  const targetUrl = validateRedirectUri(redirect_uri) || defaultRedirect
  redirect(targetUrl)
}
