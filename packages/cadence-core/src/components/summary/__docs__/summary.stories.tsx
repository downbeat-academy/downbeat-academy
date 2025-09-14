import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Summary } from '../summary'
import { Text } from '../../text'

const meta: Meta<typeof Summary> = {
  title: 'Cadence / Components / Summary',
  component: Summary,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['contained', 'flush'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    isOpen: {
      control: 'boolean',
    },
    maxWidth: {
      control: 'text',
    },
    'title.text': {
      control: 'text',
    },
    'title.type': {
      control: 'select',
      options: ['productive-body', 'productive-headline', 'expressive-body', 'expressive-headline'],
    },
    'title.size': {
      control: 'select',
      options: ['mega', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body-large', 'body-base', 'body-small', 'body-x-small'],
    },
    'title.color': {
      control: 'select',
      options: ['primary', 'strong', 'faint', 'disabled', 'high-contrast', 'warning', 'critical', 'interactive', 'brand', 'success'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Summary>

export const Default: Story = {
  args: {
    children: (
      <>
        <Text>This is the default summary component with basic content.</Text>
        <Text>You can expand it to see more information about any topic.</Text>
      </>
    ),
  },
}

export const OpenByDefault: Story = {
  args: {
    isOpen: true,
    children: (
      <>
        <Text>This summary is open by default when the page loads.</Text>
        <Text>Users can still collapse it by clicking on the title.</Text>
      </>
    ),
  },
}

export const CustomTitle: Story = {
  args: {
    title: {
      text: 'Custom Title Configuration',
      type: 'productive-headline',
      size: 'h3',
      color: 'brand',
    },
    children: (
      <>
        <Text>This example shows how to customize the title appearance.</Text>
        <Text>You can control the text content, typography style, size, and color.</Text>
      </>
    ),
  },
}

export const TypeVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
          Contained (Default)
        </h4>
        <Summary
          type="contained"
          title={{ text: 'Contained Summary' }}
          children={
            <>
              <Text>The contained variant has a full border around the entire component.</Text>
              <Text>This provides clear visual separation from surrounding content.</Text>
            </>
          }
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
          Flush
        </h4>
        <Summary
          type="flush"
          title={{ text: 'Flush Summary' }}
          children={
            <>
              <Text>The flush variant only has a bottom border on the title.</Text>
              <Text>This creates a more subtle, integrated appearance.</Text>
            </>
          }
        />
      </div>
    </div>
  ),
}

export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
          Small
        </h4>
        <Summary
          size="small"
          title={{ text: 'Small Summary' }}
          children={
            <>
              <Text>Small size has reduced padding and spacing.</Text>
              <Text>Perfect for compact layouts or secondary information.</Text>
            </>
          }
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
          Medium (Default)
        </h4>
        <Summary
          size="medium"
          title={{ text: 'Medium Summary' }}
          children={
            <>
              <Text>Medium size provides balanced spacing for most use cases.</Text>
              <Text>This is the default size when none is specified.</Text>
            </>
          }
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
          Large
        </h4>
        <Summary
          size="large"
          title={{ text: 'Large Summary' }}
          children={
            <>
              <Text>Large size has generous padding and spacing.</Text>
              <Text>Great for prominent sections or detailed content areas.</Text>
            </>
          }
        />
      </div>
    </div>
  ),
}

export const TitleTypography: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
          Productive Body Styles
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Summary
            title={{
              text: 'Body Large',
              type: 'productive-body',
              size: 'body-large',
            }}
            children={<Text>Productive body with large size.</Text>}
          />
          <Summary
            title={{
              text: 'Body Base',
              type: 'productive-body',
              size: 'body-base',
            }}
            children={<Text>Productive body with base size.</Text>}
          />
          <Summary
            title={{
              text: 'Body Small',
              type: 'productive-body',
              size: 'body-small',
            }}
            children={<Text>Productive body with small size.</Text>}
          />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
          Productive Headlines
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Summary
            title={{
              text: 'Headline H3',
              type: 'productive-headline',
              size: 'h3',
            }}
            children={<Text>Productive headline with H3 size.</Text>}
          />
          <Summary
            title={{
              text: 'Headline H4',
              type: 'productive-headline',
              size: 'h4',
            }}
            children={<Text>Productive headline with H4 size.</Text>}
          />
          <Summary
            title={{
              text: 'Headline H5',
              type: 'productive-headline',
              size: 'h5',
            }}
            children={<Text>Productive headline with H5 size.</Text>}
          />
        </div>
      </div>
    </div>
  ),
}

export const TitleColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Summary
        title={{
          text: 'Primary Color (Default)',
          color: 'primary',
        }}
        children={<Text>Summary with primary color title.</Text>}
      />
      <Summary
        title={{
          text: 'Strong Color',
          color: 'strong',
        }}
        children={<Text>Summary with strong color title for emphasis.</Text>}
      />
      <Summary
        title={{
          text: 'Brand Color',
          color: 'brand',
        }}
        children={<Text>Summary with brand color title.</Text>}
      />
      <Summary
        title={{
          text: 'Interactive Color',
          color: 'interactive',
        }}
        children={<Text>Summary with interactive color title.</Text>}
      />
      <Summary
        title={{
          text: 'Warning Color',
          color: 'warning',
        }}
        children={<Text>Summary with warning color title.</Text>}
      />
      <Summary
        title={{
          text: 'Critical Color',
          color: 'critical',
        }}
        children={<Text>Summary with critical color title.</Text>}
      />
      <Summary
        title={{
          text: 'Success Color',
          color: 'success',
        }}
        children={<Text>Summary with success color title.</Text>}
      />
    </div>
  ),
}

export const ComplexContent: Story = {
  args: {
    title: {
      text: 'Complex Content Example',
      type: 'productive-headline',
      size: 'h4',
      color: 'strong',
    },
    children: (
      <>
        <Text size="body-large" color="strong">Introduction</Text>
        <Text>
          This summary contains various types of content to demonstrate how the component
          handles more complex layouts and multiple elements.
        </Text>
        
        <Text size="body-large" color="strong">Key Features</Text>
        <ul style={{ marginLeft: '20px' }}>
          <li>Native HTML details/summary elements for accessibility</li>
          <li>Configurable title with full Text component props</li>
          <li>Multiple visual variants and sizes</li>
          <li>Smooth chevron rotation animation</li>
        </ul>
        
        <Text size="body-large" color="strong">Usage Guidelines</Text>
        <Text>
          Use the Summary component for collapsible content sections, FAQs, 
          expandable details, or any scenario where you want to hide/show content
          while maintaining semantic HTML structure.
        </Text>
        
        <div style={{ 
          padding: '16px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '4px',
          border: '1px solid #e9ecef'
        }}>
          <Text size="body-small" color="faint">
            💡 Pro tip: The component uses native browser disclosure widgets which provide
            built-in keyboard navigation and screen reader support.
          </Text>
        </div>
      </>
    ),
  },
}

export const CustomStyling: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
          With Max Width
        </h4>
        <Summary
          maxWidth="400px"
          title={{ text: 'Constrained Width Summary' }}
          children={
            <>
              <Text>This summary has a maximum width constraint of 400px.</Text>
              <Text>
                The content will wrap appropriately within this constraint, making it useful 
                for controlling layout in wider containers.
              </Text>
            </>
          }
        />
      </div>
      
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
          With Custom Class
        </h4>
        <div style={{ 
          border: '2px dashed #007acc',
          borderRadius: '8px',
          display: 'inline-block',
          minWidth: '100%'
        }}>
          <Summary
            title={{ text: 'Custom Styled Summary' }}
            children={
              <>
                <Text>This summary has additional custom styling applied via className.</Text>
                <Text>You can use CSS classes to further customize the appearance.</Text>
              </>
            }
          />
        </div>
      </div>
    </div>
  ),
}

export const InteractiveDemo: Story = {
  render: () => {
    const [summaries, setSummaries] = React.useState([
      { id: 1, isOpen: false, title: 'First Summary' },
      { id: 2, isOpen: false, title: 'Second Summary' },
      { id: 3, isOpen: true, title: 'Third Summary (Open)' },
    ])

    const toggleAll = () => {
      setSummaries(prev => prev.map(summary => ({
        ...summary,
        isOpen: !summary.isOpen
      })))
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
            Interactive Behavior Demo
          </h4>
          <p style={{ marginBottom: '16px', fontSize: '12px', color: '#666' }}>
            Click on the summary titles to expand/collapse them. Use the button below to toggle all at once.
          </p>
          <button
            onClick={toggleAll}
            style={{
              padding: '8px 16px',
              marginBottom: '16px',
              backgroundColor: '#007acc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Toggle All Summaries
          </button>
        </div>

        {summaries.map((summary) => (
          <Summary
            key={summary.id}
            isOpen={summary.isOpen}
            title={{ text: summary.title }}
            children={
              <>
                <Text>Content for {summary.title.toLowerCase()}.</Text>
                <Text>
                  Each summary can be controlled independently through the native
                  details/summary behavior or programmatically via the isOpen prop.
                </Text>
              </>
            }
          />
        ))}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the interactive behavior of multiple Summary components. You can control them individually by clicking or programmatically via the isOpen prop.',
      },
    },
  },
}

export const AccessibilityDemo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
          Accessibility Features
        </h4>
        <p style={{ marginBottom: '16px', fontSize: '12px', color: '#666' }}>
          Use Tab/Shift+Tab to navigate between summaries, Space/Enter to toggle, and 
          arrow keys work within expanded content. Screen readers will announce the 
          expanded/collapsed state.
        </p>
      </div>

      <Summary
        title={{ 
          text: 'Keyboard Navigation',
          color: 'strong'
        }}
        children={
          <>
            <Text>
              The Summary component uses native HTML details/summary elements which provide:
            </Text>
            <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
              <li><strong>Tab navigation:</strong> Focus moves to the summary title</li>
              <li><strong>Space/Enter:</strong> Toggles the expanded/collapsed state</li>
              <li><strong>Screen reader support:</strong> Announces state changes automatically</li>
            </ul>
          </>
        }
      />

      <Summary
        title={{ 
          text: 'Screen Reader Support',
          color: 'strong'
        }}
        children={
          <>
            <Text>
              Screen readers will announce the title content and the current state 
              (expanded or collapsed) when the summary receives focus.
            </Text>
            <Text>
              The chevron icon includes aria-hidden="true" to prevent redundant 
              announcements since the state is already conveyed by the native element.
            </Text>
          </>
        }
      />

      <Summary
        title={{ 
          text: 'Semantic HTML',
          color: 'strong'
        }}
        children={
          <>
            <Text>
              Built on native details/summary elements which are part of the HTML5 
              specification and provide built-in accessibility features without 
              requiring additional ARIA attributes.
            </Text>
            <Text>
              This ensures maximum compatibility with assistive technologies and 
              follows web standards best practices.
            </Text>
          </>
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The Summary component is built with accessibility in mind using native HTML details/summary elements. This provides built-in keyboard navigation and screen reader support without requiring additional JavaScript or ARIA attributes.',
      },
    },
  },
}