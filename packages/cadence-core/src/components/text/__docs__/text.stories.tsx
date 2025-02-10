import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Text } from '../index'

const meta: Meta<typeof Text> = {
  title: "Cadence / Components / Text",
  component: Text,
}

export default meta;
type Story = StoryObj<typeof Text>;

export const Body: Story = {
  args: {
    size: 'body-base',
    type: 'productive-body',
    tag: 'p',
    color: 'primary',
    children: 'Productive Body Base'
  }
}

export const Headline: Story = {
  args: {
    size: 'h1',
    type: 'productive-headline',
    tag: 'h1',
    color: 'strong',
    children: 'Productive Headline 1'
  }
}

export const BodyVariants: Story = {
  render: () => (
    <div>
      <Text size="body-x-small" type="productive-body" tag="p" color="primary" collapse>
        Body / Extra Small
      </Text>
      <Text size="body-small" type="productive-body" tag="p" color="primary" collapse>
        Body / Small
      </Text>
      <Text size="body-base" type="productive-body" tag="p" color="primary" collapse>
        Body / Base
      </Text>
      <Text size="body-large" type="productive-body" tag="p" color="primary" collapse>
        Body / Large
      </Text>
    </div>
  )
}

export const HeadlineVariants: Story = {
  render: () => (
    <div>
      <Text size="h1" type="productive-headline" tag="h1" color="primary" collapse>
        Headline / H1
      </Text>
      <Text size="h2" type="productive-headline" tag="h2" color="primary" collapse>
        Headline / H2
      </Text>
      <Text size="h3" type="productive-headline" tag="h3" color="primary" collapse>
        Headline / H3
      </Text>
      <Text size="h4" type="productive-headline" tag="h4" color="primary" collapse>
        Headline / H4
      </Text>
      <Text size="h5" type="productive-headline" tag="h5" color="primary" collapse>
        Headline / H5
      </Text>
      <Text size="h6" type="productive-headline" tag="h6" color="primary" collapse>
        Headline / H6
      </Text>
    </div>
  )
}