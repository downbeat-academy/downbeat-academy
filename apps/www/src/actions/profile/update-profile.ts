'use server'

import { auth } from '@/lib/auth/auth'
import { headers } from 'next/headers'

export async function updateProfile(formData: {
	name: string
	email?: string
}) {
	const session = await auth.api.getSession({
		headers: headers(),
	})

	if (!session?.session) {
		throw new Error('Not authenticated')
	}

	try {
		await auth.api.updateUser({
			headers: headers(),
			body: {
				name: formData.name,
			},
		})
		return { success: true }
	} catch (error) {
		console.error('Failed to update profile:', error)
		throw error
	}
}
