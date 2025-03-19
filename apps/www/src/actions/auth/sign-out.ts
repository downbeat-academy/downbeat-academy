"use server"

import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth/auth'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

export async function signOut() {
  try {
    await auth.api.signOut({
      headers: headers()
    })
    
    revalidatePath('/')
  } catch (error: any) {
    console.error('Sign out error:', error)
    throw new Error('Failed to sign out')
  }

  redirect('/')
} 