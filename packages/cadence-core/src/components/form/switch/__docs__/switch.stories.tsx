import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from '../switch'
import Example from './example'

const meta: Meta<typeof Example> = {
  title: 'Cadence / Components / Form / Switch',
  component: Switch,
}

export default meta
type Story = StoryObj<typeof Example>

export const Default: Story = {
  args: {
    id: 'switch',
  },
}