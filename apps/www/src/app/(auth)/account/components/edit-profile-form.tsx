import {
  Form,
  FormField,
  Input,
  Label,
  ValidationMessage,
  HorizontalWrapper
} from '@components/form'
import { Button, ButtonWrapper } from '@components/button'
import { Text } from '@components/text'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@components/dialog'

const EditProfileForm = async () => {
  return (
    <article>
      <HorizontalWrapper>
        <FormField>
          <Label htmlFor='name'>Name</Label>
          <Input
            type='text'
            id='name'
            name='name'
          />
        </FormField>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type='button'
              variant='primary'
              text="Edit profile"
            />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Update your profile information.
            </DialogDescription>
            <Form>
              <FormField>
                <Label htmlFor='first-name'>First name</Label>
                <Input
                  type='text'
                  id='first-name'
                  name='first-name'
                />
              </FormField>
              <FormField>
                <Label htmlFor='last-name'>Last name</Label>
                <Input
                  type='text'
                  id='last-name'
                  name='last-name'
                />
              </FormField>
              <ButtonWrapper>
                <Button
                  type='submit'
                  variant='primary'
                  text='Save'
                />
                <DialogClose asChild>
                  <Button
                    type='button'
                    variant='secondary'
                    text='Cancel'
                  />
                </DialogClose>
              </ButtonWrapper>
            </Form>
          </DialogContent>
        </Dialog>
      </HorizontalWrapper>
    </article>
  )
}

export { EditProfileForm }

