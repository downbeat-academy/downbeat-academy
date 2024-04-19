'use server'

import { cookies } from 'next/headers'
import { createClient } from "lib/supabase/supabase.server"

export type FormData = {
  email: string
}

export async function resetPassword(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    await supabase.auth.resetPasswordForEmail(formData.email)
  } catch (e) {
    throw new Error("Failed to reset password")
  }
}