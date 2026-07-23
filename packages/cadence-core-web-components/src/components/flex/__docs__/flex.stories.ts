import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../flex';

const meta: Meta = {
  title: 'Cadence Web Components/Flex',
  component: 'cds-flex',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'radio',
      options: ['row', 'column'],
    },
    gap: {
      control: 'select',
      options: ['none', '2x-small', 'x-small', 'small', 'medium', 'large', 'x-large', '2x-large', '3x-large'],
    },
    padding: {
      control: 'select',
      options: ['none', '2x-small', 'x-small', 'small', 'medium', 'large', 'x-large', '2x-large', '3x-large'],
    },
    'align-items': {
      control: 'select',
      options: ['stretch', 'start', 'center', 'end'],
    },
    'justify-content': {
      control: 'select',
      options: ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'],
    },
    wrap: {
      control: 'boolean',
    },
    background: {
      control: 'select',
      options: ['primary', 'faint', 'high-contrast', 'brand', 'interactive', 'success', 'warning', 'critical'],
    },
  },
};

export default meta;
type Story = StoryObj;

const box = (label: string, color = '#4f46e5') =>
  html`<div style="padding: 8px 12px; background: ${color}; color: white; border-radius: 4px; font-family: sans-serif; font-size: 12px; white-space: nowrap;">${label}</div>`;

export const Row: Story = {
  render: () => html`
    <cds-flex direction="row" gap="medium" style="width: 400px;">
      ${box('Item 1')}
      ${box('Item 2')}
      ${box('Item 3')}
    </cds-flex>
  `,
};

export const Column: Story = {
  render: () => html`
    <cds-flex direction="column" gap="medium" style="width: 200px;">
      ${box('Item 1')}
      ${box('Item 2')}
      ${box('Item 3')}
    </cds-flex>
  `,
};

export const GapSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; font-family: sans-serif;">
      ${(['none', 'x-small', 'small', 'medium', 'large', 'x-large'] as const).map(
        (g) => html`
          <div>
            <p style="margin: 0 0 4px; font-size: 11px; color: #666;">${g}</p>
            <cds-flex direction="row" gap=${g}>
              ${box('A')} ${box('B')} ${box('C')}
            </cds-flex>
          </div>
        `
      )}
    </div>
  `,
};

export const AlignItems: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; font-family: sans-serif;">
      ${(['start', 'center', 'end', 'stretch'] as const).map(
        (a) => html`
          <div>
            <p style="margin: 0 0 4px; font-size: 11px; color: #666;">align-items: ${a}</p>
            <cds-flex direction="row" gap="small" align-items=${a} style="height: 64px; background: #f1f5f9; width: 300px;">
              ${box('Short')}
              ${box('Taller<br>Item')}
              ${box('A')}
            </cds-flex>
          </div>
        `
      )}
    </div>
  `,
};

export const JustifyContent: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; font-family: sans-serif;">
      ${(['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'] as const).map(
        (j) => html`
          <div>
            <p style="margin: 0 0 4px; font-size: 11px; color: #666;">${j}</p>
            <cds-flex direction="row" gap="none" justify-content=${j} style="background: #f1f5f9; width: 400px; padding: 8px;">
              ${box('A')} ${box('B')} ${box('C')}
            </cds-flex>
          </div>
        `
      )}
    </div>
  `,
};

export const WithPadding: Story = {
  render: () => html`
    <cds-flex direction="column" gap="small" padding="large" background="faint" style="width: 300px;">
      ${box('Item 1')}
      ${box('Item 2')}
      ${box('Item 3')}
    </cds-flex>
  `,
};

export const Wrap: Story = {
  render: () => html`
    <cds-flex direction="row" gap="small" wrap style="width: 260px;">
      ${['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta'].map((n) => box(n))}
    </cds-flex>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Add `wrap` to let items flow onto multiple lines.',
      },
    },
  },
};

export const Backgrounds: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px; width: 300px;">
      ${(['primary', 'faint', 'brand', 'success', 'warning', 'critical'] as const).map(
        (bg) => html`
          <cds-flex direction="row" gap="small" padding="small" background=${bg} align-items="center">
            <span style="font-family: sans-serif; font-size: 12px;">${bg}</span>
          </cds-flex>
        `
      )}
    </div>
  `,
};
