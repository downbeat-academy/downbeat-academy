import { Flex } from "components/flex"
import { Text } from "components/text"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/dialog'
import { Button, ButtonWrapper } from 'components/button'

import { UpdateProfileForm } from "./update-profile-form"

interface UpdateProfileProps {
  firstName: string;
  lastName: string;
}

const ProfileSettings = ({ firstName, lastName }: UpdateProfileProps) => {
  return (
    <Flex direction='column' tag='article' gap='medium'>
      <Text tag='h2' size='h4' type='expressive-headline' collapse>Profile settings</Text>
      <UpdateProfileForm
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
            <UpdateProfileForm isReadOnly={false} />
          </DialogContent>
        </Dialog>
      </ButtonWrapper>
    </Flex>
  )
}

export { ProfileSettings }