import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Grid } from '../index'
import { Badge } from '../../badge'

const meta: Meta<typeof Grid> = {
  title: 'Cadence / Components / Grid',
  component: Grid,
}

export default meta;
type Story = StoryObj<typeof Grid>;

export const TwelveColumns: Story = {
  args: {
    columns: 12,
    children: [
      <Badge text='Column 1' type='success' style='filled' />,
      <Badge text='Column 2' type='error' style='filled' />,
      <Badge text='Column 3' type='warning' style='filled' />,
      <Badge text='Column 4' type='success' style='filled' />,
      <Badge text='Column 5' type='error' style='filled' />,
      <Badge text='Column 6' type='warning' style='filled' />,
      <Badge text='Column 7' type='success' style='filled' />,
      <Badge text='Column 8' type='error' style='filled' />,
      <Badge text='Column 9' type='warning' style='filled' />,
      <Badge text='Column 10' type='success' style='filled' />,
      <Badge text='Column 11' type='error' style='filled' />,
      <Badge text='Column 12' type='warning' style='filled' />,
    ]
  },
}