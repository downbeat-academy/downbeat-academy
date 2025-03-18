'use server'

import { cookies } from 'next/headers'
import { createClient } from '@lib/supabase/supabase.server'
import { readUserSession } from '@actions/supabase-auth/read-user-session'

export type FormData = {
	name: string
}

export async function updateProfile(formData: FormData) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const { data, error } = await readUserSession()

	try {
		await supabase
			.from('profiles')
			.update({
				first_name: formData.name,
			})
			.eq('id', data.user.id)
	} catch (e) {
		throw new Error('Failed to update profile')
	}
}
