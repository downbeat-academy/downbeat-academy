'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { TSignUpFormSchema } from '@lib/types/auth/sign-up-form-schema'

import { createClient } from '@lib/supabase/supabase.server'

export async function signup(formData: TSignUpFormSchema) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	try {
		await supabase.auth.signUp({
			email: formData.email,
			password: formData.password,
		})
	} catch (e) {
		console.log(e)
		throw new Error('Failed to sign up')
	}

	revalidatePath('/', 'layout')
	redirect('/')
}
