import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../skeleton-loader';

const meta: Meta = {
  title: 'Cadence Web Components/Skeleton Loader',
  component: 'cds-skeleton-loader',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: { type: 'number', min: 1, max: 10 },
    },
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    'border-radius': {
      control: 'text',
    },
    circle: {
      control: 'boolean',
    },
    inline: {
      control: 'boolean',
    },
    direction: {
      control: 'radio',
      options: ['ltr', 'rtl'],
    },
    duration: {
      control: { type: 'number', min: 0.5, max: 5, step: 0.5 },
    },
    'no-animation': {
      control: 'boolean',
    },
  },
  render: (args) => html`
    <div style="width: 320px;">
      <cds-skeleton-loader
        count=${args.count ?? 1}
        width=${args.width ?? '100%'}
        height=${args.height ?? ''}
        border-radius=${args['border-radius'] ?? 'var(--cds-radii-medium)'}
        ?circle=${args.circle}
        ?inline=${args.inline}
        direction=${args.direction ?? 'ltr'}
        duration=${args.duration ?? 1.5}
        ?no-animation=${args['no-animation']}
      ></cds-skeleton-loader>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { count: 1, width: '100%' },
};

export const MultipleLines: Story = {
  render: () => html`
    <div style="width: 320px; display: flex; flex-direction: column; gap: 8px;">
      <cds-skeleton-loader count="3"></cds-skeleton-loader>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Use `count` to render multiple skeleton lines stacked vertically.',
      },
    },
  },
};

export const CustomDimensions: Story = {
  render: () => html`
    <div style="width: 320px; display: flex; flex-direction: column; gap: 12px;">
      <cds-skeleton-loader width="100%" height="48px"></cds-skeleton-loader>
      <cds-skeleton-loader width="60%" height="16px"></cds-skeleton-loader>
      <cds-skeleton-loader width="80%" height="16px"></cds-skeleton-loader>
    </div>
  `,
};

export const Circle: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center;">
      <cds-skeleton-loader circle width="40px"></cds-skeleton-loader>
      <cds-skeleton-loader circle width="64px"></cds-skeleton-loader>
      <cds-skeleton-loader circle width="80px"></cds-skeleton-loader>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Use `circle` to render round skeletons — useful for avatars.',
      },
    },
  },
};

export const ContentPlaceholder: Story = {
  render: () => html`
    <div style="width: 320px; display: flex; gap: 12px; align-items: flex-start;">
      <cds-skeleton-loader circle width="48px" style="flex-shrink: 0;"></cds-skeleton-loader>
      <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
        <cds-skeleton-loader width="60%" height="14px"></cds-skeleton-loader>
        <cds-skeleton-loader width="100%" height="14px"></cds-skeleton-loader>
        <cds-skeleton-loader width="80%" height="14px"></cds-skeleton-loader>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Compose skeleton items to match the layout of the content being loaded.',
      },
    },
  },
};

export const CardPlaceholder: Story = {
  render: () => html`
    <div style="width: 320px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <cds-skeleton-loader width="100%" height="180px" border-radius="0"></cds-skeleton-loader>
      <div style="padding: 16px; display: flex; flex-direction: column; gap: 8px;">
        <cds-skeleton-loader width="70%" height="20px"></cds-skeleton-loader>
        <cds-skeleton-loader width="100%" height="14px"></cds-skeleton-loader>
        <cds-skeleton-loader width="90%" height="14px"></cds-skeleton-loader>
        <cds-skeleton-loader width="40%" height="14px"></cds-skeleton-loader>
      </div>
    </div>
  `,
};

export const Inline: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px;">
      <cds-skeleton-loader inline width="80px" height="28px"></cds-skeleton-loader>
      <cds-skeleton-loader inline width="80px" height="28px"></cds-skeleton-loader>
      <cds-skeleton-loader inline width="80px" height="28px"></cds-skeleton-loader>
    </div>
  `,
};

export const NoAnimation: Story = {
  render: () => html`
    <div style="width: 320px; display: flex; flex-direction: column; gap: 8px;">
      <cds-skeleton-loader count="3" no-animation></cds-skeleton-loader>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Use `no-animation` to disable the shimmer effect (e.g. for reduced-motion environments).',
      },
    },
  },
};
