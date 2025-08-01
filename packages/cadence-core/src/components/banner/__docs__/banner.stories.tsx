import type { Meta, StoryObj } from "@storybook/react";
import { Banner, BannerActions, BannerContent } from '../index'

const meta: Meta<typeof Banner> = {
  title: "Cadence / Components / Banner",
  component: Banner,
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  args: {
    children: 'This is a default banner message',
  },
};

export const Primary: Story = {
  args: {
    type: 'primary',
    children: 'This is a primary banner message',
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    children: 'This is a secondary banner message',
  },
};

export const Tertiary: Story = {
  args: {
    type: 'tertiary',
    children: 'This is a tertiary banner message',
  },
};

export const WithContentAndActions: Story = {
  args: {
    children: (
      <>
        <BannerContent>
          This banner includes both content and actions
        </BannerContent>
        <BannerActions>
          <button>Action 1</button>
          <button>Action 2</button>
        </BannerActions>
      </>
    ),
  },
};