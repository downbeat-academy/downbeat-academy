"use server"

import { auth } from '@/lib/auth/auth'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

export async function signUp(formData: FormData) {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()
  const name = formData.get('name')?.toString()

  if (!email || !password || !name) {
    throw new Error('Email, password, and name are required')
  }

  try {
    await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        email,
        password,
        name,
      }
    })

    revalidatePath('/')
    return { success: true, email }
  } catch (error: any) {
    console.error('Sign up error:', error)
    if (error.body?.code === 'USER_ALREADY_EXISTS') {
      throw new Error('A user with this email already exists')
    }
    throw error
  }
}
