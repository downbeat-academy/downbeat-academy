import { headers } from "next/headers"
import { signIn, signUp } from "@/actions/auth/users"
import { auth } from "@lib/auth/auth"
import SignOut from "./sign-out"
export default async function SignIn() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <div>
      <p>{!session ? 'Not authenticated' : `Authenticated as ${session.user.email}`}</p>
      <form action={signIn}>
        <button type="submit">Sign In</button>
      </form>
      <form action={signUp}>
        <button type="submit">Sign Up</button>
      </form>
      <SignOut />
    </div>
  )
}