'use server'

import { cookies } from "next/headers"
import { createClient } from "@lib/supabase/supabase.server"

export async function updateUser(formData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
}