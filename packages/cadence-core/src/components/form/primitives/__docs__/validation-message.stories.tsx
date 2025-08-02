import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ValidationMessage } from '../validation-message'

const meta: Meta<typeof ValidationMessage> = {
  title: 'Cadence/Components/Forms/Primitives/ValidationMessage',
  component: ValidationMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'warning', 'error'],
      description: 'Type of validation message',
    },
    children: {
      control: 'text',
      description: 'Validation message content',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: {
    type: 'success',
    children: 'Field validated successfully',
  },
}

export const Warning: Story = {
  args: {
    type: 'warning',
    children: 'This value might cause issues',
  },
}

export const Error: Story = {
  args: {
    type: 'error',
    children: 'This field is required',
  },
}

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <ValidationMessage type="success">Username is available</ValidationMessage>
      <ValidationMessage type="warning">Password could be stronger</ValidationMessage>
      <ValidationMessage type="error">Email address is invalid</ValidationMessage>
    </div>
  ),
}

export const LongMessage: Story = {
  args: {
    type: 'error',
    children: 'This is a longer validation message that provides detailed information about what went wrong and how to fix it.',
  },
}