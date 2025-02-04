import type { Meta, StoryObj } from '@storybook/react';
import {
  LogoLockup,
  LogoSymbol,
  LogoText,
} from '../index';
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