import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardTitle,
  HoverCardMain,
  HoverCardFooter,
  HoverCardArrow,
} from '../index'

const meta: Meta<typeof HoverCard> = {
  title: 'Cadence / Components / HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
HoverCard provides a way to display rich content when users hover over a trigger element. It's built on Radix UI's HoverCard primitive and includes several sub-components for structured content layout.

## Components

- **HoverCard**: Root component that manages state and timing
- **HoverCardTrigger**: Element that triggers the hover card (supports \`asChild\` and \`hasIcon\` props)
- **HoverCardContent**: Container for the card content with positioning
- **HoverCardTitle**: Semantic heading component with customizable heading level
- **HoverCardMain**: Main content area
- **HoverCardFooter**: Footer section for additional information
- **HoverCardArrow**: Optional arrow pointing to the trigger

## Accessibility

- Automatic focus management
- Keyboard navigation support (Escape to close)
- ARIA attributes for screen readers
- Customizable icon aria-labels
- Semantic heading support for proper document structure
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    openDelay: {
      control: { type: 'number', min: 0, max: 2000, step: 50 },
      description: 'Delay in milliseconds before the hover card opens',
      defaultValue: 300,
    },
    closeDelay: {
      control: { type: 'number', min: 0, max: 2000, step: 50 },
      description: 'Delay in milliseconds before the hover card closes',
      defaultValue: 150,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '100px', minHeight: '300px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof HoverCard>

export const Default: Story = {
  args: {
    openDelay: 300,
    closeDelay: 150,
  },
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger hasIcon>Hover for more info</HoverCardTrigger>
      <HoverCardContent>
        <HoverCardTitle>
          <h4 style={{ margin: 0 }}>Information</h4>
        </HoverCardTitle>
        <HoverCardMain>
          <p style={{ margin: 0 }}>
            This is additional information that appears on hover.
          </p>
        </HoverCardMain>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const WithoutIcon: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger>Simple text trigger</HoverCardTrigger>
      <HoverCardContent>
        <HoverCardMain>
          <p style={{ margin: 0 }}>
            This trigger doesn't have an icon, just underlined text.
          </p>
        </HoverCardMain>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const WithCustomIcon: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger hasIcon iconAriaLabel="Help information about this feature">
        Feature with custom aria-label
      </HoverCardTrigger>
      <HoverCardContent>
        <HoverCardMain>
          <p style={{ margin: 0 }}>
            The icon has a custom aria-label for better accessibility.
          </p>
        </HoverCardMain>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger hasIcon>Complete example</HoverCardTrigger>
      <HoverCardContent>
        <HoverCardTitle>
          <h4 style={{ margin: 0 }}>Complete Layout</h4>
        </HoverCardTitle>
        <HoverCardMain>
          <p style={{ margin: 0, marginBottom: '8px' }}>
            This hover card demonstrates all the layout components working together.
          </p>
          <p style={{ margin: 0 }}>
            It includes a title, main content area, and footer section.
          </p>
        </HoverCardMain>
        <HoverCardFooter>
          <small style={{ margin: 0, color: '#666' }}>
            Learn more in the documentation
          </small>
        </HoverCardFooter>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const WithArrow: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger hasIcon>With arrow pointer</HoverCardTrigger>
      <HoverCardContent>
        <HoverCardArrow />
        <HoverCardTitle>
          <h4 style={{ margin: 0 }}>Arrow Pointer</h4>
        </HoverCardTitle>
        <HoverCardMain>
          <p style={{ margin: 0 }}>
            This hover card includes an arrow that points to the trigger element.
          </p>
        </HoverCardMain>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const SemanticHeadings: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <HoverCard>
        <HoverCardTrigger hasIcon>As H2</HoverCardTrigger>
        <HoverCardContent>
          <HoverCardTitle as="h2">
            This is an H2 heading
          </HoverCardTitle>
          <HoverCardMain>
            <p style={{ margin: 0 }}>
              The title is rendered as an H2 element for proper document structure.
            </p>
          </HoverCardMain>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger hasIcon>As H3</HoverCardTrigger>
        <HoverCardContent>
          <HoverCardTitle as="h3">
            This is an H3 heading
          </HoverCardTitle>
          <HoverCardMain>
            <p style={{ margin: 0 }}>
              Choose the appropriate heading level for your document structure.
            </p>
          </HoverCardMain>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger hasIcon>As Div</HoverCardTrigger>
        <HoverCardContent>
          <HoverCardTitle as="div">
            This is a div element
          </HoverCardTitle>
          <HoverCardMain>
            <p style={{ margin: 0 }}>
              Use div when the content is not a semantic heading.
            </p>
          </HoverCardMain>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The HoverCardTitle component supports different heading levels (h1-h6) or div elements through the `as` prop for proper semantic document structure.',
      },
    },
  },
}

export const CustomTiming: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger hasIcon>Instant (0ms)</HoverCardTrigger>
        <HoverCardContent>
          <HoverCardMain>
            <p style={{ margin: 0 }}>
              This hover card appears and disappears instantly.
            </p>
          </HoverCardMain>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={700} closeDelay={300}>
        <HoverCardTrigger hasIcon>Slow (700ms/300ms)</HoverCardTrigger>
        <HoverCardContent>
          <HoverCardMain>
            <p style={{ margin: 0 }}>
              This hover card has a longer delay before opening and closing.
            </p>
          </HoverCardMain>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Control the timing of hover card appearance with `openDelay` and `closeDelay` props. Default values are 300ms and 150ms respectively.',
      },
    },
  },
}

export const AsChildTrigger: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <button style={{
            padding: '8px 16px',
            cursor: 'pointer',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: '#f9f9f9'
          }}>
            Custom Button Trigger
          </button>
        </HoverCardTrigger>
        <HoverCardContent>
          <HoverCardMain>
            <p style={{ margin: 0 }}>
              You can use any element as a trigger with the asChild prop.
            </p>
          </HoverCardMain>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <a href="#" style={{
            color: '#0066cc',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            Link Trigger
          </a>
        </HoverCardTrigger>
        <HoverCardContent>
          <HoverCardMain>
            <p style={{ margin: 0 }}>
              Links can also be used as triggers for additional information.
            </p>
          </HoverCardMain>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <span style={{
            padding: '4px 8px',
            background: '#e3f2fd',
            borderRadius: '12px',
            fontSize: '14px',
            cursor: 'help'
          }}>
            Badge Trigger
          </span>
        </HoverCardTrigger>
        <HoverCardContent>
          <HoverCardMain>
            <p style={{ margin: 0 }}>
              Even badge-like elements can serve as triggers.
            </p>
          </HoverCardMain>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use the `asChild` prop to render any custom element as the trigger. This is useful for maintaining semantic HTML while adding hover card functionality.',
      },
    },
  },
}

export const ComplexContent: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger hasIcon>Rich content example</HoverCardTrigger>
      <HoverCardContent style={{ width: '320px' }}>
        <HoverCardTitle as="h3">
          User Profile
        </HoverCardTitle>
        <HoverCardMain>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              JD
            </div>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                Jane Doe
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                Senior Developer
              </div>
              <div style={{ fontSize: '12px', color: '#888' }}>
                jane.doe@example.com
              </div>
            </div>
          </div>
          <div style={{ fontSize: '14px', lineHeight: '1.4' }}>
            Experienced full-stack developer with expertise in React, TypeScript, and Node.js.
            Passionate about creating accessible and performant web applications.
          </div>
        </HoverCardMain>
        <HoverCardFooter>
          <div style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#666' }}>
            <span>📍 San Francisco, CA</span>
            <span>•</span>
            <span>🕒 PST timezone</span>
          </div>
        </HoverCardFooter>
      </HoverCardContent>
    </HoverCard>
  ),
  parameters: {
    docs: {
      description: {
        story: 'HoverCards can contain complex layouts including profiles, images, lists, and other rich content.',
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
          Use Tab to focus triggers, then hover or press Enter/Space. Press Escape to close any open hover card.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <HoverCard>
            <HoverCardTrigger hasIcon iconAriaLabel="Information about feature A">
              Feature A
            </HoverCardTrigger>
            <HoverCardContent>
              <HoverCardTitle as="h3">Feature A Details</HoverCardTitle>
              <HoverCardMain>
                <p style={{ margin: 0 }}>
                  This feature provides core functionality for user management.
                </p>
              </HoverCardMain>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger hasIcon iconAriaLabel="Information about feature B">
              Feature B
            </HoverCardTrigger>
            <HoverCardContent>
              <HoverCardTitle as="h3">Feature B Details</HoverCardTitle>
              <HoverCardMain>
                <p style={{ margin: 0 }}>
                  This feature handles data processing and analytics.
                </p>
              </HoverCardMain>
            </HoverCardContent>
          </HoverCard>
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
- **Screen Reader Support**: Proper ARIA attributes and semantic HTML
- **Custom Labels**: Use \`iconAriaLabel\` prop for descriptive icon labels
- **Semantic Headings**: Use appropriate heading levels with the \`as\` prop
- **Focus Management**: Automatic focus handling when cards open/close
- **Escape Key**: Press Escape to close any open hover card

### Best Practices

1. Always provide meaningful \`iconAriaLabel\` text when using \`hasIcon\`
2. Use appropriate semantic heading levels with the \`as\` prop
3. Keep content concise and scannable
4. Test with keyboard navigation and screen readers
        `,
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
      <HoverCard>
        <HoverCardTrigger hasIcon>Top Left</HoverCardTrigger>
        <HoverCardContent side="top" align="start">
          <HoverCardMain>
            <p style={{ margin: 0 }}>Positioned above, aligned to start</p>
          </HoverCardMain>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger hasIcon>Top Center</HoverCardTrigger>
        <HoverCardContent side="top" align="center">
          <HoverCardMain>
            <p style={{ margin: 0 }}>Positioned above, centered</p>
          </HoverCardMain>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger hasIcon>Top Right</HoverCardTrigger>
        <HoverCardContent side="top" align="end">
          <HoverCardMain>
            <p style={{ margin: 0 }}>Positioned above, aligned to end</p>
          </HoverCardMain>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger hasIcon>Left</HoverCardTrigger>
        <HoverCardContent side="left">
          <HoverCardMain>
            <p style={{ margin: 0 }}>Positioned to the left</p>
          </HoverCardMain>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger hasIcon>Bottom (default)</HoverCardTrigger>
        <HoverCardContent>
          <HoverCardMain>
            <p style={{ margin: 0 }}>Default positioning (bottom)</p>
          </HoverCardMain>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger hasIcon>Right</HoverCardTrigger>
        <HoverCardContent side="right">
          <HoverCardMain>
            <p style={{ margin: 0 }}>Positioned to the right</p>
          </HoverCardMain>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'HoverCardContent supports different positioning with `side` (top, right, bottom, left) and `align` (start, center, end) props. Cards automatically adjust position to stay within viewport.',
      },
    },
  },
}