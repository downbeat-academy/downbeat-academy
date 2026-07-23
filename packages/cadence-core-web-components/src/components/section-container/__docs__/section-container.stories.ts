import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../section-container';

const meta: Meta = {
  title: 'Cadence Web Components/Section Container',
  component: 'cds-section-container',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    background: {
      control: 'select',
      options: ['primary', 'faint', 'high-contrast', 'brand', 'interactive', 'success', 'warning', 'critical'],
    },
    'border-color': {
      control: 'select',
      options: ['primary', 'faint', 'brand', 'interactive', 'success', 'warning', 'critical', 'high-contrast'],
    },
  },
  render: (args) => html`
    <cds-section-container
      background=${args.background ?? ''}
      border-color=${args['border-color'] ?? 'primary'}
      style="width: 320px; padding: 24px;"
    >
      <p style="margin: 0; font-family: sans-serif; font-size: 14px;">
        Section container content goes here.
      </p>
    </cds-section-container>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { 'border-color': 'primary' },
};

export const WithBackground: Story = {
  render: () => html`
    <cds-section-container background="faint" border-color="primary" style="width: 320px; padding: 24px;">
      <p style="margin: 0; font-family: sans-serif; font-size: 14px;">Faint background</p>
    </cds-section-container>
  `,
};

export const BorderColors: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; width: 320px;">
      ${(['primary', 'faint', 'brand', 'interactive', 'success', 'warning', 'critical', 'high-contrast'] as const).map(
        (c) => html`
          <cds-section-container border-color=${c} style="padding: 12px 16px;">
            <p style="margin: 0; font-family: sans-serif; font-size: 12px; color: #555;">border-color: ${c}</p>
          </cds-section-container>
        `
      )}
    </div>
  `,
};

export const SemanticVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; width: 320px;">
      <cds-section-container background="success" border-color="success" style="padding: 16px;">
        <p style="margin: 0; font-family: sans-serif; font-size: 14px;">Success state</p>
      </cds-section-container>
      <cds-section-container background="warning" border-color="warning" style="padding: 16px;">
        <p style="margin: 0; font-family: sans-serif; font-size: 14px;">Warning state</p>
      </cds-section-container>
      <cds-section-container background="critical" border-color="critical" style="padding: 16px;">
        <p style="margin: 0; font-family: sans-serif; font-size: 14px;">Critical state</p>
      </cds-section-container>
    </div>
  `,
};

export const AsCard: Story = {
  render: () => html`
    <cds-section-container background="primary" border-color="primary" style="width: 280px;">
      <div style="background: #e2e8f0; height: 140px; display: flex; align-items: center; justify-content: center;">
        <span style="font-family: sans-serif; font-size: 12px; color: #64748b;">Image area</span>
      </div>
      <div style="padding: 16px; display: flex; flex-direction: column; gap: 8px;">
        <p style="margin: 0; font-family: sans-serif; font-size: 16px; font-weight: 600;">Card Title</p>
        <p style="margin: 0; font-family: sans-serif; font-size: 13px; color: #64748b;">
          A short description of what this card is about.
        </p>
      </div>
    </cds-section-container>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Section containers are commonly used as card shells. Slot in any content.',
      },
    },
  },
};
