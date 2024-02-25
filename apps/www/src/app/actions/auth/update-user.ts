'use server'

import { cookies } from "next/headers"
import { createClient } from "@lib/supabase/supabase.server"
import { TUpdateUserSchema } from "@lib/types/auth/update-user-schema"

export async function updateUser(formData: TUpdateUserSchema) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    await supabase.auth.updateUser({
      email: formData.email,
      password: formData.password,
    })
  } catch (e) {
    throw new Error('Failed to update user')
  }
}