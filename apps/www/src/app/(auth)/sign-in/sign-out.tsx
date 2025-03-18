'use client'

import { authClient } from "@/lib/auth/auth-client"
import { useRouter } from "next/navigation"

export default function SignOut() {
  const router = useRouter()

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push('/')
  }

  return <button onClick={handleSignOut}>Sign Out</button>
}
