import type { Meta, StoryObj } from '@storybook/react';
import Example from './example';

const meta: Meta<typeof Example> = {
  title: 'Button',
  component: Example,
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Primary: Story = {
  args: {
    text: 'Primary button',
    variant: 'primary',
    size: 'medium',
  }
}