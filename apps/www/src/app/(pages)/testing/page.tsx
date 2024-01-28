import {
  Form,
  FormField,
  Input,
  Textarea,
  HelperText,
  Label,
  ValidationMessage
} from "@components/form"

export default function TestingPage() {
  return (
    <Form>
      <p>This is a form</p>
      <FormField>
        <Label htmlFor='input-1'>Input 1</Label>
        <HelperText>Helper text</HelperText>
        <Input
          name='input-1'
          id='input-1'
          type='text'
          placeholder='Input 1'
        />
        <ValidationMessage type='success'>Validation message</ValidationMessage>
      </FormField>
    </Form>
  )
}