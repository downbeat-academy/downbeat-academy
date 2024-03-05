import { Form, FormField, Label, Input } from '@components/form'

interface ProfileFormProps {
  isReadOnly: boolean;
  firstName?: any;
  lastName?: any;
}

const ProfileForm = ({
  isReadOnly,
  firstName,
  lastName
}: ProfileFormProps) => {

  const readOnlyProps = (value) => {
    if (isReadOnly === true) {
      return {
        disabled: true,
        value: value,
      }
    }
  }

  return (
    <Form>
      <FormField>
        <Label htmlFor='first-name'>First name</Label>
        <Input
          type='text'
          id='first-name'
          name='first-name'
          {...readOnlyProps(firstName)}
        />
      </FormField>
      <FormField>
        <Label htmlFor='last-name'>Last name</Label>
        <Input
          type='text'
          id='last-name'
          name='last-name'
          {...readOnlyProps(lastName)}
        />
      </FormField>
    </Form>
  )
}

export { ProfileForm }