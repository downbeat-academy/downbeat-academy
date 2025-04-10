'use server'

import { auth } from '@/lib/auth/auth'

export async function forgotPasswordAction(email: string) {
	try {
		await auth.api.forgetPassword({
			body: {
				email,
				redirectTo: '/account/update-password',
			},
		})

		return { success: true }
	} catch (error: any) {
		console.error('Failed to initiate password reset:', error)
		if (error.message === 'User not found') {
			return { error: 'No account found with this email address' }
		}
		return { error: 'Failed to send password reset email. Please try again.' }
	}
}
