'use server'

import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"

/**
 * Updates the user's password
 */
export async function updatePasswordAction(currentPassword: string, newPassword: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session?.session) {
      throw new Error('Not authenticated')
    }

    // First verify the current password
    const ctx = await auth.$context
    const account = await ctx.internalAdapter.findAccountByUserId(session.user.id)
    
    if (!account?.password) {
      return { error: 'No password set for this account' }
    }

    const isValid = await ctx.password.verify(currentPassword)
    
    if (!isValid) {
      return { error: 'Current password is incorrect' }
    }

    // Hash and update the new password
    const hash = await ctx.password.hash(newPassword)
    await ctx.internalAdapter.updatePassword(session.user.id, hash)

    return { success: true }
  } catch (error) {
    console.error('Failed to update password:', error)
    return { error: 'Failed to update password' }
  }
} 