import {
  Label,
  Input,
  FormField,
  Form,
} from '@components/form'
import { Button, ButtonWrapper } from '@components/button'
import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <Form>
      <FormField>
        <Label htmlFor="email">Email</Label>
        <Input type='email' id='email' name='email' />
        {/* <Input id="email" name="email" type="email" /> */}
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input type='password' id='password' name='password' />
        {/* <Input id="password" name="password" type="password" /> */}
      </FormField>
      <ButtonWrapper>
        <Button formAction={signup} text='Sign up' />
        <Button variant='secondary' formAction={login} text='Log in' />
      </ButtonWrapper>
    </Form>

    // <form>
    //   <label htmlFor="email">Email:</label>
    //   <input id="email" name="email" type="email" required />
    //   <label htmlFor="password">Password:</label>
    //   <input id="password" name="password" type="password" required />
    //   <button formAction={login}>Log in</button>
    //   <button formAction={signup}>Sign up</button>
    // </form>
  )
}