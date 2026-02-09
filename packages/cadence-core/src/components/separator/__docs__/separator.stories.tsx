import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '../index';

const meta: Meta<typeof Separator> = {
  title: 'Cadence / Components / Separator',
  component: Separator,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'faint',
        'brand',
        'interactive',
        'success',
        'warning',
        'critical',
        'high-contrast',
      ],
    },
    decorative: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    color: 'primary',
    decorative: true,
  },
};

export const Faint: Story = {
  args: {
    color: 'faint',
  },
};

export const Brand: Story = {
  args: {
    color: 'brand',
  },
};

export const Interactive: Story = {
  args: {
    color: 'interactive',
  },
};

export const Success: Story = {
  args: {
    color: 'success',
  },
};

export const Warning: Story = {
  args: {
    color: 'warning',
  },
};

export const Critical: Story = {
  args: {
    color: 'critical',
  },
};

export const HighContrast: Story = {
  args: {
    color: 'high-contrast',
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    color: 'primary',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', height: '100px', alignItems: 'center', gap: '16px' }}>
        <span>Left</span>
        <Story />
        <span>Right</span>
      </div>
    ),
  ],
};
