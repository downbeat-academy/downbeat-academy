import { Flex } from "@components/flex"
import { Text } from "@components/text"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/dialog'
import { Button, ButtonWrapper } from '@components/button'

import { ProfileForm } from "./profile-form"

interface UpdateProfileProps {
  firstName: string;
  lastName: string;
}

const UpdateProfile = ({ firstName, lastName }) => {
  return (
    <Flex direction='column' tag='article' gap='medium'>
      <Text tag='h2' size='h4' type='expressive-headline' collapse>Profile settings</Text>
      <ProfileForm
        isReadOnly={true}
        firstName={firstName}
        lastName={lastName}
      />
      <ButtonWrapper>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant='primary'
              size='medium'
              text='Update profile'
            />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update profile</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <ProfileForm isReadOnly={false} />
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </ButtonWrapper>
    </Flex>
  )
}

export { UpdateProfile }