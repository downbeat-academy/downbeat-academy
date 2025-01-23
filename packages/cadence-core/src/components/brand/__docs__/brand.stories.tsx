import type { Meta, StoryObj } from '@storybook/react';
import { LogoLockup } from '../logo-lockup';
import { LogoSymbol } from '../logo-symbol';
import { LogoText } from '../logo-text';
import Example from './example';

const meta: Meta<typeof Example> = {
  title: 'Cadence / Components / Brand',
  component: LogoLockup,
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Lockup: Story = {
  args: {
    width: 300,
    color: 'brand',
  },
};