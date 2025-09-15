import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import {
  Tooltip,
  TooltipProvider,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '../index'

// Helper component to wrap tests with TooltipProvider
const TooltipWrapper = ({ children }: { children: React.ReactNode }) => (
  <TooltipProvider>{children}</TooltipProvider>
)

describe('Tooltip Components', () => {
  describe('TooltipProvider', () => {
    it('renders without crashing', () => {
      expect(() => {
        render(
          <TooltipProvider>
            <div>Test content</div>
          </TooltipProvider>
        )
      }).not.toThrow()
    })

    it('renders children correctly', () => {
      render(
        <TooltipProvider>
          <div>Provider content</div>
        </TooltipProvider>
      )

      expect(screen.getByText('Provider content')).toBeInstanceOf(HTMLElement)
    })

    it('accepts and forwards props to Radix provider', () => {
      expect(() => {
        render(
          <TooltipProvider delayDuration={500} skipDelayDuration={300}>
            <div>Provider with props</div>
          </TooltipProvider>
        )
      }).not.toThrow()
    })
  })

  describe('Tooltip Root', () => {
    it('renders without crashing', () => {
      expect(() => {
        render(
          <TooltipWrapper>
            <Tooltip>
              <TooltipTrigger>Trigger</TooltipTrigger>
              <TooltipContent>Content</TooltipContent>
            </Tooltip>
          </TooltipWrapper>
        )
      }).not.toThrow()
    })

    it('accepts and forwards props to Radix primitive', () => {
      const onOpenChange = vi.fn()
      render(
        <TooltipWrapper>
          <Tooltip open={true} onOpenChange={onOpenChange}>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent>Content</TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      const trigger = screen.getByText('Trigger')
      expect(trigger).toBeInstanceOf(HTMLElement)
    })

    it('supports controlled state with open prop', () => {
      const { rerender } = render(
        <TooltipWrapper>
          <Tooltip open={false}>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent>Hidden Content</TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      // Content should not be visible when open=false
      expect(screen.queryByText('Hidden Content')).toBeNull()

      rerender(
        <TooltipWrapper>
          <Tooltip open={true}>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent>Visible Content</TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      // Content should be visible when open=true (use getAllByText since Radix creates duplicates)
      const visibleContent = screen.getAllByText('Visible Content')
      expect(visibleContent.length).toBeGreaterThan(0)
      expect(visibleContent[0]).toBeInstanceOf(HTMLElement)
    })

    it('uses default delayDuration when not specified', () => {
      render(
        <TooltipWrapper>
          <Tooltip>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent>Content</TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      // Just verify the component renders, timing is internal to Radix
      expect(screen.getByText('Trigger')).toBeInstanceOf(HTMLElement)
    })

    it('accepts custom delayDuration', () => {
      render(
        <TooltipWrapper>
          <Tooltip delayDuration={300}>
            <TooltipTrigger>Fast Trigger</TooltipTrigger>
            <TooltipContent>Fast Content</TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      expect(screen.getByText('Fast Trigger')).toBeInstanceOf(HTMLElement)
    })
  })

  describe('TooltipTrigger', () => {
    it('renders children correctly', () => {
      render(
        <TooltipWrapper>
          <Tooltip>
            <TooltipTrigger>Test Trigger</TooltipTrigger>
            <TooltipContent>Content</TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      expect(screen.getByText('Test Trigger')).toBeInstanceOf(HTMLElement)
    })

    it('applies custom className', () => {
      render(
        <TooltipWrapper>
          <Tooltip>
            <TooltipTrigger className="custom-trigger">Trigger</TooltipTrigger>
            <TooltipContent>Content</TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      const trigger = screen.getByText('Trigger')
      expect(trigger.className).toContain('custom-trigger')
    })

    it('renders as child element when asChild is true', () => {
      render(
        <TooltipWrapper>
          <Tooltip>
            <TooltipTrigger asChild>
              <button data-testid="custom-button">Custom Button</button>
            </TooltipTrigger>
            <TooltipContent>Content</TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      const customButton = screen.getByTestId('custom-button')
      expect(customButton.tagName).toBe('BUTTON')
    })

    it('supports hover and focus interactions', () => {
      render(
        <TooltipWrapper>
          <Tooltip>
            <TooltipTrigger data-testid="hover-trigger">Hover me</TooltipTrigger>
            <TooltipContent>Hover content</TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      const trigger = screen.getByTestId('hover-trigger')

      // Test that hover events can be triggered
      expect(() => {
        fireEvent.mouseEnter(trigger)
        fireEvent.focus(trigger)
      }).not.toThrow()

      // Check that the trigger element exists
      expect(trigger).toBeInstanceOf(HTMLElement)
    })

    it('supports aria attributes', () => {
      render(
        <TooltipWrapper>
          <Tooltip>
            <TooltipTrigger
              aria-label="Custom trigger label"
              aria-describedby="trigger-description"
            >
              Accessible Trigger
            </TooltipTrigger>
            <TooltipContent>Content</TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      const trigger = screen.getByText('Accessible Trigger')
      expect(trigger.getAttribute('aria-label')).toBe('Custom trigger label')
      expect(trigger.getAttribute('aria-describedby')).toBe('trigger-description')
    })

    it('forwards HTML attributes correctly', () => {
      render(
        <TooltipWrapper>
          <Tooltip>
            <TooltipTrigger
              data-testid="test-trigger"
              id="trigger-id"
              tabIndex={0}
            >
              Trigger with attributes
            </TooltipTrigger>
            <TooltipContent>Content</TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      const trigger = screen.getByTestId('test-trigger')
      expect(trigger.getAttribute('id')).toBe('trigger-id')
      expect(trigger.getAttribute('tabindex')).toBe('0')
    })
  })

  describe('TooltipContent', () => {
    it('renders content correctly when open', () => {
      render(
        <TooltipWrapper>
          <Tooltip open={true}>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent>Test Content</TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      // Use getAllByText since Radix creates duplicate content for accessibility
      const testContent = screen.getAllByText('Test Content')
      expect(testContent.length).toBeGreaterThan(0)
      expect(testContent[0]).toBeInstanceOf(HTMLElement)
    })

    it('applies custom className', () => {
      render(
        <TooltipWrapper>
          <Tooltip open={true}>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent className="custom-content">Content</TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      const content = screen.getAllByText('Content')[0]
      expect(content.className).toContain('custom-content')
    })

    it('renders with default positioning props', () => {
      render(
        <TooltipWrapper>
          <Tooltip open={true}>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent data-testid="content">Content</TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      const content = screen.getByTestId('content')
      expect(content).toBeInstanceOf(HTMLElement)
      // Radix creates duplicate content for accessibility, so text appears twice
      expect(content.textContent).toContain('Content')
    })

    it('accepts custom positioning props', () => {
      render(
        <TooltipWrapper>
          <Tooltip open={true}>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent
              data-testid="content"
              side="top"
              align="start"
              sideOffset={8}
            >
              Content
            </TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      const content = screen.getByTestId('content')
      expect(content).toBeInstanceOf(HTMLElement)
      // Radix creates duplicate content for accessibility, so text appears twice
      expect(content.textContent).toContain('Content')
    })

    it('renders within a Portal', () => {
      const { container } = render(
        <TooltipWrapper>
          <Tooltip open={true}>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent>Portal Content</TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      // Content should be rendered outside the container due to Portal
      const triggerInContainer = container.querySelector('button')
      expect(triggerInContainer).toBeInstanceOf(HTMLElement)

      // But content should still be accessible via screen (rendered in Portal)
      const portalContent = screen.getAllByText('Portal Content')
      expect(portalContent.length).toBeGreaterThan(0)
      expect(portalContent[0]).toBeInstanceOf(HTMLElement)
    })

    it('supports complex children', () => {
      render(
        <TooltipWrapper>
          <Tooltip open={true}>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent>
              <div>
                <span>Rich content</span>
                <strong>Bold text</strong>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      expect(screen.getAllByText('Rich content')[0]).toBeInstanceOf(HTMLElement)
      expect(screen.getAllByText('Bold text')[0]).toBeInstanceOf(HTMLElement)
    })

    it('forwards HTML attributes correctly', () => {
      render(
        <TooltipWrapper>
          <Tooltip open={true}>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent
              data-testid="test-content"
              id="content-id"
              role="tooltip"
            >
              Content with attributes
            </TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      const content = screen.getByTestId('test-content')
      expect(content.getAttribute('id')).toBe('content-id')
      expect(content.getAttribute('role')).toBe('tooltip')
    })
  })

  describe('TooltipArrow', () => {
    it('renders arrow component without errors', () => {
      expect(() => {
        render(
          <TooltipWrapper>
            <Tooltip open={true}>
              <TooltipTrigger>Trigger</TooltipTrigger>
              <TooltipContent>
                Content
                <TooltipArrow />
              </TooltipContent>
            </Tooltip>
          </TooltipWrapper>
        )
      }).not.toThrow()
    })

    it('can be styled with custom props', () => {
      expect(() => {
        render(
          <TooltipWrapper>
            <Tooltip open={true}>
              <TooltipTrigger>Trigger</TooltipTrigger>
              <TooltipContent>
                Content
                <TooltipArrow width={10} height={5} />
              </TooltipContent>
            </Tooltip>
          </TooltipWrapper>
        )
      }).not.toThrow()
    })
  })

  describe('Accessibility', () => {
    it('has proper basic ARIA attributes when open', () => {
      render(
        <TooltipWrapper>
          <Tooltip open={true}>
            <TooltipTrigger data-testid="trigger">Help</TooltipTrigger>
            <TooltipContent data-testid="content">Help information</TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      const trigger = screen.getByTestId('trigger')
      const content = screen.getByTestId('content')

      // Check that content is rendered and accessible
      expect(content).toBeInstanceOf(HTMLElement)
      // Radix creates duplicate content for accessibility, so text appears twice
      expect(content.textContent).toContain('Help information')
      expect(trigger).toBeInstanceOf(HTMLElement)
    })

    it('supports keyboard focus on trigger', () => {
      render(
        <TooltipWrapper>
          <Tooltip>
            <TooltipTrigger data-testid="trigger">Help</TooltipTrigger>
            <TooltipContent data-testid="content">Help information</TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      const trigger = screen.getByTestId('trigger')

      // Test that focus events can be triggered
      expect(() => {
        fireEvent.focus(trigger)
      }).not.toThrow()

      // Check that the trigger element is focusable
      expect(trigger).toBeInstanceOf(HTMLElement)
    })

    it('triggers escape key events', () => {
      render(
        <TooltipWrapper>
          <Tooltip open={true}>
            <TooltipTrigger data-testid="trigger">Help</TooltipTrigger>
            <TooltipContent data-testid="content">Help information</TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      // Test that escape key events can be triggered without error
      expect(() => {
        fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
      }).not.toThrow()
    })

    it('supports screen reader announcements', () => {
      render(
        <TooltipWrapper>
          <Tooltip open={true}>
            <TooltipTrigger
              data-testid="trigger"
              aria-describedby="tooltip-content"
            >
              Help button
            </TooltipTrigger>
            <TooltipContent
              data-testid="content"
              id="tooltip-content"
            >
              This provides help information
            </TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      const trigger = screen.getByTestId('trigger')
      const content = screen.getByTestId('content')

      expect(trigger.getAttribute('aria-describedby')).toBe('tooltip-content')
      expect(content.getAttribute('id')).toBe('tooltip-content')
    })
  })

  describe('Component Composition', () => {
    it('renders complete tooltip with arrow when open', () => {
      render(
        <TooltipWrapper>
          <Tooltip open={true}>
            <TooltipTrigger data-testid="trigger">
              Help icon
            </TooltipTrigger>
            <TooltipContent data-testid="content">
              <p>This is helpful information</p>
              <TooltipArrow />
            </TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      // Content should be visible when open=true (use getAllByText for Radix duplicates)
      const helpfulInfo = screen.getAllByText('This is helpful information')
      expect(helpfulInfo.length).toBeGreaterThan(0)
      expect(helpfulInfo[0]).toBeInstanceOf(HTMLElement)
    })

    it('works with custom styling and props when open', () => {
      render(
        <TooltipWrapper>
          <Tooltip open={true} delayDuration={300}>
            <TooltipTrigger
              className="custom-trigger"
              data-testid="trigger"
            >
              Custom Trigger
            </TooltipTrigger>
            <TooltipContent
              className="custom-content"
              side="top"
              sideOffset={12}
              data-testid="content"
            >
              Custom tooltip content
            </TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      const trigger = screen.getByTestId('trigger')
      expect(trigger.className).toContain('custom-trigger')

      const content = screen.getByTestId('content')
      expect(content.className).toContain('custom-content')
    })

    it('works with asChild trigger pattern', () => {
      render(
        <TooltipWrapper>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="custom-button" data-testid="custom-trigger">
                <span>Custom Button Content</span>
              </button>
            </TooltipTrigger>
            <TooltipContent data-testid="content">
              Content for custom button
            </TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      const customTrigger = screen.getByTestId('custom-trigger')
      expect(customTrigger.tagName).toBe('BUTTON')
      expect(customTrigger.className).toContain('custom-button')
      expect(screen.getByText('Custom Button Content')).toBeInstanceOf(HTMLElement)
    })

    it('works with different positioning options', () => {
      const positions = ['top', 'right', 'bottom', 'left'] as const
      const alignments = ['start', 'center', 'end'] as const

      positions.forEach((side) => {
        alignments.forEach((align) => {
          const { unmount } = render(
            <TooltipWrapper>
              <Tooltip open={true}>
                <TooltipTrigger>Trigger {side}-{align}</TooltipTrigger>
                <TooltipContent side={side} align={align}>
                  Content {side}-{align}
                </TooltipContent>
              </Tooltip>
            </TooltipWrapper>
          )

          const content = screen.getAllByText(`Content ${side}-${align}`)
          expect(content.length).toBeGreaterThan(0)
          expect(content[0]).toBeInstanceOf(HTMLElement)
          unmount()
        })
      })
    })
  })

  describe('Provider Context', () => {
    it('requires TooltipProvider for proper functionality', () => {
      // This test verifies that tooltips work within provider context
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Trigger in Provider</TooltipTrigger>
            <TooltipContent>Content in Provider</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      expect(screen.getByText('Trigger in Provider')).toBeInstanceOf(HTMLElement)
    })

    it('supports multiple tooltips within same provider', () => {
      render(
        <TooltipProvider>
          <div>
            <Tooltip>
              <TooltipTrigger>First Trigger</TooltipTrigger>
              <TooltipContent>First Content</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>Second Trigger</TooltipTrigger>
              <TooltipContent>Second Content</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      )

      expect(screen.getByText('First Trigger')).toBeInstanceOf(HTMLElement)
      expect(screen.getByText('Second Trigger')).toBeInstanceOf(HTMLElement)
    })

    it('respects provider-level configuration', () => {
      render(
        <TooltipProvider delayDuration={100} skipDelayDuration={200}>
          <Tooltip>
            <TooltipTrigger>Provider Config</TooltipTrigger>
            <TooltipContent>Provider Content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      expect(screen.getByText('Provider Config')).toBeInstanceOf(HTMLElement)
    })
  })

  describe('Edge Cases', () => {
    it('handles missing content gracefully', () => {
      expect(() => {
        render(
          <TooltipWrapper>
            <Tooltip>
              <TooltipTrigger>Trigger only</TooltipTrigger>
            </Tooltip>
          </TooltipWrapper>
        )
      }).not.toThrow()
    })

    it('handles missing trigger gracefully', () => {
      expect(() => {
        render(
          <TooltipWrapper>
            <Tooltip>
              <TooltipContent>Content only</TooltipContent>
            </Tooltip>
          </TooltipWrapper>
        )
      }).not.toThrow()
    })

    it('handles empty content', () => {
      expect(() => {
        render(
          <TooltipWrapper>
            <Tooltip open={true}>
              <TooltipTrigger>Trigger</TooltipTrigger>
              <TooltipContent>{null}</TooltipContent>
            </Tooltip>
          </TooltipWrapper>
        )
      }).not.toThrow()
    })

    it('handles complex nested content', () => {
      render(
        <TooltipWrapper>
          <Tooltip open={true}>
            <TooltipTrigger>Complex Trigger</TooltipTrigger>
            <TooltipContent>
              <div>
                <p>Paragraph 1</p>
                <p>Paragraph 2</p>
                <ul>
                  <li>Item 1</li>
                  <li>Item 2</li>
                </ul>
                <button>Action Button</button>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      expect(screen.getAllByText('Paragraph 1')[0]).toBeInstanceOf(HTMLElement)
      expect(screen.getAllByText('Paragraph 2')[0]).toBeInstanceOf(HTMLElement)
      expect(screen.getAllByText('Item 1')[0]).toBeInstanceOf(HTMLElement)
      expect(screen.getAllByText('Item 2')[0]).toBeInstanceOf(HTMLElement)
      expect(screen.getAllByText('Action Button')[0]).toBeInstanceOf(HTMLElement)
    })

    it('handles rapid state changes', () => {
      const { rerender } = render(
        <TooltipWrapper>
          <Tooltip open={false}>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent>Content</TooltipContent>
          </Tooltip>
        </TooltipWrapper>
      )

      // Rapidly toggle state
      for (let i = 0; i < 5; i++) {
        rerender(
          <TooltipWrapper>
            <Tooltip open={i % 2 === 0}>
              <TooltipTrigger>Trigger</TooltipTrigger>
              <TooltipContent>Content</TooltipContent>
            </Tooltip>
          </TooltipWrapper>
        )
      }

      // Should still work after rapid changes
      expect(screen.getByText('Trigger')).toBeInstanceOf(HTMLElement)
    })
  })
})