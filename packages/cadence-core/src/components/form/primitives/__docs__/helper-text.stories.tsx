import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { HelperText } from '../helper-text'

const meta: Meta<typeof HelperText> = {
  title: 'Cadence/Components/Forms/Primitives/HelperText',
  component: HelperText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Helper text content',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is helper text to provide additional context',
  },
}

export const ShortText: Story = {
  args: {
    children: 'Required field',
  },
}

export const LongText: Story = {
  args: {
    children: 'This is a longer helper text that provides detailed instructions about how to fill out the form field correctly. It may wrap to multiple lines.',
  },
}

export const WithFormatting: Story = {
  render: () => (
    <HelperText>
      Password must contain at least:
      <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
        <li>8 characters</li>
        <li>One uppercase letter</li>
        <li>One number</li>
      </ul>
    </HelperText>
  ),
}