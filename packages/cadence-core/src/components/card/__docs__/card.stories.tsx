import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, CardImage } from '../index'

const meta: Meta<typeof Card> = {
  title: "Cadence / Components / Card",
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'This is a default card',
  },
};

export const WithBorderPrimary: Story = {
  args: {
    borderColor: 'primary',
    children: 'Card with primary border',
  },
};

export const WithBorderFaint: Story = {
  args: {
    borderColor: 'faint',
    children: 'Card with faint border',
  },
};

export const WithBorderNone: Story = {
  args: {
    borderColor: 'none',
    children: 'Card with no border',
  },
};

export const AsArticle: Story = {
  args: {
    tag: 'article',
    borderColor: 'primary',
    children: 'Card rendered as an article element',
  },
};

export const WithContentAndImage: Story = {
  args: {
    borderColor: 'primary',
    children: (
      <>
        <CardImage 
          image="https://via.placeholder.com/300x200" 
          alt="Sample image" 
          url="#"
        />
        <CardContent>
          <h3>Card Title</h3>
          <p>This is a card with both image and content components.</p>
        </CardContent>
      </>
    ),
  },
};

export const ContentOnly: Story = {
  args: {
    borderColor: 'faint',
    children: (
      <CardContent background="secondary">
        <h3>Content Card</h3>
        <p>This card contains only content with a secondary background.</p>
      </CardContent>
    ),
  },
};