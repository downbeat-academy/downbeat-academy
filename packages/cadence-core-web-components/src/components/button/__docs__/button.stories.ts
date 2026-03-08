import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../button';

const meta: Meta = {
  title: 'Cadence Web Components/Button',
  component: 'cds-button',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['x-small', 'small', 'medium', 'large'],
    },
    'full-width': {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    'icon-position': {
      control: 'radio',
      options: ['leading', 'trailing'],
      description: 'Position of the icon relative to the button text',
    },
  },
  render: (args) => html`
    <cds-button
      variant=${args.variant ?? 'primary'}
      size=${args.size ?? 'medium'}
      ?full-width=${args['full-width']}
      ?disabled=${args.disabled}
      icon-position=${args['icon-position'] ?? 'leading'}
    >
      ${args.label ?? 'Button'}
    </cds-button>
  `,
};

export default meta;
type Story = StoryObj;

// --- Variant stories ---

export const Primary: Story = {
  args: { label: 'Primary Button', variant: 'primary' },
};

export const Secondary: Story = {
  args: { label: 'Secondary Button', variant: 'secondary' },
};

export const Ghost: Story = {
  args: { label: 'Ghost Button', variant: 'ghost' },
};

export const Destructive: Story = {
  args: { label: 'Destructive Button', variant: 'destructive' },
};

// --- Size stories ---

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <cds-button size="x-small">X-Small</cds-button>
      <cds-button size="small">Small</cds-button>
      <cds-button size="medium">Medium</cds-button>
      <cds-button size="large">Large</cds-button>
    </div>
  `,
};

// --- State stories ---

export const Disabled: Story = {
  args: { label: 'Disabled Button', disabled: true },
};

export const FullWidth: Story = {
  render: () => html`
    <div style="width: 400px;">
      <cds-button full-width>Full Width Button</cds-button>
    </div>
  `,
};

export const AsLink: Story = {
  render: () => html`
    <cds-button href="https://example.com" variant="primary">
      Button as Link
    </cds-button>
  `,
};

// --- Focus stories ---

export const FocusStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start;">
      <div>
        <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600;">
          Keyboard Focus Demonstration
        </h4>
        <p style="margin-bottom: 16px; font-size: 12px; color: #666;">
          Use Tab key to navigate and see focus rings appear on keyboard
          navigation only
        </p>
        <div style="display: flex; gap: 16px; align-items: center;">
          <cds-button variant="primary">Primary</cds-button>
          <cds-button variant="secondary">Secondary</cds-button>
          <cds-button variant="ghost">Ghost</cds-button>
          <cds-button variant="destructive">Destructive</cds-button>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Focus rings appear when navigating with keyboard (Tab key) but not when clicking with mouse.',
      },
    },
  },
};

// --- Icon stories ---

const downloadIcon = html`
  <svg
    slot="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
`;

const chevronRightIcon = html`
  <svg
    slot="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
`;

const playIcon = html`
  <svg
    slot="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
`;

const checkIcon = html`
  <svg
    slot="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
`;

export const WithLeadingIcon: Story = {
  render: () => html`
    <cds-button variant="primary" icon-position="leading">
      ${downloadIcon} Download
    </cds-button>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Button with an icon in the leading (left) position. This is the default icon position.',
      },
    },
  },
};

export const WithTrailingIcon: Story = {
  render: () => html`
    <cds-button variant="primary" icon-position="trailing">
      Continue ${chevronRightIcon}
    </cds-button>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Button with an icon in the trailing (right) position.',
      },
    },
  },
};

export const IconOnly: Story = {
  render: () => html`
    <cds-button variant="primary" aria-label="Play"> ${playIcon} </cds-button>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Icon-only button without text. Always provide an `aria-label` for accessibility.',
      },
    },
  },
};

export const IconSizes: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px;"
    >
      <div>
        <p style="margin-bottom: 12px; font-size: 12px; color: #666;">
          Icon sizes scale automatically: x-small (12px), small (14px), medium
          (16px), large (20px)
        </p>
        <div style="display: flex; gap: 16px; align-items: center;">
          <cds-button size="x-small">${checkIcon} X-Small</cds-button>
          <cds-button size="small">${checkIcon} Small</cds-button>
          <cds-button size="medium">${checkIcon} Medium</cds-button>
          <cds-button size="large">${checkIcon} Large</cds-button>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Icons automatically scale to match the button size.',
      },
    },
  },
};

export const IconWithVariants: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px;"
    >
      <div>
        <p style="margin-bottom: 12px; font-size: 12px; color: #666;">
          Icons inherit color from the button variant
        </p>
        <div style="display: flex; gap: 16px; align-items: center;">
          <cds-button variant="primary">${checkIcon} Primary</cds-button>
          <cds-button variant="secondary">${checkIcon} Secondary</cds-button>
          <cds-button variant="ghost">${checkIcon} Ghost</cds-button>
          <cds-button variant="destructive">
            ${checkIcon} Destructive
          </cds-button>
        </div>
      </div>
      <div>
        <p style="margin-bottom: 12px; font-size: 12px; color: #666;">
          Trailing icons with variants
        </p>
        <div style="display: flex; gap: 16px; align-items: center;">
          <cds-button variant="primary" icon-position="trailing">
            Primary ${chevronRightIcon}
          </cds-button>
          <cds-button variant="secondary" icon-position="trailing">
            Secondary ${chevronRightIcon}
          </cds-button>
          <cds-button variant="ghost" icon-position="trailing">
            Ghost ${chevronRightIcon}
          </cds-button>
          <cds-button variant="destructive" icon-position="trailing">
            Destructive ${chevronRightIcon}
          </cds-button>
        </div>
      </div>
      <div>
        <p style="margin-bottom: 12px; font-size: 12px; color: #666;">
          Icon-only buttons with variants
        </p>
        <div style="display: flex; gap: 16px; align-items: center;">
          <cds-button variant="primary" aria-label="Play">
            ${playIcon}
          </cds-button>
          <cds-button variant="secondary" aria-label="Play">
            ${playIcon}
          </cds-button>
          <cds-button variant="ghost" aria-label="Play">
            ${playIcon}
          </cds-button>
          <cds-button variant="destructive" aria-label="Play">
            ${playIcon}
          </cds-button>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Icons work with all button variants. Icon color inherits from button text color.',
      },
    },
  },
};
