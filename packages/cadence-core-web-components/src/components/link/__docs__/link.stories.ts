import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../link';

const meta: Meta = {
  title: 'Cadence Web Components/Link',
  component: 'cds-link',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'brand', 'inherit'],
    },
    'no-underline': {
      control: 'boolean',
      description: 'When set, removes the underline decoration.',
    },
    href: {
      control: 'text',
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
    },
  },
  render: (args) => html`
    <cds-link
      type=${args.type ?? 'primary'}
      href=${args.href ?? '#'}
      ?no-underline=${args['no-underline']}
    >
      ${args.label ?? 'Click here to learn more'}
    </cds-link>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { label: 'Click here to learn more', type: 'primary', href: '#' },
};

export const Types: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px; font-family: sans-serif; font-size: 14px;">
      <cds-link type="primary" href="#">Primary link</cds-link>
      <cds-link type="secondary" href="#">Secondary link</cds-link>
      <cds-link type="brand" href="#">Brand link</cds-link>
      <span style="color: var(--cds-color-foreground-faint, #666);">
        <cds-link type="inherit" href="#">Inherit color link</cds-link>
      </span>
    </div>
  `,
};

export const WithoutUnderline: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px; font-family: sans-serif; font-size: 14px;">
      <cds-link type="primary" href="#">With underline (default)</cds-link>
      <cds-link type="primary" href="#" no-underline>Without underline</cds-link>
    </div>
  `,
};

export const InlineInText: Story = {
  render: () => html`
    <p style="font-family: sans-serif; font-size: 14px; max-width: 400px; line-height: 1.6;">
      Downbeat Academy is an online music education platform. Learn more about our
      <cds-link href="#">courses</cds-link> or visit the
      <cds-link type="secondary" href="#">resource library</cds-link>.
    </p>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Links are inline by default and flow naturally inside paragraphs.',
      },
    },
  },
};

export const ExternalLink: Story = {
  render: () => html`
    <cds-link href="https://example.com" target="_blank" rel="noopener noreferrer">
      Open in new tab
    </cds-link>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Use `target="_blank"` with `rel="noopener noreferrer"` for external links.',
      },
    },
  },
};

export const FocusStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; font-family: sans-serif; font-size: 14px;">
      <p style="margin: 0; font-size: 12px; color: #666;">Use Tab to navigate and see focus rings.</p>
      <div style="display: flex; gap: 24px;">
        <cds-link type="primary" href="#">Primary</cds-link>
        <cds-link type="secondary" href="#">Secondary</cds-link>
        <cds-link type="brand" href="#">Brand</cds-link>
      </div>
    </div>
  `,
};
