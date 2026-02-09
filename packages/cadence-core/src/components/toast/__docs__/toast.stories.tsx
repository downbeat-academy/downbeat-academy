import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Toast,
  Toaster,
  ToastAction,
  useToast,
} from '../index'
import { Button } from '../../button'
import { Flex } from '../../flex'
import { Text } from '../../text'

/**
 * Each story gets its own isolated wrapper that:
 * - Renders a single `<Toaster />` for this story
 * - Dismisses all toasts on mount (cleans up from previous story navigation)
 * - Dismisses all toasts on unmount (prevents persistence across pages)
 */
function ToastStoryWrapper({ children }: { children: React.ReactNode }) {
  const { dismiss } = useToast()

  React.useEffect(() => {
    dismiss()
    return () => dismiss()
  }, [])

  return (
    <>
      {children}
      <Toaster />
    </>
  )
}

const meta: Meta<typeof Toast> = {
  title: 'Cadence / Components / Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Toast displays brief, non-intrusive notifications to the user. It's built on Radix UI's Toast primitive and styled with Cadence Design System tokens.

## Components

- **Toast**: The notification element with variant styling
- **ToastProvider**: Radix UI provider for toast context (included in Toaster)
- **ToastAction**: An action button within the toast
- **ToastClose**: Close button with X icon (included in Toaster)
- **ToastTitle**: Title text for the toast
- **ToastDescription**: Description text for the toast
- **ToastViewport**: Fixed-position container where toasts render (included in Toaster)
- **Toaster**: Composite component that renders all active toasts

## Usage

The toast system uses a global state pattern via the \`useToast\` hook and \`toast()\` function:

1. Render \`<Toaster />\` once in your app (typically in a root layout or provider)
2. Use \`useToast()\` hook or import \`toast\` directly to trigger notifications

\`\`\`tsx
import { Toaster, useToast } from 'cadence-core'

// In your root layout:
<Toaster />

// In any component:
const { toast } = useToast()
toast({ title: "Success!", variant: "success" })
\`\`\`

## Variants

- **default**: Dark/neutral notification
- **success**: Green notification for successful operations
- **error**: Red notification for errors
- **warning**: Yellow notification for warnings

## Accessibility

- Toasts are announced by screen readers via Radix UI's accessible primitives
- Close button is always available for keyboard and mouse dismissal
- Toasts auto-dismiss based on Radix UI's built-in timing
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Toast>

function DefaultToastTrigger() {
  const { toast } = useToast()
  return (
    <ToastStoryWrapper>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Notification',
            description: 'This is a default toast notification.',
          })
        }
      >
        Show Default Toast
      </Button>
    </ToastStoryWrapper>
  )
}

export const Default: Story = {
  render: () => <DefaultToastTrigger />,
}

function SuccessToastTrigger() {
  const { toast } = useToast()
  return (
    <ToastStoryWrapper>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Success!',
            description: 'Your changes have been saved.',
            variant: 'success',
          })
        }
      >
        Show Success Toast
      </Button>
    </ToastStoryWrapper>
  )
}

export const Success: Story = {
  render: () => <SuccessToastTrigger />,
  parameters: {
    docs: {
      description: {
        story: 'Use the success variant for confirming successful operations like saving data or completing actions.',
      },
    },
  },
}

function ErrorToastTrigger() {
  const { toast } = useToast()
  return (
    <ToastStoryWrapper>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Error',
            description: 'Something went wrong. Please try again.',
            variant: 'error',
          })
        }
      >
        Show Error Toast
      </Button>
    </ToastStoryWrapper>
  )
}

export const Error: Story = {
  render: () => <ErrorToastTrigger />,
  parameters: {
    docs: {
      description: {
        story: 'Use the error variant for failures, invalid inputs, or unexpected errors.',
      },
    },
  },
}

function WarningToastTrigger() {
  const { toast } = useToast()
  return (
    <ToastStoryWrapper>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Warning',
            description: 'Your session is about to expire.',
            variant: 'warning',
          })
        }
      >
        Show Warning Toast
      </Button>
    </ToastStoryWrapper>
  )
}

export const Warning: Story = {
  render: () => <WarningToastTrigger />,
  parameters: {
    docs: {
      description: {
        story: 'Use the warning variant for cautionary messages that need attention but are not errors.',
      },
    },
  },
}

function WithActionTrigger() {
  const { toast } = useToast()
  return (
    <ToastStoryWrapper>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Account not found',
            description: 'Would you like to create an account?',
            variant: 'error',
            action: (
              <ToastAction altText="Sign up" asChild>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => alert('Sign up clicked')}
                >
                  Sign up
                </Button>
              </ToastAction>
            ),
          })
        }
      >
        Show Toast with Action
      </Button>
    </ToastStoryWrapper>
  )
}

export const WithAction: Story = {
  render: () => <WithActionTrigger />,
  parameters: {
    docs: {
      description: {
        story: 'Toasts can include an action button using the `ToastAction` component. Use `asChild` to compose with the cadence-core `Button`. Provide an `altText` prop for accessibility.',
      },
    },
  },
}

function DirectionTrigger() {
  const { toast } = useToast()
  return (
    <ToastStoryWrapper>
      <Flex gap="small">
        <Button
          variant="secondary"
          onClick={() =>
            toast({
              title: 'From Bottom',
              description: 'This toast slides up from the bottom.',
              variant: 'success',
              direction: 'from-bottom',
            })
          }
        >
          Slide from Bottom
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast({
              title: 'From Right',
              description: 'This toast slides in from the right.',
              variant: 'success',
              direction: 'from-right',
            })
          }
        >
          Slide from Right
        </Button>
      </Flex>
    </ToastStoryWrapper>
  )
}

export const Directions: Story = {
  render: () => <DirectionTrigger />,
  parameters: {
    docs: {
      description: {
        story: 'Toasts support two slide directions: `from-bottom` (default) and `from-right`.',
      },
    },
  },
}

function AllVariantsTrigger() {
  const { toast } = useToast()
  return (
    <ToastStoryWrapper>
      <Flex gap="small" direction="column">
        <Text type="productive-body" size="body-small" color="faint">
          Click the buttons below to trigger toasts of each variant.
        </Text>
        <Flex gap="small">
          <Button
            variant="secondary"
            onClick={() =>
              toast({ title: 'Default', description: 'A default notification.' })
            }
          >
            Default
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                title: 'Success',
                description: 'Operation completed.',
                variant: 'success',
              })
            }
          >
            Success
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                title: 'Warning',
                description: 'Please review carefully.',
                variant: 'warning',
              })
            }
          >
            Warning
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                title: 'Error',
                description: 'Something failed.',
                variant: 'error',
              })
            }
          >
            Error
          </Button>
        </Flex>
      </Flex>
    </ToastStoryWrapper>
  )
}

export const AllVariants: Story = {
  render: () => <AllVariantsTrigger />,
  parameters: {
    docs: {
      description: {
        story: 'Overview of all four toast variants. Click each button to see the corresponding style.',
      },
    },
  },
}
