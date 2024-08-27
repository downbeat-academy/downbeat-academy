import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from '../index'
import Example from "./example";

const meta: Meta<typeof Example> = {
  title: "Cadence / Components / Badge",
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Neutral: Story = {
  args: {
    text: 'Neutral badge',
    type: 'neutral',
    size: 'medium',
    style: 'filled',
  },
};

export const Info: Story = {
  args: {
    text: 'Info badge',
    type: 'info',
    size: 'medium',
    style: 'filled',
  },
}

export const Success: Story = {
  args: {
    text: 'Success badge',
    type: 'success',
    size: 'medium',
    style: 'filled',
  },
}

export const Highlight: Story = {
  args: {
    text: 'Highlight badge',
    type: 'highlight',
    size: 'medium',
    style: 'filled',
  },
}

export const Warning: Story = {
  args: {
    text: 'Warning badge',
    type: 'warning',
    size: 'medium',
    style: 'filled',
  },
}

export const Error: Story = {
  args: {
    text: 'Error badge',
    type: 'error',
    size: 'medium',
    style: 'filled',
  },
}
