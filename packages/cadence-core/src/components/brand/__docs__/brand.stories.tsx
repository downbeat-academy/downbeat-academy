import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  LogoLockup,
} from '../index';

const meta: Meta<typeof LogoLockup> = {
  title: 'Cadence / Components / Brand',
  component: LogoLockup,
};

export default meta;
type Story = StoryObj<typeof LogoLockup>;

export const Lockup: Story = {
  args: {
    width: 300,
    color: 'brand',
  },
};