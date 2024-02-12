import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@lib/supabase/supabase.server'

export default async function AccountPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return <p>Hello {data.user.email}</p>
}