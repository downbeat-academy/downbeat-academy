import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../section-title';
import '../../text/text';

const meta: Meta = {
  title: 'Cadence Web Components/Section Title',
  component: 'cds-section-title',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    alignment: {
      control: 'radio',
      options: ['left', 'center', 'right'],
    },
    background: {
      control: 'select',
      options: ['primary', 'faint', 'high-contrast', 'brand', 'interactive', 'success', 'warning', 'critical'],
    },
    'has-border': {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <cds-section-title>
      <cds-text slot="title" type="productive-headline" size="h2" tag="h2" collapse>Section title</cds-text>
      <cds-text slot="subtitle" type="productive-body" size="body-base" color="faint" tag="p" collapse>
        A short subtitle that adds context.
      </cds-text>
    </cds-section-title>
  `,
};

export const TitleOnly: Story = {
  render: () => html`
    <cds-section-title>
      <cds-text slot="title" type="productive-headline" size="h3" tag="h2" collapse>Section title</cds-text>
    </cds-section-title>
  `,
};

export const Alignments: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      ${(['left', 'center', 'right'] as const).map(
        (alignment) => html`
          <cds-section-title alignment=${alignment}>
            <cds-text slot="title" type="productive-headline" size="h3" tag="h2" collapse>
              alignment="${alignment}"
            </cds-text>
            <cds-text slot="subtitle" type="productive-body" size="body-base" color="faint" tag="p" collapse>
              Subtitle inherits alignment from the parent.
            </cds-text>
          </cds-section-title>
        `
      )}
    </div>
  `,
};

export const WithoutBorder: Story = {
  render: () => html`
    <cds-section-title .hasBorder=${false}>
      <cds-text slot="title" type="productive-headline" size="h3" tag="h2" collapse>No border</cds-text>
      <cds-text slot="subtitle" type="productive-body" size="body-base" color="faint" tag="p" collapse>
        Useful when stacking section titles inside a card.
      </cds-text>
    </cds-section-title>
  `,
};

export const WithBackground: Story = {
  render: () => html`
    <cds-section-title background="faint">
      <cds-text slot="title" type="productive-headline" size="h3" tag="h2" collapse>Faint background</cds-text>
      <cds-text slot="subtitle" type="productive-body" size="body-base" color="faint" tag="p" collapse>
        Tint the section to set it apart from surrounding content.
      </cds-text>
    </cds-section-title>
  `,
};

export const WithBodyContent: Story = {
  render: () => html`
    <cds-section-title>
      <cds-text slot="title" type="productive-headline" size="h3" tag="h2" collapse>Section title</cds-text>
      <cds-text slot="subtitle" type="productive-body" size="body-base" color="faint" tag="p" collapse>
        Use the default slot for body content rendered below the subtitle.
      </cds-text>
      <cds-text type="productive-body" size="body-base" tag="p" collapse>
        Default-slot content appears after the title and subtitle.
      </cds-text>
    </cds-section-title>
  `,
};
