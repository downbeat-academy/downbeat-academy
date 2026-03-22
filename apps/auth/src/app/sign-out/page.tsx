import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth, validateRedirectUri } from '@/lib/auth/auth'

interface SignOutPageProps {
  searchParams: Promise<{ redirect_uri?: string }>
}

export default async function SignOutPage({ searchParams }: SignOutPageProps) {
  const { redirect_uri } = await searchParams
  const defaultRedirect = process.env.DEFAULT_REDIRECT_URL || 'http://localhost:3000'

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
