'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@lib/supabase/supabase.server'

export type FormData = {
  email: string
  password: string
}

export async function login(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // const { error } = await supabase.auth.signInWithPassword(formData)

  // if (error) {
  //   redirect('/error')
  // }

  try {
    await supabase.auth.signInWithPassword(formData)
  } catch (e) {
    throw new Error('Failed to sign in')
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}