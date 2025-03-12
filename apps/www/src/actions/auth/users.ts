"use server"

import { auth } from '@/lib/auth/auth'
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
  try {
    await auth.api.signInEmail({
      body: {
        email: "jorytindall@gmail.com",
        password: "password-test"
      }
    })
    
    // Redirect to dashboard or home page after successful sign in
    redirect('/dashboard')
  } catch (error) {
    console.error('Sign in error:', error)
    // Handle error appropriately
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
    
    // Redirect to dashboard or home page after successful sign up
    redirect('/dashboard')
  } catch (error) {
    console.error('Sign up error:', error)
    // Handle error appropriately
  }
}

export async function signOut(formData: FormData) {
  try {
    await auth.api.signOut({
      headers: {}
    })
    redirect('/')
  } catch (error) {
    console.error('Sign out error:', error)
    // Even if sign out fails, redirect to home page
    redirect('/')
  }
}