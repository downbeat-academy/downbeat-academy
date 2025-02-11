import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from '../../badge';
import { Flex } from '../index'

const meta: Meta<typeof Flex> = {
  title: "Cadence / Components / Flex",
  component: Flex,
}

export default meta;
type Story = StoryObj<typeof Flex>;

export const Row: Story = {
  args: {
    direction: 'row',
    gap: 'medium',
    children: [
      <Badge text='Item 1' type='success' style='outlined' />,
      <Badge text='Item 2' type='error' style='filled' />,
      <Badge text='Item 3' type='warning' style='light' />,
    ]
  }
}

export const Column: Story = {
  args: {
    direction: 'column',
    gap: 'medium',
    children: [
      <Badge text='Item 1' type='success' style='outlined' />,
      <Badge text='Item 2' type='error' style='filled' />,
      <Badge text='Item 3' type='warning' style='light' />,
    ]
  }
}
