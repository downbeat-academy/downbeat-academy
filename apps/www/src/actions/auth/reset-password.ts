'use server'

import { auth } from "@/lib/auth/auth";

/**
 * Resets the user's password using a valid reset token
 */
export async function resetPasswordAction(token: string, newPassword: string) {
  try {
    await auth.handler(new Request('http://localhost/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({
        token,
        newPassword,
      })
    }));

    return { success: true };
  } catch (error) {
    console.error('Failed to reset password:', error);
    return { error: 'Failed to reset password' };
  }
} 