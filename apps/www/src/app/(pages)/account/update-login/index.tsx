import { Text } from '@components/text'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/dialog'
import { Button, ButtonWrapper } from '@components/button'
import { Flex } from '@components/flex'

import { UpdateEmailForm } from './update-email-form'
import { UpdatePasswordForm } from './update-password-form'

const UpdateLogin = ({ email }) => {
  return (
    <Flex direction='column' gap='medium' tag='article'>
      <Text tag='h2' size='h4' type='expressive-headline' collapse>Account settings</Text>
      <Flex direction='row' gap='medium' alignItems='center'>
        <Text tag='p' size='body-base' collapse>Email address: <strong>{email}</strong></Text>
        <ButtonWrapper>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant='secondary'
                size='small'
                text='Update email'
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update email</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Update your email address.
              </DialogDescription>
              <UpdateEmailForm />
            </DialogContent>
          </Dialog >
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant='secondary'
                size='small'
                text='Update password'
              />
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Update password</DialogTitle>
              <UpdatePasswordForm />
            </DialogContent>
          </Dialog>
        </ButtonWrapper>
      </Flex>
    </Flex>
  )
}

export { UpdateLogin }