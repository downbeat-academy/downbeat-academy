import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../text';

const meta: Meta = {
  title: 'Cadence Web Components/Text',
  component: 'cds-text',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['productive-body', 'productive-headline', 'expressive-body', 'expressive-headline'],
    },
    size: {
      control: 'select',
      options: ['mega', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body-large', 'body-base', 'body-small', 'body-x-small'],
    },
    color: {
      control: 'select',
      options: ['primary', 'strong', 'faint', 'disabled', 'high-contrast', 'warning', 'critical', 'interactive', 'brand', 'success'],
    },
    align: {
      control: 'radio',
      options: ['left', 'center', 'right', 'justify'],
    },
    collapse: {
      control: 'boolean',
    },
    tag: {
      control: 'select',
      options: ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'label'],
    },
  },
  render: (args) => html`
    <cds-text
      type=${args.type ?? 'productive-body'}
      size=${args.size ?? 'body-base'}
      color=${args.color ?? 'primary'}
      align=${args.align ?? 'left'}
      ?collapse=${args.collapse}
      tag=${args.tag ?? 'div'}
    >
      ${args.label ?? 'The quick brown fox jumps over the lazy dog.'}
    </cds-text>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'The quick brown fox jumps over the lazy dog.',
    type: 'productive-body',
    size: 'body-base',
  },
};

export const ProductiveHeadlines: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0;">
      <cds-text type="productive-headline" size="h1" collapse>Heading 1</cds-text>
      <cds-text type="productive-headline" size="h2" collapse>Heading 2</cds-text>
      <cds-text type="productive-headline" size="h3" collapse>Heading 3</cds-text>
      <cds-text type="productive-headline" size="h4" collapse>Heading 4</cds-text>
      <cds-text type="productive-headline" size="h5" collapse>Heading 5</cds-text>
      <cds-text type="productive-headline" size="h6" collapse>Heading 6</cds-text>
    </div>
  `,
};

export const ExpressiveHeadlines: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0;">
      <cds-text type="expressive-headline" size="mega" collapse>Mega</cds-text>
      <cds-text type="expressive-headline" size="h1" collapse>Heading 1</cds-text>
      <cds-text type="expressive-headline" size="h2" collapse>Heading 2</cds-text>
      <cds-text type="expressive-headline" size="h3" collapse>Heading 3</cds-text>
      <cds-text type="expressive-headline" size="h4" collapse>Heading 4</cds-text>
      <cds-text type="expressive-headline" size="h5" collapse>Heading 5</cds-text>
      <cds-text type="expressive-headline" size="h6" collapse>Heading 6</cds-text>
    </div>
  `,
};

export const ProductiveBodySizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0;">
      <cds-text type="productive-body" size="body-large" collapse>Body Large — The quick brown fox jumps over the lazy dog.</cds-text>
      <cds-text type="productive-body" size="body-base" collapse>Body Base — The quick brown fox jumps over the lazy dog.</cds-text>
      <cds-text type="productive-body" size="body-small" collapse>Body Small — The quick brown fox jumps over the lazy dog.</cds-text>
      <cds-text type="productive-body" size="body-x-small" collapse>Body X-Small — The quick brown fox jumps over the lazy dog.</cds-text>
    </div>
  `,
};

export const ExpressiveBodySizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0;">
      <cds-text type="expressive-body" size="body-large" collapse>Body Large — The quick brown fox jumps over the lazy dog.</cds-text>
      <cds-text type="expressive-body" size="body-base" collapse>Body Base — The quick brown fox jumps over the lazy dog.</cds-text>
      <cds-text type="expressive-body" size="body-small" collapse>Body Small — The quick brown fox jumps over the lazy dog.</cds-text>
      <cds-text type="expressive-body" size="body-x-small" collapse>Body X-Small — The quick brown fox jumps over the lazy dog.</cds-text>
    </div>
  `,
};

export const Colors: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 4px;">
      <cds-text color="primary" collapse>Primary color</cds-text>
      <cds-text color="strong" collapse>Strong color</cds-text>
      <cds-text color="faint" collapse>Faint color</cds-text>
      <cds-text color="disabled" collapse>Disabled color</cds-text>
      <cds-text color="interactive" collapse>Interactive color</cds-text>
      <cds-text color="brand" collapse>Brand color</cds-text>
      <cds-text color="success" collapse>Success color</cds-text>
      <cds-text color="warning" collapse>Warning color</cds-text>
      <cds-text color="critical" collapse>Critical color</cds-text>
    </div>
  `,
};

export const Alignment: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 400px;">
      <cds-text align="left" collapse>Left-aligned text</cds-text>
      <cds-text align="center" collapse>Center-aligned text</cds-text>
      <cds-text align="right" collapse>Right-aligned text</cds-text>
    </div>
  `,
};

export const WithSemanticTag: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <cds-text type="productive-headline" size="h2" tag="h2" collapse>This renders as an H2 element</cds-text>
      <cds-text type="productive-body" size="body-base" tag="p" collapse>This renders as a paragraph element.</cds-text>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Use the `tag` attribute to control the semantic HTML element rendered inside the shadow DOM.',
      },
    },
  },
};

export const Collapse: Story = {
  render: () => html`
    <div style="border: 1px dashed #ccc; padding: 8px; width: 300px;">
      <cds-text size="body-base" collapse>
        With <code>collapse</code>, bottom margin is removed — useful inside tight layouts.
      </cds-text>
    </div>
  `,
};
