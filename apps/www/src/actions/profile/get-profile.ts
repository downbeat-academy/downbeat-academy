"use server"

import { auth } from '@/lib/auth/auth'
import { headers } from 'next/headers'

export async function getProfile() {
	const session = await auth.api.getSession({
		headers: headers()
	})

	if (!session?.session) {
		throw new Error('Not authenticated')
	}

	return {
		user: session.user
	}
}
