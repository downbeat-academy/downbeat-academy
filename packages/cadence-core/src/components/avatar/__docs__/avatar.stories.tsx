import React from 'react';
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from '../index'

const meta: Meta<typeof Avatar> = {
  title: "Cadence / Components / Avatar",
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    name: 'Jane Smith',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    name: 'John Doe',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    name: 'Alex Johnson',
    size: 'large',
  },
};

export const WithImageUrl: Story = {
  args: {
    name: 'John Doe',
    size: 'medium',
    imageUrl: 'https://i.pravatar.cc/64',
  },
};

export const WithImageUrlLarge: Story = {
  args: {
    name: 'John Doe',
    size: 'large',
    imageUrl: 'https://i.pravatar.cc/80',
  },
};
