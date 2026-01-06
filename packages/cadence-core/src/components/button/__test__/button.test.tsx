import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../Button'

// Mock icon component that captures props for testing
const MockIcon = ({
  width,
  height,
  'aria-hidden': ariaHidden,
  'data-testid': testId = 'mock-icon',
}: {
  width?: number
  height?: number
  'aria-hidden'?: boolean
  'data-testid'?: string
}) => (
  <svg
    data-testid={testId}
    data-width={width}
    data-height={height}
    data-aria-hidden={ariaHidden}
    width={width}
    height={height}
    aria-hidden={ariaHidden}
  >
    <rect />
  </svg>
)

describe('Button component', () => {
  describe('Basic rendering', () => {
    it('renders with children text', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByText('Click me')).toBeInstanceOf(HTMLElement)
    })

    it('renders as a button element by default', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button')
      expect(button.tagName).toBe('BUTTON')
    })

    it('renders as an anchor when href is provided', () => {
      render(<Button href="/test">Link button</Button>)
      const link = screen.getByRole('link')
      expect(link.tagName).toBe('A')
      expect(link).toHaveAttribute('href', '/test')
    })
  })

  describe('Icon rendering - Leading position (default)', () => {
    it('renders with leading icon by default', () => {
      render(
        <Button icon={<MockIcon data-testid="leading-icon" />}>
          Button text
        </Button>
      )

      const icon = screen.getByTestId('leading-icon')
      const buttonText = screen.getByText('Button text')

      expect(icon).toBeInstanceOf(HTMLElement)
      expect(buttonText).toBeInstanceOf(HTMLElement)

      // Check DOM order: icon should come before label
      const button = screen.getByRole('button')
      const children = Array.from(button.children)
      const iconIndex = children.findIndex(child => child.contains(icon))
      const labelIndex = children.findIndex(child => child.contains(buttonText))
      expect(iconIndex).toBeLessThan(labelIndex)
    })

    it('renders with leading icon when iconPosition is explicitly set to leading', () => {
      render(
        <Button icon={<MockIcon data-testid="leading-icon" />} iconPosition="leading">
          Button text
        </Button>
      )

      const icon = screen.getByTestId('leading-icon')
      const buttonText = screen.getByText('Button text')

      const button = screen.getByRole('button')
      const children = Array.from(button.children)
      const iconIndex = children.findIndex(child => child.contains(icon))
      const labelIndex = children.findIndex(child => child.contains(buttonText))
      expect(iconIndex).toBeLessThan(labelIndex)
    })
  })

  describe('Icon rendering - Trailing position', () => {
    it('renders with trailing icon when iconPosition="trailing"', () => {
      render(
        <Button icon={<MockIcon data-testid="trailing-icon" />} iconPosition="trailing">
          Button text
        </Button>
      )

      const icon = screen.getByTestId('trailing-icon')
      const buttonText = screen.getByText('Button text')

      // Check DOM order: label should come before icon
      const button = screen.getByRole('button')
      const children = Array.from(button.children)
      const iconIndex = children.findIndex(child => child.contains(icon))
      const labelIndex = children.findIndex(child => child.contains(buttonText))
      expect(labelIndex).toBeLessThan(iconIndex)
    })
  })

  describe('Icon sizing based on button size', () => {
    it('applies 12px size to icon for x-small button', () => {
      render(
        <Button size="x-small" icon={<MockIcon data-testid="icon-xsmall" />}>
          X-Small
        </Button>
      )

      const icon = screen.getByTestId('icon-xsmall')
      expect(icon).toHaveAttribute('width', '12')
      expect(icon).toHaveAttribute('height', '12')
    })

    it('applies 14px size to icon for small button', () => {
      render(
        <Button size="small" icon={<MockIcon data-testid="icon-small" />}>
          Small
        </Button>
      )

      const icon = screen.getByTestId('icon-small')
      expect(icon).toHaveAttribute('width', '14')
      expect(icon).toHaveAttribute('height', '14')
    })

    it('applies 16px size to icon for medium button (default)', () => {
      render(
        <Button size="medium" icon={<MockIcon data-testid="icon-medium" />}>
          Medium
        </Button>
      )

      const icon = screen.getByTestId('icon-medium')
      expect(icon).toHaveAttribute('width', '16')
      expect(icon).toHaveAttribute('height', '16')
    })

    it('applies 16px size to icon when no size prop is provided', () => {
      render(
        <Button icon={<MockIcon data-testid="icon-default" />}>
          Default Size
        </Button>
      )

      const icon = screen.getByTestId('icon-default')
      expect(icon).toHaveAttribute('width', '16')
      expect(icon).toHaveAttribute('height', '16')
    })

    it('applies 20px size to icon for large button', () => {
      render(
        <Button size="large" icon={<MockIcon data-testid="icon-large" />}>
          Large
        </Button>
      )

      const icon = screen.getByTestId('icon-large')
      expect(icon).toHaveAttribute('width', '20')
      expect(icon).toHaveAttribute('height', '20')
    })
  })

  describe('Icon-only button', () => {
    it('renders icon-only button correctly when no children provided', () => {
      render(
        <Button icon={<MockIcon data-testid="icon-only" />} aria-label="Icon button" />
      )

      const button = screen.getByRole('button')
      const icon = screen.getByTestId('icon-only')

      expect(button).toBeInstanceOf(HTMLElement)
      expect(icon).toBeInstanceOf(HTMLElement)
      expect(button).toHaveAttribute('aria-label', 'Icon button')
    })

    it('applies iconOnly class to icon-only button', () => {
      render(
        <Button icon={<MockIcon data-testid="icon-only" />} aria-label="Icon button" />
      )

      const button = screen.getByRole('button')
      expect(button.className).toContain('iconOnly')
    })

    it('does not apply iconOnly class when button has children', () => {
      render(
        <Button icon={<MockIcon />}>
          Has children
        </Button>
      )

      const button = screen.getByRole('button')
      expect(button.className).not.toContain('iconOnly')
    })

    it('icon-only button receives correct size props', () => {
      render(
        <Button
          size="large"
          icon={<MockIcon data-testid="icon-only-sized" />}
          aria-label="Large icon button"
        />
      )

      const icon = screen.getByTestId('icon-only-sized')
      expect(icon).toHaveAttribute('width', '20')
      expect(icon).toHaveAttribute('height', '20')
    })
  })

  describe('Icon accessibility', () => {
    it('icon container has aria-hidden="true"', () => {
      render(
        <Button icon={<MockIcon data-testid="accessible-icon" />}>
          Accessible button
        </Button>
      )

      const icon = screen.getByTestId('accessible-icon')
      const iconContainer = icon.parentElement

      expect(iconContainer).toHaveAttribute('aria-hidden', 'true')
    })

    it('icon element receives aria-hidden="true" prop via cloneElement', () => {
      render(
        <Button icon={<MockIcon data-testid="cloned-icon" />}>
          Cloned icon
        </Button>
      )

      const icon = screen.getByTestId('cloned-icon')
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    })

    it('icon-only button should have accessible label', () => {
      render(
        <Button
          icon={<MockIcon />}
          aria-label="Search"
        />
      )

      const button = screen.getByRole('button', { name: 'Search' })
      expect(button).toBeInstanceOf(HTMLElement)
    })
  })

  describe('Icon with different button variants', () => {
    const variants = ['primary', 'secondary', 'ghost', 'destructive'] as const

    variants.forEach(variant => {
      it(`renders icon correctly with ${variant} variant`, () => {
        render(
          <Button
            variant={variant}
            icon={<MockIcon data-testid={`icon-${variant}`} />}
          >
            {variant} button
          </Button>
        )

        const icon = screen.getByTestId(`icon-${variant}`)
        expect(icon).toBeInstanceOf(HTMLElement)
      })
    })
  })

  describe('Icon with link buttons', () => {
    it('renders icon in anchor button correctly', () => {
      render(
        <Button href="/test" icon={<MockIcon data-testid="link-icon" />}>
          Link with icon
        </Button>
      )

      const link = screen.getByRole('link')
      const icon = screen.getByTestId('link-icon')

      expect(link.tagName).toBe('A')
      expect(link.contains(icon)).toBe(true)
      expect(icon).toHaveAttribute('width', '16')
      expect(icon).toHaveAttribute('height', '16')
    })

    it('renders trailing icon in anchor button correctly', () => {
      render(
        <Button
          href="/test"
          icon={<MockIcon data-testid="trailing-link-icon" />}
          iconPosition="trailing"
        >
          Link with trailing icon
        </Button>
      )

      const icon = screen.getByTestId('trailing-link-icon')
      const buttonText = screen.getByText('Link with trailing icon')
      const link = screen.getByRole('link')

      const children = Array.from(link.children)
      const iconIndex = children.findIndex(child => child.contains(icon))
      const labelIndex = children.findIndex(child => child.contains(buttonText))
      expect(labelIndex).toBeLessThan(iconIndex)
    })
  })

  describe('Button without icon', () => {
    it('renders correctly without icon', () => {
      render(<Button>No icon</Button>)

      const button = screen.getByRole('button')
      expect(button).toBeInstanceOf(HTMLElement)
      expect(screen.getByText('No icon')).toBeInstanceOf(HTMLElement)
    })
  })

  describe('Button interaction with icon', () => {
    it('click handler works on button with icon', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(
        <Button icon={<MockIcon />} onClick={handleClick}>
          Clickable
        </Button>
      )

      const button = screen.getByRole('button')
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('disabled button with icon does not trigger click', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(
        <Button icon={<MockIcon />} onClick={handleClick} disabled>
          Disabled
        </Button>
      )

      const button = screen.getByRole('button')
      await user.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })
  })
})
