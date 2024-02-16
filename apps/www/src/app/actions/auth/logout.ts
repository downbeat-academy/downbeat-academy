'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect, useRouter } from 'next/navigation'

import { createClient } from '@lib/supabase/supabase.server'

export async function logout() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  await supabase.auth.signOut()

  redirect('/')
  // revalidatePath('/', 'page')
}