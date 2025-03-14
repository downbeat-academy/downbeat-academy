import { headers } from "next/headers"
import { signIn, signOut, signUp } from "@/actions/auth/users"
import { auth } from "@lib/auth/auth"

export default async function SignIn() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <div className="flex flex-col gap-4 p-4">
      <p>{!session ? 'Not authenticated' : `Authenticated as ${session.user.email}`}</p>
      <form action={signIn}>
        <button type="submit">Sign In</button>
      </form>
      <form action={signUp}>
        <button type="submit">Sign Up</button>
      </form>
      <form action={signOut}>
        <button type="submit">Sign Out</button>
      </form>
    </div>
  )
}