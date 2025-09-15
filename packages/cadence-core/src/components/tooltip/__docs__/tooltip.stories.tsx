import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
  TooltipArrow,
} from '../index'

const meta: Meta<typeof Tooltip> = {
  title: 'Cadence / Components / Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Tooltip provides contextual information when users hover over or focus on an element. It's built on Radix UI's Tooltip primitive and designed for short, helpful text content.

## Components

- **TooltipProvider**: Provider component that manages global tooltip settings (required at app level)
- **Tooltip**: Root component that manages state and timing
- **TooltipTrigger**: Element that triggers the tooltip
- **TooltipContent**: Container for the tooltip content with positioning
- **TooltipArrow**: Optional arrow pointing to the trigger

## Accessibility

- Automatic focus management
- Keyboard navigation support (Escape to close)
- ARIA attributes for screen readers
- Screen reader announces tooltip content
- Supports both hover and focus interactions

## Usage Notes

- Keep tooltip content short and concise
- Use for supplementary information, not essential content
- Consider using HoverCard for richer, more complex content
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    delayDuration: {
      control: { type: 'number', min: 0, max: 2000, step: 50 },
      description: 'Delay in milliseconds before the tooltip opens',
      defaultValue: 700,
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div style={{ padding: '100px', minHeight: '300px' }}>
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    delayDuration: 700,
  },
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent>
        <p>This is a helpful tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const ButtonTooltip: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button style={{
          padding: '8px 16px',
          cursor: 'pointer',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: '#f9f9f9'
        }}>
          Save Document
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Save your changes (Ctrl+S)</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const WithArrow: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Element with arrow</TooltipTrigger>
      <TooltipContent>
        <TooltipArrow />
        <p>This tooltip has an arrow pointing to the trigger</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const CustomTiming: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>Instant (0ms)</TooltipTrigger>
        <TooltipContent>
          <p>This tooltip appears instantly</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip delayDuration={300}>
        <TooltipTrigger>Fast (300ms)</TooltipTrigger>
        <TooltipContent>
          <p>This tooltip appears quickly</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip delayDuration={1000}>
        <TooltipTrigger>Slow (1000ms)</TooltipTrigger>
        <TooltipContent>
          <p>This tooltip has a longer delay</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Control the timing of tooltip appearance with the `delayDuration` prop. Default value is 700ms.',
      },
    },
  },
}

export const Positioning: Story = {
  render: () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '32px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <Tooltip>
        <TooltipTrigger>Top Left</TooltipTrigger>
        <TooltipContent side="top" align="start">
          <p>Positioned above, aligned to start</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>Top Center</TooltipTrigger>
        <TooltipContent side="top" align="center">
          <p>Positioned above, centered</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>Top Right</TooltipTrigger>
        <TooltipContent side="top" align="end">
          <p>Positioned above, aligned to end</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>Left</TooltipTrigger>
        <TooltipContent side="left">
          <p>Positioned to the left</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>Bottom (default)</TooltipTrigger>
        <TooltipContent>
          <p>Default positioning (bottom)</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>Right</TooltipTrigger>
        <TooltipContent side="right">
          <p>Positioned to the right</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'TooltipContent supports different positioning with `side` (top, right, bottom, left) and `align` (start, center, end) props. Tooltips automatically adjust position to stay within viewport.',
      },
    },
  },
}

export const AsChildTrigger: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button style={{
            padding: '8px 16px',
            cursor: 'pointer',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: '#f9f9f9'
          }}>
            Button Trigger
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This button performs an action</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <a href="#" style={{
            color: '#0066cc',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            Link Trigger
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>This link navigates to another page</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <span style={{
            padding: '4px 8px',
            background: '#e3f2fd',
            borderRadius: '12px',
            fontSize: '14px',
            cursor: 'help'
          }}>
            Status Badge
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>This indicates the current status</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#4caf50',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            i
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click for more information</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use the `asChild` prop to render any custom element as the trigger. This is useful for maintaining semantic HTML while adding tooltip functionality.',
      },
    },
  },
}

export const AccessibilityDemo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          Keyboard Navigation
        </h4>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
          Use Tab to focus triggers, then wait for tooltip to appear. Press Escape to close any open tooltip.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Tooltip>
            <TooltipTrigger>Focus me with Tab</TooltipTrigger>
            <TooltipContent>
              <p>This tooltip appears on focus and hover</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button style={{
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: '#f9f9f9',
                cursor: 'pointer'
              }}>
                Interactive Button
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Fully accessible button with tooltip</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Accessibility Features

- **Keyboard Navigation**: Triggers can be focused with Tab key
- **Screen Reader Support**: Proper ARIA attributes for assistive technology
- **Focus Interaction**: Tooltips appear on both hover and focus
- **Escape Key**: Press Escape to close any open tooltip
- **Auto-dismiss**: Tooltips automatically close when focus is lost

### Best Practices

1. Keep tooltip content short and descriptive
2. Use for supplementary information, not essential content
3. Ensure triggers are keyboard accessible
4. Test with keyboard navigation and screen readers
5. Consider HoverCard for longer or richer content
        `,
      },
    },
  },
}

export const CommonUseCases: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
          Form Field Help
        </h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label htmlFor="username" style={{ fontSize: '14px', fontWeight: '500' }}>
            Username
          </label>
          <Tooltip>
            <TooltipTrigger asChild>
              <span style={{
                display: 'inline-flex',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#666',
                color: 'white',
                fontSize: '10px',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'help'
              }}>
                ?
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Username must be 3-20 characters long</p>
            </TooltipContent>
          </Tooltip>
          <input
            id="username"
            type="text"
            style={{
              marginLeft: '8px',
              padding: '4px 8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
          Icon Buttons
        </h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button style={{
                width: '32px',
                height: '32px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: '#f9f9f9',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                ✏️
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit item</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button style={{
                width: '32px',
                height: '32px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: '#f9f9f9',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                🗑️
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete item</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button style={{
                width: '32px',
                height: '32px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: '#f9f9f9',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                📋
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy to clipboard</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
          Truncated Text
        </h4>
        <div style={{ width: '200px' }}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                This is a very long text that gets truncated...
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>This is a very long text that gets truncated when the container is too small</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use cases for tooltips include form field help, icon button labels, and showing full text for truncated content.',
      },
    },
  },
}