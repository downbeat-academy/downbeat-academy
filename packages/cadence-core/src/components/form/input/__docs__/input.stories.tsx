import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '../input'
import { Field } from '../../field'
import { Label } from '../../primitives'

const meta: Meta<typeof Input> = {
  title: 'Cadence/Components/Forms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'The type of input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the input is read-only',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Whether the input is in an invalid state',
    },
    value: {
      control: 'text',
      description: 'The value of the input',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  render: (args) => (
    <Field>
      <Label htmlFor="input-with-label">Username</Label>
      <Input id="input-with-label" {...args} />
    </Field>
  ),
  args: {
    placeholder: 'Enter username',
  },
}

export const Required: Story = {
  render: (args) => (
    <Field>
      <Label htmlFor="input-required">Email Address</Label>
      <Input id="input-required" {...args} />
    </Field>
  ),
  args: {
    type: 'email',
    placeholder: 'john@example.com',
    required: true,
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Cannot edit this',
    disabled: true,
  },
}

export const ReadOnly: Story = {
  args: {
    value: 'Read only value',
    readOnly: true,
  },
}

export const Invalid: Story = {
  render: (args) => (
    <Field>
      <Label htmlFor="input-invalid">Email</Label>
      <Input id="input-invalid" {...args} />
    </Field>
  ),
  args: {
    type: 'email',
    value: 'invalid-email',
    isInvalid: true,
  },
}

export const InputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Field>
        <Label htmlFor="input-text">Text</Label>
        <Input id="input-text" type="text" placeholder="Enter text" />
      </Field>

      <Field>
        <Label htmlFor="input-email">Email</Label>
        <Input id="input-email" type="email" placeholder="john@example.com" />
      </Field>

      <Field>
        <Label htmlFor="input-password">Password</Label>
        <Input id="input-password" type="password" placeholder="Enter password" />
      </Field>

      <Field>
        <Label htmlFor="input-number">Number</Label>
        <Input id="input-number" type="number" placeholder="123" />
      </Field>

      <Field>
        <Label htmlFor="input-tel">Telephone</Label>
        <Input id="input-tel" type="tel" placeholder="+1 (555) 000-0000" />
      </Field>

      <Field>
        <Label htmlFor="input-url">URL</Label>
        <Input id="input-url" type="url" placeholder="https://example.com" />
      </Field>
    </div>
  ),
}