'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@lib/supabase/supabase.server'

export type FormData = {
  email: string
  password: string
}

export async function signup(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // // const { error } = await supabase.auth.signUp(formData)
  // const { error } = await supabase.auth.signUp({
  //   email: formData.email,
  //   password: formData.password,
  //   // options: {
  //   //   emailRedirectTo: `${process.env.PROJECT_URL}/auth/confirm`
  //   // }
  // })

  // if (error) {
  //   redirect('/error')
  // }

  try {
    await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      // options: {
      //   emailRedirectTo: `${process.env.PROJECT_URL}/auth/confirm`
      // }
    })
  } catch (e) {
    console.log(e)
    throw new Error('Failed to sign up')
  }

  revalidatePath('/', 'layout')
  // redirect('/sign-up/confirm')
}