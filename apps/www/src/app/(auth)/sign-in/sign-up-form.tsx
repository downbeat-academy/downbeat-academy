import { signUp } from "@/actions/auth/users"
import { Button } from "@components/button"

export const SignUpForm = () => {
  return (
    <form action={signUp}>
      <Button type="submit" text="Sign Up" variant="primary" />
    </form>
  )
}