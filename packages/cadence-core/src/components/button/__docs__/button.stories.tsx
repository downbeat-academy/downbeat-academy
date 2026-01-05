import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button'
import { Check, ChevronRight, Download, PlayFill, X } from 'cadence-icons'

const meta: Meta<typeof Button> = {
  title: 'Cadence/Components/Button',
  component: Button,
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
    isFullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    icon: {
      control: false,
      description: 'Icon element to display in the button',
    },
    iconPosition: {
      control: 'radio',
      options: ['leading', 'trailing'],
      description: 'Position of the icon relative to the button text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
}

export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive',
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="x-small">X-Small</Button>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
}

export const AsLink: Story = {
  args: {
    children: 'Button as Link',
    href: 'https://example.com',
    variant: 'primary',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    isFullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
}

export const FocusStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
          Keyboard Focus Demonstration
        </h4>
        <p style={{ marginBottom: '16px', fontSize: '12px', color: '#666' }}>
          Use Tab key to navigate and see focus rings appear on keyboard navigation only
        </p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Focus rings appear when navigating with keyboard (Tab key) but not when clicking with mouse.',
      },
    },
  },
}

// Icon Stories

export const WithLeadingIcon: Story = {
  args: {
    children: 'Download',
    icon: <Download />,
    iconPosition: 'leading',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with an icon in the leading (left) position. This is the default icon position.',
      },
    },
  },
}

export const WithTrailingIcon: Story = {
  args: {
    children: 'Continue',
    icon: <ChevronRight />,
    iconPosition: 'trailing',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with an icon in the trailing (right) position.',
      },
    },
  },
}

export const IconOnly: Story = {
  args: {
    icon: <PlayFill />,
    'aria-label': 'Play',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon-only button without text. Always provide an `aria-label` for accessibility.',
      },
    },
  },
}

export const IconSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>
          Icon sizes scale automatically: x-small (12px), small (14px), medium (16px), large (20px)
        </p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Button size="x-small" icon={<Check />}>X-Small</Button>
          <Button size="small" icon={<Check />}>Small</Button>
          <Button size="medium" icon={<Check />}>Medium</Button>
          <Button size="large" icon={<Check />}>Large</Button>
        </div>
      </div>
      <div>
        <p style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>
          Icon-only buttons at different sizes
        </p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Button size="x-small" icon={<X />} aria-label="Close" />
          <Button size="small" icon={<X />} aria-label="Close" />
          <Button size="medium" icon={<X />} aria-label="Close" />
          <Button size="large" icon={<X />} aria-label="Close" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons automatically scale to match the button size.',
      },
    },
  },
}

export const IconWithVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>
          Icons inherit color from the button variant
        </p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Button variant="primary" icon={<Check />}>Primary</Button>
          <Button variant="secondary" icon={<Check />}>Secondary</Button>
          <Button variant="ghost" icon={<Check />}>Ghost</Button>
          <Button variant="destructive" icon={<Check />}>Destructive</Button>
        </div>
      </div>
      <div>
        <p style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>
          Trailing icons with variants
        </p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Button variant="primary" icon={<ChevronRight />} iconPosition="trailing">Primary</Button>
          <Button variant="secondary" icon={<ChevronRight />} iconPosition="trailing">Secondary</Button>
          <Button variant="ghost" icon={<ChevronRight />} iconPosition="trailing">Ghost</Button>
          <Button variant="destructive" icon={<ChevronRight />} iconPosition="trailing">Destructive</Button>
        </div>
      </div>
      <div>
        <p style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>
          Icon-only buttons with variants
        </p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Button variant="primary" icon={<PlayFill />} aria-label="Play" />
          <Button variant="secondary" icon={<PlayFill />} aria-label="Play" />
          <Button variant="ghost" icon={<PlayFill />} aria-label="Play" />
          <Button variant="destructive" icon={<PlayFill />} aria-label="Play" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons work with all button variants. Icon color inherits from button text color.',
      },
    },
  },
}
