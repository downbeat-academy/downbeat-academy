'use server'

import { auth } from "@/lib/auth/auth";

export async function forgotPasswordAction(email: string) {
  try {
    // Send the request to the correct endpoint
    await auth.handler(new Request(`/api/auth/forgot-password`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        redirectTo: '/reset-password',
      })
    }));

    return { success: true };
  } catch (error: any) {
    console.error('Failed to initiate password reset:', error);
    if (error.message === 'User not found') {
      return { error: 'No account found with this email address' };
    }
    return { error: 'Failed to send password reset email. Please try again.' };
  }
} 