'use server'

import { cookies } from "next/headers"
import { createClient } from "@lib/supabase/supabase.server"
import { readUserSession } from "@actions/auth/read-user-session"

export async function getProfile() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await readUserSession()

  const profile = await supabase.from('profiles').select('*').eq('id', data.user.id)

  return profile;
}