import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../grid';
import '../grid-item';

const meta: Meta = {
  title: 'Cadence Web Components/Grid',
  component: 'cds-grid',
  parameters: {
    layout: 'fullscreen',
    docs: { canvas: { sourceState: 'shown' } },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: { type: 'number', min: 1, max: 12 },
    },
  },
};

export default meta;
type Story = StoryObj;

const cell = (label: string) =>
  html`<div style="background: #6366f1; color: white; padding: 16px; font-family: sans-serif; font-size: 13px; text-align: center; border-radius: 4px;">${label}</div>`;

export const TwoColumns: Story = {
  render: () => html`
    <div style="padding: 24px;">
      <cds-grid columns="2">
        ${cell('Column 1')}
        ${cell('Column 2')}
      </cds-grid>
    </div>
  `,
};

export const ThreeColumns: Story = {
  render: () => html`
    <div style="padding: 24px;">
      <cds-grid columns="3">
        ${cell('1')} ${cell('2')} ${cell('3')}
      </cds-grid>
    </div>
  `,
};

export const FourColumns: Story = {
  render: () => html`
    <div style="padding: 24px;">
      <cds-grid columns="4">
        ${cell('1')} ${cell('2')} ${cell('3')} ${cell('4')}
        ${cell('5')} ${cell('6')} ${cell('7')} ${cell('8')}
      </cds-grid>
    </div>
  `,
};

export const TwelveColumns: Story = {
  render: () => html`
    <div style="padding: 24px;">
      <cds-grid columns="12">
        ${Array.from({ length: 12 }, (_, i) => cell(`${i + 1}`))}
      </cds-grid>
    </div>
  `,
};

export const WithGridItems: Story = {
  render: () => html`
    <div style="padding: 24px;">
      <cds-grid columns="12" style="gap: 8px;">
        <cds-grid-item span="6">${cell('span 6')}</cds-grid-item>
        <cds-grid-item span="6">${cell('span 6')}</cds-grid-item>
        <cds-grid-item span="4">${cell('span 4')}</cds-grid-item>
        <cds-grid-item span="8">${cell('span 8')}</cds-grid-item>
        <cds-grid-item span="3">${cell('span 3')}</cds-grid-item>
        <cds-grid-item span="3">${cell('span 3')}</cds-grid-item>
        <cds-grid-item span="6">${cell('span 6')}</cds-grid-item>
        <cds-grid-item span="12">${cell('span 12 (full width)')}</cds-grid-item>
      </cds-grid>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Use `<cds-grid-item span="N">` to control how many columns an item spans within the grid.',
      },
    },
  },
};

export const GridItemRowSpan: Story = {
  render: () => html`
    <div style="padding: 24px;">
      <cds-grid columns="3" style="gap: 8px; grid-auto-rows: 80px;">
        <cds-grid-item span="1" row-span="2">
          <div style="background: #7c3aed; color: white; height: 100%; padding: 16px; border-radius: 4px; font-family: sans-serif; font-size: 13px; box-sizing: border-box;">
            row-span 2
          </div>
        </cds-grid-item>
        ${cell('A')} ${cell('B')} ${cell('C')} ${cell('D')}
      </cds-grid>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Use `row-span` on a `<cds-grid-item>` to span multiple rows.',
      },
    },
  },
};
