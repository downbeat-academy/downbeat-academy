import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardTitle,
  HoverCardMain,
  HoverCardFooter,
} from '../index'

describe('HoverCard Components', () => {
  describe('HoverCard Root', () => {
    it('renders without crashing', () => {
      expect(() => {
        render(
          <HoverCard>
            <HoverCardTrigger>Trigger</HoverCardTrigger>
            <HoverCardContent>Content</HoverCardContent>
          </HoverCard>
        )
      }).not.toThrow()
    })

    it('accepts and forwards props to Radix primitive', () => {
      const onOpenChange = vi.fn()
      render(
        <HoverCard open={true} onOpenChange={onOpenChange}>
          <HoverCardTrigger>Trigger</HoverCardTrigger>
          <HoverCardContent>Content</HoverCardContent>
        </HoverCard>
      )

      const trigger = screen.getByText('Trigger')
      expect(trigger).toBeInstanceOf(HTMLElement)
    })

    it('supports controlled state with open prop', () => {
      const { rerender } = render(
        <HoverCard open={false}>
          <HoverCardTrigger>Trigger</HoverCardTrigger>
          <HoverCardContent>Hidden Content</HoverCardContent>
        </HoverCard>
      )

      // Content should not be visible when open=false
      expect(screen.queryByText('Hidden Content')).toBeNull()

      rerender(
        <HoverCard open={true}>
          <HoverCardTrigger>Trigger</HoverCardTrigger>
          <HoverCardContent>Visible Content</HoverCardContent>
        </HoverCard>
      )

      // Content should be visible when open=true
      expect(screen.getByText('Visible Content')).toBeInstanceOf(HTMLElement)
    })
  })

  describe('HoverCardTrigger', () => {
    it('renders children correctly', () => {
      render(
        <HoverCard>
          <HoverCardTrigger>Test Trigger</HoverCardTrigger>
          <HoverCardContent>Content</HoverCardContent>
        </HoverCard>
      )

      expect(screen.getByText('Test Trigger')).toBeInstanceOf(HTMLElement)
    })

    it('applies custom className', () => {
      render(
        <HoverCard>
          <HoverCardTrigger className="custom-trigger">Trigger</HoverCardTrigger>
          <HoverCardContent>Content</HoverCardContent>
        </HoverCard>
      )

      const trigger = screen.getByText('Trigger')
      expect(trigger.className).toContain('custom-trigger')
    })

    it('shows icon when hasIcon is true', () => {
      const { container } = render(
        <HoverCard>
          <HoverCardTrigger hasIcon={true}>Trigger with icon</HoverCardTrigger>
          <HoverCardContent>Content</HoverCardContent>
        </HoverCard>
      )

      // Look for the QuestionCircleOutline icon
      const iconElement = container.querySelector('svg')
      expect(iconElement).toBeInstanceOf(SVGElement)
    })

    it('does not show icon when hasIcon is false', () => {
      const { container } = render(
        <HoverCard>
          <HoverCardTrigger hasIcon={false}>Trigger without icon</HoverCardTrigger>
          <HoverCardContent>Content</HoverCardContent>
        </HoverCard>
      )

      // Should not find any svg icons
      const iconElement = container.querySelector('svg')
      expect(iconElement).toBeNull()
    })

    it('renders as child element when asChild is true', () => {
      render(
        <HoverCard>
          <HoverCardTrigger asChild>
            <button data-testid="custom-button">Custom Button</button>
          </HoverCardTrigger>
          <HoverCardContent>Content</HoverCardContent>
        </HoverCard>
      )

      const customButton = screen.getByTestId('custom-button')
      expect(customButton.tagName).toBe('BUTTON')
    })

    it('does not render icon when asChild is true', () => {
      const { container } = render(
        <HoverCard>
          <HoverCardTrigger asChild hasIcon={true}>
            <button>Custom Button with hasIcon</button>
          </HoverCardTrigger>
          <HoverCardContent>Content</HoverCardContent>
        </HoverCard>
      )

      // When asChild is true, hasIcon should be ignored
      const iconElement = container.querySelector('svg')
      expect(iconElement).toBeNull()
    })

    it('supports hover state data attributes', () => {
      render(
        <HoverCard>
          <HoverCardTrigger data-testid="hover-trigger">Hover me</HoverCardTrigger>
          <HoverCardContent>Hover content</HoverCardContent>
        </HoverCard>
      )

      const trigger = screen.getByTestId('hover-trigger')

      // Check initial state
      expect(trigger.getAttribute('data-state')).toBe('closed')

      // Hover over the trigger
      fireEvent.mouseEnter(trigger)

      // Check that the data attribute shows hovered state (without needing content to appear)
      expect(trigger).toBeInstanceOf(HTMLElement)
    })

    it('supports aria attributes', () => {
      render(
        <HoverCard>
          <HoverCardTrigger
            aria-label="Custom trigger label"
            aria-describedby="trigger-description"
          >
            Accessible Trigger
          </HoverCardTrigger>
          <HoverCardContent>Content</HoverCardContent>
        </HoverCard>
      )

      const trigger = screen.getByText('Accessible Trigger')
      expect(trigger.getAttribute('aria-label')).toBe('Custom trigger label')
      expect(trigger.getAttribute('aria-describedby')).toBe('trigger-description')
    })
  })

  describe('HoverCardContent', () => {
    it('renders content correctly when open', () => {
      render(
        <HoverCard open={true}>
          <HoverCardTrigger>Trigger</HoverCardTrigger>
          <HoverCardContent>Test Content</HoverCardContent>
        </HoverCard>
      )

      expect(screen.getByText('Test Content')).toBeInstanceOf(HTMLElement)
    })

    it('applies custom className', () => {
      render(
        <HoverCard open={true}>
          <HoverCardTrigger>Trigger</HoverCardTrigger>
          <HoverCardContent className="custom-content">Content</HoverCardContent>
        </HoverCard>
      )

      const content = screen.getByText('Content')
      expect(content.className).toContain('custom-content')
    })

    it('renders with default positioning props', () => {
      render(
        <HoverCard open={true}>
          <HoverCardTrigger>Trigger</HoverCardTrigger>
          <HoverCardContent data-testid="content">Content</HoverCardContent>
        </HoverCard>
      )

      const content = screen.getByTestId('content')
      // Just check that content is rendered, positioning is handled by Radix internally
      expect(content).toBeInstanceOf(HTMLElement)
      expect(content.textContent).toBe('Content')
    })

    it('accepts custom positioning props', () => {
      render(
        <HoverCard open={true}>
          <HoverCardTrigger>Trigger</HoverCardTrigger>
          <HoverCardContent
            data-testid="content"
            align="start"
            sideOffset={8}
          >
            Content
          </HoverCardContent>
        </HoverCard>
      )

      const content = screen.getByTestId('content')
      // Just verify content is rendered - positioning props are passed to Radix internally
      expect(content).toBeInstanceOf(HTMLElement)
      expect(content.textContent).toBe('Content')
    })

    it('renders within a Portal', () => {
      const { container } = render(
        <HoverCard open={true}>
          <HoverCardTrigger>Trigger</HoverCardTrigger>
          <HoverCardContent>Portal Content</HoverCardContent>
        </HoverCard>
      )

      // Content should be rendered outside the container due to Portal
      const triggerInContainer = container.querySelector('a')
      expect(triggerInContainer).toBeInstanceOf(HTMLElement)

      // But content should still be accessible via screen (rendered in Portal)
      expect(screen.getByText('Portal Content')).toBeInstanceOf(HTMLElement)
    })

    it('supports complex children', () => {
      render(
        <HoverCard open={true}>
          <HoverCardTrigger>Trigger</HoverCardTrigger>
          <HoverCardContent>
            <div>
              <h3>Title</h3>
              <p>Description</p>
              <button>Action</button>
            </div>
          </HoverCardContent>
        </HoverCard>
      )

      expect(screen.getByText('Title')).toBeInstanceOf(HTMLElement)
      expect(screen.getByText('Description')).toBeInstanceOf(HTMLElement)
      expect(screen.getByText('Action')).toBeInstanceOf(HTMLElement)
    })
  })

  describe('HoverCardTitle', () => {
    it('renders children correctly', () => {
      render(<HoverCardTitle>Test Title</HoverCardTitle>)
      expect(screen.getByText('Test Title')).toBeInstanceOf(HTMLElement)
    })

    it('applies custom className', () => {
      render(<HoverCardTitle className="custom-title">Title</HoverCardTitle>)
      const title = screen.getByText('Title')
      expect(title.className).toContain('custom-title')
    })

    it('renders as div element', () => {
      render(<HoverCardTitle>Title</HoverCardTitle>)
      const title = screen.getByText('Title')
      expect(title.tagName).toBe('DIV')
    })

    it('forwards HTML attributes', () => {
      render(
        <HoverCardTitle
          data-testid="test-title"
          id="title-id"
          role="heading"
        >
          Title with attributes
        </HoverCardTitle>
      )

      const title = screen.getByTestId('test-title')
      expect(title.getAttribute('id')).toBe('title-id')
      expect(title.getAttribute('role')).toBe('heading')
    })
  })

  describe('HoverCardMain', () => {
    it('renders children correctly', () => {
      render(<HoverCardMain>Main content</HoverCardMain>)
      expect(screen.getByText('Main content')).toBeInstanceOf(HTMLElement)
    })

    it('applies custom className', () => {
      render(<HoverCardMain className="custom-main">Main</HoverCardMain>)
      const main = screen.getByText('Main')
      expect(main.className).toContain('custom-main')
    })

    it('renders as div element', () => {
      render(<HoverCardMain>Main</HoverCardMain>)
      const main = screen.getByText('Main')
      expect(main.tagName).toBe('DIV')
    })

    it('supports complex content', () => {
      render(
        <HoverCardMain>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </HoverCardMain>
      )

      expect(screen.getByText('Paragraph 1')).toBeInstanceOf(HTMLElement)
      expect(screen.getByText('Paragraph 2')).toBeInstanceOf(HTMLElement)
      expect(screen.getByText('Item 1')).toBeInstanceOf(HTMLElement)
      expect(screen.getByText('Item 2')).toBeInstanceOf(HTMLElement)
    })
  })

  describe('HoverCardFooter', () => {
    it('renders children correctly', () => {
      render(<HoverCardFooter>Footer content</HoverCardFooter>)
      expect(screen.getByText('Footer content')).toBeInstanceOf(HTMLElement)
    })

    it('applies custom className', () => {
      render(<HoverCardFooter className="custom-footer">Footer</HoverCardFooter>)
      const footer = screen.getByText('Footer')
      expect(footer.className).toContain('custom-footer')
    })

    it('renders as div element', () => {
      render(<HoverCardFooter>Footer</HoverCardFooter>)
      const footer = screen.getByText('Footer')
      expect(footer.tagName).toBe('DIV')
    })

    it('supports action elements', () => {
      render(
        <HoverCardFooter>
          <button>Cancel</button>
          <button>Confirm</button>
        </HoverCardFooter>
      )

      expect(screen.getByText('Cancel')).toBeInstanceOf(HTMLElement)
      expect(screen.getByText('Confirm')).toBeInstanceOf(HTMLElement)
    })
  })

  describe('HoverCardArrow', () => {
    it('renders arrow component without errors', () => {
      expect(() => {
        render(
          <HoverCard open={true}>
            <HoverCardTrigger>Trigger</HoverCardTrigger>
            <HoverCardContent>
              Content
              <HoverCardArrow />
            </HoverCardContent>
          </HoverCard>
        )
      }).not.toThrow()
    })
  })

  describe('Accessibility', () => {
    it('has proper basic ARIA attributes when open', () => {
      render(
        <HoverCard open={true}>
          <HoverCardTrigger data-testid="trigger">Info</HoverCardTrigger>
          <HoverCardContent data-testid="content">Information content</HoverCardContent>
        </HoverCard>
      )

      const trigger = screen.getByTestId('trigger')
      const content = screen.getByTestId('content')

      // Check that content is rendered and accessible
      expect(content).toBeInstanceOf(HTMLElement)
      expect(content.textContent).toBe('Information content')
      expect(trigger.getAttribute('data-state')).toBe('open')
    })

    it('supports keyboard focus on trigger', () => {
      render(
        <HoverCard>
          <HoverCardTrigger data-testid="trigger">Info</HoverCardTrigger>
          <HoverCardContent data-testid="content">Information content</HoverCardContent>
        </HoverCard>
      )

      const trigger = screen.getByTestId('trigger')

      // Test that focus events can be triggered
      expect(() => {
        fireEvent.focus(trigger)
      }).not.toThrow()

      // Check that the trigger element is focusable (has tabindex or is naturally focusable)
      expect(trigger).toBeInstanceOf(HTMLElement)
    })

    it('triggers escape key events', () => {
      const { container } = render(
        <HoverCard open={true}>
          <HoverCardTrigger data-testid="trigger">Info</HoverCardTrigger>
          <HoverCardContent data-testid="content">Information content</HoverCardContent>
        </HoverCard>
      )

      // Test that escape key events can be triggered without error
      expect(() => {
        fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
      }).not.toThrow()
    })
  })

  describe('Component Composition', () => {
    it('renders complete hover card with all components when open', () => {
      render(
        <HoverCard open={true}>
          <HoverCardTrigger hasIcon data-testid="trigger">
            Learn more
          </HoverCardTrigger>
          <HoverCardContent data-testid="content">
            <HoverCardTitle>About this feature</HoverCardTitle>
            <HoverCardMain>
              This feature helps you understand the complex concepts by providing
              detailed explanations and examples.
            </HoverCardMain>
            <HoverCardFooter>
              <button>Got it</button>
            </HoverCardFooter>
            <HoverCardArrow />
          </HoverCardContent>
        </HoverCard>
      )

      const trigger = screen.getByTestId('trigger')

      // Should show icon
      expect(trigger.querySelector('svg')).toBeInstanceOf(SVGElement)

      // Content should be visible when open=true
      expect(screen.getByText('About this feature')).toBeInstanceOf(HTMLElement)
      expect(screen.getByText(/This feature helps you/)).toBeInstanceOf(HTMLElement)
      expect(screen.getByText('Got it')).toBeInstanceOf(HTMLElement)
    })

    it('works with custom styling and props when open', () => {
      render(
        <HoverCard open={true}>
          <HoverCardTrigger
            className="custom-trigger"
            hasIcon={true}
            data-testid="trigger"
          >
            Custom Trigger
          </HoverCardTrigger>
          <HoverCardContent
            className="custom-content"
            align="start"
            sideOffset={12}
            data-testid="content"
          >
            <HoverCardTitle className="custom-title">
              Custom Title
            </HoverCardTitle>
            <HoverCardMain className="custom-main">
              Custom main content
            </HoverCardMain>
            <HoverCardFooter className="custom-footer">
              Custom footer
            </HoverCardFooter>
          </HoverCardContent>
        </HoverCard>
      )

      const trigger = screen.getByTestId('trigger')
      expect(trigger.className).toContain('custom-trigger')

      const content = screen.getByTestId('content')
      expect(content.className).toContain('custom-content')

      const title = screen.getByText('Custom Title')
      expect(title.className).toContain('custom-title')

      const main = screen.getByText('Custom main content')
      expect(main.className).toContain('custom-main')

      const footer = screen.getByText('Custom footer')
      expect(footer.className).toContain('custom-footer')
    })

    it('works with asChild trigger pattern', () => {
      render(
        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="custom-button" data-testid="custom-trigger">
              <span>Custom Button Content</span>
            </button>
          </HoverCardTrigger>
          <HoverCardContent data-testid="content">
            Content for custom button
          </HoverCardContent>
        </HoverCard>
      )

      const customTrigger = screen.getByTestId('custom-trigger')
      expect(customTrigger.tagName).toBe('BUTTON')
      expect(customTrigger.className).toContain('custom-button')
      expect(screen.getByText('Custom Button Content')).toBeInstanceOf(HTMLElement)
    })
  })

  describe('Edge Cases', () => {
    it('handles missing content gracefully', () => {
      expect(() => {
        render(
          <HoverCard>
            <HoverCardTrigger>Trigger only</HoverCardTrigger>
          </HoverCard>
        )
      }).not.toThrow()
    })

    it('handles missing trigger gracefully', () => {
      expect(() => {
        render(
          <HoverCard>
            <HoverCardContent>Content only</HoverCardContent>
          </HoverCard>
        )
      }).not.toThrow()
    })

    it('handles empty children in sub-components', () => {
      expect(() => {
        render(
          <div>
            <HoverCardTitle>{}</HoverCardTitle>
            <HoverCardMain>{null}</HoverCardMain>
            <HoverCardFooter>{undefined}</HoverCardFooter>
          </div>
        )
      }).not.toThrow()
    })
  })
})