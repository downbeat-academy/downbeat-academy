'use server'

import { auth } from "@/lib/auth/auth"

interface ResetPasswordParams {
  newPassword: string
  token: string
}

export async function resetPasswordAction({ newPassword, token }: ResetPasswordParams) {
  try {
    await auth.api.resetPassword({
      body: {
        newPassword,
        token
      }
    })

    return { success: true }
  } catch (error: any) {
    console.error('Failed to reset password:', error)
    return { error: error.message || 'Failed to reset password. Please try again.' }
  }
} 