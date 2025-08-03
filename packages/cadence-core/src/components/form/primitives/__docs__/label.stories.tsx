import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '../label'

const meta: Meta<typeof Label> = {
  title: 'Cadence/Components/Forms/Primitives/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: 'text',
      description: 'ID of the form element this label is for',
    },
    children: {
      control: 'text',
      description: 'Label text content',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Label text',
  },
}

export const WithHtmlFor: Story = {
  args: {
    htmlFor: 'input-id',
    children: 'Click me to focus the input',
  },
}

export const RequiredField: Story = {
  args: {
    children: 'Required Field',
  },
}

export const LongLabel: Story = {
  args: {
    children: 'This is a very long label that might wrap to multiple lines in narrow containers',
  },
}