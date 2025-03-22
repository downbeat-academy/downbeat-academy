import { Flex } from 'cadence-core'
import { Text } from 'cadence-core'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/dialog'
import { Button, ButtonWrapper } from '@components/button'
import { UpdatePasswordForm } from './update-password-form'

const PasswordSettings = () => {
  return (
    <Flex direction="column" tag="article" gap="medium">
      <Text tag="h2" size="h4" type="expressive-headline" collapse>
        Password settings
      </Text>
      <Text tag="p" type="productive-body" size="body-base" color="primary" collapse>
        Update your password or reset it if you've forgotten it.
      </Text>
      <ButtonWrapper>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="primary" size="medium" text="Change password" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change password</DialogTitle>
            </DialogHeader>
            <UpdatePasswordForm />
          </DialogContent>
        </Dialog>
      </ButtonWrapper>
    </Flex>
  )
}

export { PasswordSettings } 