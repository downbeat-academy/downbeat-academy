'use server'

import { cookies } from 'next/headers'
import { createClient } from '@lib/supabase/supabase.server'
import { redirect } from 'next/navigation'

export async function logout() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	await supabase.auth.signOut()
	redirect('/')
}
