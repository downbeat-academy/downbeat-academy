import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../banner';

const meta: Meta = {
  title: 'Cadence Web Components/Banner',
  component: 'cds-banner',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary'],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <cds-banner>
      <span>Heads up — this is a banner message.</span>
    </cds-banner>
  `,
};

export const WithType: Story = {
  render: (args) => html`
    <cds-banner type=${args.type ?? 'primary'}>
      <span>Banner with type="${args.type ?? 'primary'}"</span>
    </cds-banner>
  `,
  args: {
    type: 'primary',
  },
};

export const WithActions: Story = {
  render: () => html`
    <cds-banner>
      <section>Save 10% on your first year — limited time.</section>
      <aside style="display: flex; gap: 8px;">
        <button>Dismiss</button>
        <button>Learn more</button>
      </aside>
    </cds-banner>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'cds-banner is a thin single-slot wrapper. Compose content and actions inside it using semantic `<section>` and `<aside>` elements.',
      },
    },
  },
};

export const AllTypes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 4px;">
      <cds-banner type="primary"><span>Primary banner</span></cds-banner>
      <cds-banner type="secondary"><span>Secondary banner</span></cds-banner>
      <cds-banner type="tertiary"><span>Tertiary banner</span></cds-banner>
    </div>
  `,
};
