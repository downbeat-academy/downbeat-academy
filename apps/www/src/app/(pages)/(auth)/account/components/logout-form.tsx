import { Form } from '@components/form'
import { Button } from '@components/button'
import { logout } from '@actions/auth/logout'

const LogoutForm = () => {
  return (
    <Form action={logout}>
      <Button variant='secondary' text='Log out' type='submit' />
    </Form>
  )
}

export { LogoutForm }