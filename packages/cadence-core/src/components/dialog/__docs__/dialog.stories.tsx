import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from '../index'

const meta: Meta<typeof Dialog> = {
  title: 'Cadence / Components / Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Dialog displays a modal overlay that requires user attention or interaction. It's built on Radix UI's Dialog primitive and styled with Cadence Design System tokens.

## Components

- **Dialog**: Root component that manages open/close state
- **DialogTrigger**: Element that opens the dialog
- **DialogContent**: The modal content container (includes overlay and close button)
- **DialogHeader**: Container for the dialog header area
- **DialogTitle**: Accessible title for the dialog
- **DialogDescription**: Accessible description text
- **DialogFooter**: Container for action buttons
- **DialogClose**: Wraps elements that close the dialog
- **DialogPortal**: Renders dialog content into a portal
- **DialogOverlay**: The backdrop overlay (automatically included in DialogContent)

## Accessibility

- Focus is trapped within the dialog when open
- Pressing Escape closes the dialog
- Screen readers announce the dialog title and description
- Focus returns to the trigger element when closed
- Background content is inert when dialog is open
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <button style={{
          padding: '8px 16px',
          cursor: 'pointer',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: '#f9f9f9',
        }}>
          Open Dialog
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of the dialog content. It provides context
            about what the user should do.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <button style={{
              padding: '8px 16px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: '#f9f9f9',
            }}>
              Cancel
            </button>
          </DialogClose>
          <button style={{
            padding: '8px 16px',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '4px',
            background: '#1a1a2e',
            color: 'white',
          }}>
            Confirm
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <button style={{
          padding: '8px 16px',
          cursor: 'pointer',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: '#f9f9f9',
        }}>
          Edit Profile
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information below.
          </DialogDescription>
        </DialogHeader>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label htmlFor="name" style={{ fontSize: '14px', fontWeight: 500 }}>Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              style={{
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label htmlFor="email" style={{ fontSize: '14px', fontWeight: 500 }}>Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              style={{
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            />
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <button style={{
              padding: '8px 16px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: '#f9f9f9',
            }}>
              Cancel
            </button>
          </DialogClose>
          <button style={{
            padding: '8px 16px',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '4px',
            background: '#1a1a2e',
            color: 'white',
          }}>
            Save Changes
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dialog can contain form elements for user input. The close button in the top-right corner and the DialogClose component both dismiss the dialog.',
      },
    },
  },
}

export const ConfirmationDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <button style={{
          padding: '8px 16px',
          cursor: 'pointer',
          border: 'none',
          borderRadius: '4px',
          background: '#dc3545',
          color: 'white',
        }}>
          Delete Account
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove all associated data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <button style={{
              padding: '8px 16px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: '#f9f9f9',
            }}>
              Cancel
            </button>
          </DialogClose>
          <button style={{
            padding: '8px 16px',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '4px',
            background: '#dc3545',
            color: 'white',
          }}>
            Delete Account
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use a confirmation dialog for destructive or irreversible actions. Provide clear context about what will happen if the user confirms.',
      },
    },
  },
}

export const TitleOnly: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <button style={{
          padding: '8px 16px',
          cursor: 'pointer',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: '#f9f9f9',
        }}>
          Open Simple Dialog
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notification</DialogTitle>
        </DialogHeader>
        <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5 }}>
          Your changes have been saved successfully. You can continue editing
          or close this dialog.
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <button style={{
              padding: '8px 16px',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '4px',
              background: '#1a1a2e',
              color: 'white',
            }}>
              OK
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A simpler dialog with just a title, body text, and a single action button.',
      },
    },
  },
}

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Dialog is {open ? 'open' : 'closed'}
        </p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button style={{
              padding: '8px 16px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: '#f9f9f9',
            }}>
              Open Controlled Dialog
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>
                This dialog&apos;s open state is controlled externally via the
                open and onOpenChange props.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button
                onClick={() => setOpen(false)}
                style={{
                  padding: '8px 16px',
                  cursor: 'pointer',
                  border: 'none',
                  borderRadius: '4px',
                  background: '#1a1a2e',
                  color: 'white',
                }}
              >
                Close Programmatically
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the `open` and `onOpenChange` props to control the dialog state externally. This is useful when you need to close the dialog programmatically, such as after a form submission.',
      },
    },
  },
}
