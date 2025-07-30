import { auth } from '@/lib/auth/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { UpdatePasswordForm } from './update-password-form'
import { Text } from 'cadence-core'

export default async function UpdatePasswordPage() {
  // Check if user is authenticated
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session?.user) {
    redirect('/sign-in')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-4">
        <Text tag="h1" type="productive-headline" size="h4" color="primary" collapse>
          Update Your Password
        </Text>
        <Text tag="p" type="productive-body" size="body-base" color="faint" collapse>
          Update your current password by entering your existing password and choosing a new one.
        </Text>
        <UpdatePasswordForm />
      </div>
    </div>
  )
}