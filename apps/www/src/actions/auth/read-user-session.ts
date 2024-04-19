'use server'

import { cookies } from "next/headers";
import { createClient } from "@lib/supabase/supabase.server";

export async function readUserSession() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  return supabase.auth.getUser()
}