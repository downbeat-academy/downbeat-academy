import { signIn } from "@/actions/auth/users"
import { Button } from "@components/button"

export const SignInForm = () => {
  return (
    <form action={signIn}>
      <Button type="submit" text="Sign In" variant="primary" />
    </form>
  )
}