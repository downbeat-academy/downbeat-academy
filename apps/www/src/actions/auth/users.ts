"use server"

import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth/auth'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

export async function signIn(formData: FormData) {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!email || !password) {
    throw new Error('Email and password are required')
  }

  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password
      }
    })
    
    revalidatePath('/')
    redirect('/account')
  } catch (error) {
    console.error('Sign in error:', error)
    throw error
  }
}

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
    redirect('/account')
  } catch (error) {
    console.error('Sign up error:', error)
    throw error
  }
}