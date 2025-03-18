"use server"

import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth/auth'

export async function signIn(formData: FormData) {
  try {
    await auth.api.signInEmail({
      body: {
        email: "jorytindall@gmail.com",
        password: "password-test"
      }
    })
    
    // Redirect to current page to trigger a reload
    redirect('/account')
  } catch (error) {
    console.error('Sign in error:', error)
  }
}

export async function signUp(formData: FormData) {
  try {
    await auth.api.signUpEmail({
      body: {
        email: "jorytindall@gmail.com",
        password: "password-test",
        name: "Jory Tindall",
      }
    })
    
    // Redirect to current page to trigger a reload
    redirect('/account')
  } catch (error) {
    console.error('Sign up error:', error)
  }
}