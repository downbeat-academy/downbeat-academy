import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@lib/supabase/supabase.server';

export async function GET() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  await supabase.auth.signOut();
  return (
    redirect('/'),
    revalidatePath('/', 'layout')
  )
}