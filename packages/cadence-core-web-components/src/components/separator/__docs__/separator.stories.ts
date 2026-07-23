import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../separator';

const meta: Meta = {
  title: 'Cadence Web Components/Separator',
  component: 'cds-separator',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    color: {
      control: 'select',
      options: ['primary', 'faint', 'brand', 'interactive', 'success', 'warning', 'critical', 'high-contrast'],
    },
    decorative: {
      control: 'boolean',
    },
  },
  render: (args) => html`
    <div style="width: 300px; padding: 16px;">
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px;">Above</p>
      <cds-separator
        orientation=${args.orientation ?? 'horizontal'}
        color=${args.color ?? 'primary'}
        ?decorative=${args.decorative ?? true}
      ></cds-separator>
      <p style="margin: 8px 0 0; font-family: sans-serif; font-size: 14px;">Below</p>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { orientation: 'horizontal', color: 'primary', decorative: true },
};

export const Horizontal: Story = {
  render: () => html`
    <div style="width: 300px;">
      <p style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px;">Section A</p>
      <cds-separator></cds-separator>
      <p style="margin: 12px 0 0; font-family: sans-serif; font-size: 14px;">Section B</p>
    </div>
  `,
};

export const Vertical: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px; height: 32px;">
      <span style="font-family: sans-serif; font-size: 14px;">Left</span>
      <cds-separator orientation="vertical"></cds-separator>
      <span style="font-family: sans-serif; font-size: 14px;">Right</span>
    </div>
  `,
};

export const Colors: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <div>
        <p style="margin: 0 0 4px; font-family: sans-serif; font-size: 11px; color: #666;">primary</p>
        <cds-separator color="primary"></cds-separator>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-family: sans-serif; font-size: 11px; color: #666;">faint</p>
        <cds-separator color="faint"></cds-separator>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-family: sans-serif; font-size: 11px; color: #666;">brand</p>
        <cds-separator color="brand"></cds-separator>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-family: sans-serif; font-size: 11px; color: #666;">interactive</p>
        <cds-separator color="interactive"></cds-separator>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-family: sans-serif; font-size: 11px; color: #666;">success</p>
        <cds-separator color="success"></cds-separator>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-family: sans-serif; font-size: 11px; color: #666;">warning</p>
        <cds-separator color="warning"></cds-separator>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-family: sans-serif; font-size: 11px; color: #666;">critical</p>
        <cds-separator color="critical"></cds-separator>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-family: sans-serif; font-size: 11px; color: #666;">high-contrast</p>
        <cds-separator color="high-contrast"></cds-separator>
      </div>
    </div>
  `,
};

export const Semantic: Story = {
  render: () => html`
    <div style="width: 300px;">
      <p style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px;">Navigation section</p>
      <cds-separator decorative="false"></cds-separator>
      <p style="margin: 12px 0 0; font-family: sans-serif; font-size: 14px;">Content section</p>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Set `decorative="false"` to expose the separator to assistive technologies with `role="separator"`.',
      },
    },
  },
};
