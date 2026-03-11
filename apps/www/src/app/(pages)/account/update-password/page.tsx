import { requireAuth } from '@/lib/auth/require-auth'
import { UpdatePasswordForm } from './update-password-form'
import { Text } from 'cadence-core'

export default async function UpdatePasswordPage() {
  await requireAuth('/account/update-password')

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
