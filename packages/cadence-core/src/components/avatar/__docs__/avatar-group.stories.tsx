import React from 'react';
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarGroup } from '../index'

const meta: Meta<typeof AvatarGroup> = {
  title: "Cadence / Components / AvatarGroup",
  component: AvatarGroup,
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

export const OverlapSmall: Story = {
  args: {
    spacing: 'overlap-small',
    direction: 'horizontal',
  },
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar name="Alice" size="medium" />
      <Avatar name="Bob" size="medium" />
      <Avatar name="Charlie" size="medium" />
    </AvatarGroup>
  ),
};

export const OverlapLarge: Story = {
  args: {
    spacing: 'overlap-large',
    direction: 'horizontal',
  },
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar name="Alice" size="medium" />
      <Avatar name="Bob" size="medium" />
      <Avatar name="Charlie" size="medium" />
    </AvatarGroup>
  ),
};

export const SpacingSmall: Story = {
  args: {
    spacing: 'small',
    direction: 'horizontal',
  },
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar name="Alice" size="medium" />
      <Avatar name="Bob" size="medium" />
      <Avatar name="Charlie" size="medium" />
    </AvatarGroup>
  ),
};

export const SpacingLarge: Story = {
  args: {
    spacing: 'large',
    direction: 'horizontal',
  },
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar name="Alice" size="medium" />
      <Avatar name="Bob" size="medium" />
      <Avatar name="Charlie" size="medium" />
    </AvatarGroup>
  ),
};

export const Vertical: Story = {
  args: {
    spacing: 'small',
    direction: 'vertical',
  },
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar name="Alice" size="medium" />
      <Avatar name="Bob" size="medium" />
      <Avatar name="Charlie" size="medium" />
    </AvatarGroup>
  ),
};
