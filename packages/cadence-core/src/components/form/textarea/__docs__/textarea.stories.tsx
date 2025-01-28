import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from '../textarea'
import Example from './example'

const meta: Meta<typeof Example> = {
  title: 'Cadence / Components / Form / Textarea',
  component: Textarea,
}

export default meta
type Story = StoryObj<typeof Example>

export const Default: Story = {
  args: {
    name: 'textarea',
    placeholder: 'Placeholder text',
  }
}