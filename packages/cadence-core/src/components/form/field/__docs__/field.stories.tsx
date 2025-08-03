import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Field } from '../field'
import { Input } from '../../input'
import { Label, HelperText, ValidationMessage } from '../../primitives'

const meta: Meta<typeof Field> = {
  title: 'Cadence/Components/Forms/Field',
  component: Field,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'The orientation of the form field',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Field {...args}>
      <Label htmlFor="field-default">Label</Label>
      <Input id="field-default" placeholder="Enter value" />
    </Field>
  ),
}

export const Vertical: Story = {
  render: (args) => (
    <Field {...args}>
      <Label htmlFor="field-vertical">Username</Label>
      <Input id="field-vertical" placeholder="Enter username" />
      <HelperText>Choose a unique username</HelperText>
    </Field>
  ),
  args: {
    orientation: 'vertical',
  },
}

export const Horizontal: Story = {
  render: (args) => (
    <div style={{ width: '400px' }}>
      <Field {...args}>
        <Label htmlFor="field-horizontal" style={{ minWidth: '100px' }}>Email</Label>
        <Input id="field-horizontal" type="email" placeholder="john@example.com" />
      </Field>
    </div>
  ),
  args: {
    orientation: 'horizontal',
  },
}

export const WithHelperText: Story = {
  render: (args) => (
    <Field {...args}>
      <Label htmlFor="field-helper">Password</Label>
      <Input id="field-helper" type="password" placeholder="Enter password" />
      <HelperText>Must be at least 8 characters long</HelperText>
    </Field>
  ),
}

export const WithValidation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Field>
        <Label htmlFor="field-success">Username</Label>
        <Input id="field-success" value="johndoe" />
        <ValidationMessage type="success">Username is available</ValidationMessage>
      </Field>

      <Field>
        <Label htmlFor="field-warning">Password</Label>
        <Input id="field-warning" type="password" value="weak123" />
        <ValidationMessage type="warning">Consider using a stronger password</ValidationMessage>
      </Field>

      <Field>
        <Label htmlFor="field-error">Email</Label>
        <Input id="field-error" value="invalid-email" isInvalid />
        <ValidationMessage type="error">Please enter a valid email address</ValidationMessage>
      </Field>
    </div>
  ),
}

export const ComplexField: Story = {
  render: (args) => (
    <Field {...args}>
      <Label htmlFor="field-complex">Email Address</Label>
      <Input id="field-complex" type="email" placeholder="john@example.com" required />
      <HelperText>We'll use this to send you important updates</HelperText>
      <ValidationMessage type="success">Email verified</ValidationMessage>
    </Field>
  ),
}