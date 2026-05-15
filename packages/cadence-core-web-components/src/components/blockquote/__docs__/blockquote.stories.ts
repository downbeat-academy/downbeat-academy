import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../blockquote';

const meta: Meta = {
  title: 'Cadence Web Components/Blockquote',
  component: 'cds-blockquote',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    attribution: {
      control: 'text',
    },
    link: {
      control: 'text',
    },
    collapse: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <cds-blockquote attribution="Maya Angelou">
      I've learned that people will forget what you said, people will forget what you did, but
      people will never forget how you made them feel.
    </cds-blockquote>
  `,
};

export const WithLinkedAttribution: Story = {
  render: () => html`
    <cds-blockquote
      attribution="Brian Eno"
      link="https://en.wikipedia.org/wiki/Brian_Eno"
    >
      Honor thy error as a hidden intention.
    </cds-blockquote>
  `,
};

export const NoAttribution: Story = {
  render: () => html`
    <cds-blockquote>
      Music is the silence between the notes.
    </cds-blockquote>
  `,
};

export const Collapse: Story = {
  render: () => html`
    <div style="border: 1px dashed #ccc; padding: 16px;">
      <p>Surrounding content above.</p>
      <cds-blockquote collapse attribution="Anonymous">
        With <code>collapse</code>, the outer margin is removed.
      </cds-blockquote>
      <p>Surrounding content below.</p>
    </div>
  `,
};
