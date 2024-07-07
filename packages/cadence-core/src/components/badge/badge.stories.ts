import type { Meta, StoryObj } from "@storybook/react/*";
import { Badge } from "./badge";

const meta: Meta = {
  title: 'Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: 'Primary Badge',
  },
}