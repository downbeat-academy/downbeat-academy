import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button'

const meta: Meta<typeof Button> = {
  title: 'Cadence/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['x-small', 'small', 'medium', 'large'],
    },
    isFullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    text: 'Primary Button',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    text: 'Secondary Button',
    variant: 'secondary',
  },
}

export const Ghost: Story = {
  args: {
    text: 'Ghost Button',
    variant: 'ghost',
  },
}

export const Destructive: Story = {
  args: {
    text: 'Destructive Button',
    variant: 'destructive',
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button text="X-Small" size="x-small" />
      <Button text="Small" size="small" />
      <Button text="Medium" size="medium" />
      <Button text="Large" size="large" />
    </div>
  ),
}

export const AsLink: Story = {
  args: {
    text: 'Button as Link',
    href: 'https://example.com',
    variant: 'primary',
  },
}

export const Disabled: Story = {
  args: {
    text: 'Disabled Button',
    disabled: true,
  },
}

export const FullWidth: Story = {
  args: {
    text: 'Full Width Button',
    isFullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
}