import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '../input'
import Example from './example'

const meta: Meta<typeof Example> = {
  title: 'Cadence / Components / Form / Input',
  component: Input,
}

export default meta
type Story = StoryObj<typeof Example>

export const Default: Story = {
  args: {
    name: 'input',
    placeholder: 'Placeholder text',
  },
}