'use client'

import { authClient } from "@/lib/auth/auth-client"
import { useRouter } from "next/navigation"
import { Button } from "@components/button"

interface SignOutProps {
  size?: 'small' | 'medium' | 'large' | 'x-small',
  className?: string
}

export default function SignOut({
  size = 'small',
  className,
}: SignOutProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push('/')
  }

  return (
    <Button
      onClick={handleSignOut}
      text="Sign Out"
      variant='ghost'
      className={className}
      size={size}
    />
  )
}