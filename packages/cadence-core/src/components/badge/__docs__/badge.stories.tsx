import type { Meta, StoryObj } from "@storybook/react";
import Example from "./example";

const meta: Meta<typeof Example> = {
  title: "Badge",
  component: Example,
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Primary: Story = {
  args: {
    text: "Badge",
    // primary: true,
    // disabled: false,
    // size: "small",
    // onClick: () => console.log("Button"),
  },
};
export const Secondary: Story = {
  args: {
    text: "Badge",
    // primary: false,
    // disabled: false,
    // size: "small",
    // onClick: () => console.log("Button"),
  },
};