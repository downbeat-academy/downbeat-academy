import {
  Form,
  FormField,
  Input,
  Textarea,
  HelperText,
  Label,
  ValidationMessage,
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
        <ValidationMessage type='error'>Validation message</ValidationMessage>
      </FormField>
      <FormField>
        <Label htmlFor='textarea-1'>Textarea 1</Label>
        <HelperText>Helper text</HelperText>
        <Textarea id='textarea-1' name='textarea-1' />
      </FormField>
    </Form>
  )
}