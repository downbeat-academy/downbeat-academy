import { signIn, signOut, signUp } from "@/actions/auth/users"

export default function SignIn() {
  return (
    <div className="flex flex-col gap-4 p-4">
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