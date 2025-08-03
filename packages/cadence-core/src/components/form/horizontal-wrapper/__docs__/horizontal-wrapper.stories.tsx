import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { HorizontalWrapper } from '../horizontal-wrapper'
import { Field } from '../../field'
import { Input } from '../../input'
import { Label } from '../../primitives'

const meta: Meta<typeof HorizontalWrapper> = {
  title: 'Cadence/Components/Forms/HorizontalWrapper',
  component: HorizontalWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
      description: 'Gap between child elements',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <HorizontalWrapper {...args}>
      <Field>
        <Label htmlFor="first">First Name</Label>
        <Input id="first" placeholder="John" />
      </Field>
      <Field>
        <Label htmlFor="last">Last Name</Label>
        <Input id="last" placeholder="Doe" />
      </Field>
    </HorizontalWrapper>
  ),
  args: {
    gap: 'medium',
  },
}

export const ThreeColumns: Story = {
  render: (args) => (
    <HorizontalWrapper {...args}>
      <Field>
        <Label htmlFor="city">City</Label>
        <Input id="city" placeholder="New York" />
      </Field>
      <Field>
        <Label htmlFor="state">State</Label>
        <Input id="state" placeholder="NY" />
      </Field>
      <Field>
        <Label htmlFor="zip">ZIP</Label>
        <Input id="zip" placeholder="10001" />
      </Field>
    </HorizontalWrapper>
  ),
  args: {
    gap: 'medium',
  },
}

export const NoGap: Story = {
  render: (args) => (
    <HorizontalWrapper {...args}>
      <Input placeholder="Field 1" />
      <Input placeholder="Field 2" />
      <Input placeholder="Field 3" />
    </HorizontalWrapper>
  ),
  args: {
    gap: 'none',
  },
}

export const LargeGap: Story = {
  render: (args) => (
    <HorizontalWrapper {...args}>
      <Input placeholder="Field 1" />
      <Input placeholder="Field 2" />
    </HorizontalWrapper>
  ),
  args: {
    gap: 'large',
  },
}