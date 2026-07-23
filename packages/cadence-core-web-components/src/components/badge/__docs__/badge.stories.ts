import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../badge';

const meta: Meta = {
  title: 'Cadence Web Components/Badge',
  component: 'cds-badge',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'error', 'highlight'],
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'light'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  render: (args) => html`
    <cds-badge
      type=${args.type ?? 'neutral'}
      variant=${args.variant ?? 'filled'}
      size=${args.size ?? 'medium'}
    >
      ${args.label ?? 'Badge'}
    </cds-badge>
  `,
};

export default meta;
type Story = StoryObj;

// --- Variant stories ---

export const Filled: Story = {
  args: { label: 'Filled', variant: 'filled', type: 'neutral' },
};

export const Outlined: Story = {
  args: { label: 'Outlined', variant: 'outlined', type: 'neutral' },
};

export const Light: Story = {
  args: { label: 'Light', variant: 'light', type: 'neutral' },
};

// --- Type stories ---

export const Types: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <cds-badge type="neutral">Neutral</cds-badge>
      <cds-badge type="info">Info</cds-badge>
      <cds-badge type="success">Success</cds-badge>
      <cds-badge type="warning">Warning</cds-badge>
      <cds-badge type="error">Error</cds-badge>
      <cds-badge type="highlight">Highlight</cds-badge>
    </div>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <p style="margin: 0 0 8px; font-size: 12px; color: #666; font-family: sans-serif;">Filled</p>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <cds-badge variant="filled" type="neutral">Neutral</cds-badge>
          <cds-badge variant="filled" type="info">Info</cds-badge>
          <cds-badge variant="filled" type="success">Success</cds-badge>
          <cds-badge variant="filled" type="warning">Warning</cds-badge>
          <cds-badge variant="filled" type="error">Error</cds-badge>
          <cds-badge variant="filled" type="highlight">Highlight</cds-badge>
        </div>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-size: 12px; color: #666; font-family: sans-serif;">Outlined</p>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <cds-badge variant="outlined" type="neutral">Neutral</cds-badge>
          <cds-badge variant="outlined" type="info">Info</cds-badge>
          <cds-badge variant="outlined" type="success">Success</cds-badge>
          <cds-badge variant="outlined" type="warning">Warning</cds-badge>
          <cds-badge variant="outlined" type="error">Error</cds-badge>
          <cds-badge variant="outlined" type="highlight">Highlight</cds-badge>
        </div>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-size: 12px; color: #666; font-family: sans-serif;">Light</p>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <cds-badge variant="light" type="neutral">Neutral</cds-badge>
          <cds-badge variant="light" type="info">Info</cds-badge>
          <cds-badge variant="light" type="success">Success</cds-badge>
          <cds-badge variant="light" type="warning">Warning</cds-badge>
          <cds-badge variant="light" type="error">Error</cds-badge>
          <cds-badge variant="light" type="highlight">Highlight</cds-badge>
        </div>
      </div>
    </div>
  `,
};

// --- Size stories ---

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; align-items: center;">
      <cds-badge size="small">Small</cds-badge>
      <cds-badge size="medium">Medium</cds-badge>
      <cds-badge size="large">Large</cds-badge>
    </div>
  `,
};

// --- Icon stories ---

const starIcon = html`
  <svg
    slot="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width="12"
    height="12"
    fill="currentColor"
  >
    <path d="M8 1l1.9 3.8L14 5.7l-3 2.9.7 4.1L8 10.8l-3.7 1.9.7-4.1-3-2.9 4.1-.9z"/>
  </svg>
`;

const checkIcon = html`
  <svg
    slot="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width="12"
    height="12"
    fill="none"
    stroke="currentColor"
    stroke-width="2.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="2 8 6 12 14 4" />
  </svg>
`;

export const WithIcon: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <cds-badge type="success" variant="filled">${checkIcon} Published</cds-badge>
      <cds-badge type="highlight" variant="light">${starIcon} Featured</cds-badge>
      <cds-badge type="info" variant="outlined">${checkIcon} Active</cds-badge>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Use the `icon` slot to add an icon before the badge text.',
      },
    },
  },
};

export const IconOnly: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; align-items: center;">
      <cds-badge type="success" variant="filled">${checkIcon}</cds-badge>
      <cds-badge type="success" variant="light">${checkIcon}</cds-badge>
      <cds-badge type="success" variant="outlined">${checkIcon}</cds-badge>
    </div>
  `,
};
