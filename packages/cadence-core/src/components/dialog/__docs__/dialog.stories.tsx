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
import { Button, ButtonWrapper } from '../../button'
import { Text } from '../../text'
import { Flex } from '../../flex'
import { Form, Field, Label, Input } from '../../form'

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
        <Button variant="secondary">Open Dialog</Button>
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
          <ButtonWrapper>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button variant="primary">Confirm</Button>
          </ButtonWrapper>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information below.
          </DialogDescription>
        </DialogHeader>
        <Form>
          <Field>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
            />
          </Field>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </Field>
        </Form>
        <DialogFooter>
          <ButtonWrapper>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button variant="primary">Save Changes</Button>
          </ButtonWrapper>
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
        <Button variant="destructive">Delete Account</Button>
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
          <ButtonWrapper>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button variant="destructive">Delete Account</Button>
          </ButtonWrapper>
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
        <Button variant="secondary">Open Simple Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notification</DialogTitle>
        </DialogHeader>
        <Text type="productive-body" size="body-base">
          Your changes have been saved successfully. You can continue editing
          or close this dialog.
        </Text>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="primary">OK</Button>
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
      <Flex direction="column" gap="small" alignItems="center">
        <Text type="productive-body" size="body-small" color="faint">
          Dialog is {open ? 'open' : 'closed'}
        </Text>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary">Open Controlled Dialog</Button>
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
              <Button variant="primary" onClick={() => setOpen(false)}>
                Close Programmatically
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Flex>
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
