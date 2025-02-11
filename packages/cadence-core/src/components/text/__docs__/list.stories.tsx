import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { List } from '../list'
import { Text } from '../text'
const meta: Meta<typeof List> = {
  title: "Cadence / Components / Text",
  component: List,
}

export default meta;
type Story = StoryObj<typeof List>;

export const UnorderedList: Story = {
  render: () => (
    <List type="unordered">
      <Text tag='li' type='expressive-body' color='primary' size='body-base' collapse>Item 1</Text>
      <Text tag='li' type='expressive-body' color='primary' size='body-base' collapse>Item 2</Text>
      <Text tag='li' type='expressive-body' color='primary' size='body-base' collapse>Item 3</Text>
    </List>
  )
}

export const OrderedList: Story = {
  render: () => (
    <List type="ordered">
      <Text tag='li' type='expressive-body' color='primary' size='body-base' collapse>Item 1</Text>
      <Text tag='li' type='expressive-body' color='primary' size='body-base' collapse>Item 2</Text>
      <Text tag='li' type='expressive-body' color='primary' size='body-base' collapse>Item 3</Text>
    </List>
  )
}