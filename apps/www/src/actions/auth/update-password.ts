'use server'

import { cookies } from "next/headers"
import { createClient } from "lib/supabase/supabase.server"

export type FormData = {
  newPassword: string
}

export async function updatePassword(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    await supabase.auth.updateUser({ password: formData.newPassword })
  } catch (e) {
    throw new Error("Failed to update password")
  }
}