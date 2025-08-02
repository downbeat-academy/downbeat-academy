import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from '../textarea'
import { Field } from '../../field'
import { Label } from '../../primitives'

const meta: Meta<typeof Textarea> = {
  title: 'Cadence/Components/Forms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the textarea',
    },
    rows: {
      control: 'number',
      description: 'Number of visible text rows',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the textarea is read-only',
    },
    required: {
      control: 'boolean',
      description: 'Whether the textarea is required',
    },
    value: {
      control: 'text',
      description: 'The value of the textarea',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
    rows: 5,
  },
}

export const WithLabel: Story = {
  render: (args) => (
    <Field>
      <Label htmlFor="textarea-with-label">Message</Label>
      <Textarea id="textarea-with-label" {...args} />
    </Field>
  ),
  args: {
    placeholder: 'Type your message here...',
    rows: 5,
  },
}

export const SmallTextarea: Story = {
  args: {
    placeholder: 'Small textarea',
    rows: 3,
  },
}

export const LargeTextarea: Story = {
  args: {
    placeholder: 'Large textarea for longer content',
    rows: 10,
  },
}

export const Required: Story = {
  render: (args) => (
    <Field>
      <Label htmlFor="textarea-required">Description</Label>
      <Textarea id="textarea-required" {...args} />
    </Field>
  ),
  args: {
    placeholder: 'Please provide a detailed description',
    required: true,
    rows: 6,
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'This textarea is disabled',
    disabled: true,
    rows: 5,
  },
}

export const ReadOnly: Story = {
  args: {
    value: 'This is read-only content.\nYou cannot edit this text.\nIt spans multiple lines.',
    readOnly: true,
    rows: 5,
  },
}

export const WithContent: Story = {
  args: {
    value: 'This textarea has pre-filled content that can be edited.',
    rows: 5,
  },
}