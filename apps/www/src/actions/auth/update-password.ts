'use server'

import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"

interface UpdatePasswordParams {
  currentPassword?: string
  newPassword: string
}

export async function updatePasswordAction({ currentPassword, newPassword }: UpdatePasswordParams) {
  try {
    const session = await auth.api.getSession({
      headers: headers()
    })
    if (!session?.user) {
      return { error: 'You must be signed in to update your password' }
    }

    const ctx = await auth.$context
    const accounts = await ctx.internalAdapter.findAccountByUserId(session.user.id)
    
    if (!accounts || accounts.length === 0) {
      return { error: 'No account found. Please try signing in again.' }
    }

    // Get the first account that has a password, if any
    const accountWithPassword = accounts.find(acc => acc.password)
    
    // If any account has a password, verify it
    if (accountWithPassword) {
      if (!currentPassword) {
        return { error: 'Current password is required' }
      }

      const isValid = await ctx.password.verify({
        password: currentPassword,
        hash: accountWithPassword.password
      })
      if (!isValid) {
        return { error: 'Current password is incorrect' }
      }
    }

    // Hash and update new password
    const hash = await ctx.password.hash(newPassword)
    await ctx.internalAdapter.updatePassword(session.user.id, hash)

    return { success: true }
  } catch (error: any) {
    console.error('Failed to update password:', error)
    return { error: error.message || 'Failed to update password. Please try again.' }
  }
} 