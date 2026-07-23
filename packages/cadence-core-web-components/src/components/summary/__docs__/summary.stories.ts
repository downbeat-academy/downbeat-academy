import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../summary';
import '../../text/text';

const meta: Meta = {
  title: 'Cadence Web Components/Summary',
  component: 'cds-summary',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    'is-open': {
      control: 'boolean',
    },
    type: {
      control: 'radio',
      options: ['contained', 'flush'],
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
    'max-width': {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <cds-summary>
      <cds-text
        slot="title"
        tag="span"
        type="productive-body"
        size="body-large"
        color="primary"
        collapse
      >
        <strong>Summary</strong>
      </cds-text>
      <cds-text type="productive-body" size="body-base" tag="p" collapse>
        Use this disclosure to hide secondary content until the reader opens it.
      </cds-text>
    </cds-summary>
  `,
};

export const InitiallyOpen: Story = {
  render: () => html`
    <cds-summary is-open>
      <cds-text
        slot="title"
        tag="span"
        type="productive-body"
        size="body-large"
        color="primary"
        collapse
      >
        <strong>Open by default</strong>
      </cds-text>
      <cds-text type="productive-body" size="body-base" tag="p" collapse>
        The disclosure starts open and can be collapsed by the reader.
      </cds-text>
    </cds-summary>
  `,
};

export const Flush: Story = {
  render: () => html`
    <cds-summary type="flush">
      <cds-text
        slot="title"
        tag="span"
        type="productive-body"
        size="body-large"
        color="primary"
        collapse
      >
        <strong>Flush variant</strong>
      </cds-text>
      <cds-text type="productive-body" size="body-base" tag="p" collapse>
        The flush variant uses a bottom border instead of a full container.
      </cds-text>
    </cds-summary>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      ${(['small', 'medium', 'large'] as const).map(
        (size) => html`
          <cds-summary size=${size}>
            <cds-text
              slot="title"
              tag="span"
              type="productive-body"
              size="body-large"
              color="primary"
              collapse
            >
              <strong>Size: ${size}</strong>
            </cds-text>
            <cds-text type="productive-body" size="body-base" tag="p" collapse>
              Padding scales with the size attribute.
            </cds-text>
          </cds-summary>
        `
      )}
    </div>
  `,
};

export const WithMaxWidth: Story = {
  render: () => html`
    <cds-summary max-width="420px">
      <cds-text
        slot="title"
        tag="span"
        type="productive-body"
        size="body-large"
        color="primary"
        collapse
      >
        <strong>Constrained width</strong>
      </cds-text>
      <cds-text type="productive-body" size="body-base" tag="p" collapse>
        Use the <code>max-width</code> attribute to cap the rendered width.
      </cds-text>
    </cds-summary>
  `,
};

export const Stacked: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      ${['Frequently asked questions', 'Shipping & returns', 'Privacy policy'].map(
        (label) => html`
          <cds-summary type="flush">
            <cds-text
              slot="title"
              tag="span"
              type="productive-body"
              size="body-large"
              color="primary"
              collapse
            >
              <strong>${label}</strong>
            </cds-text>
            <cds-text type="productive-body" size="body-base" tag="p" collapse>
              Body content for &ldquo;${label}&rdquo;.
            </cds-text>
          </cds-summary>
        `
      )}
    </div>
  `,
};
