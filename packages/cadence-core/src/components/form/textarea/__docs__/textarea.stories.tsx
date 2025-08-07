import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from '../textarea'
import { Field } from '../../field'
import { Label } from '../../primitives'
import { ValidationMessage } from '../../primitives/validation-message'

const meta: Meta<typeof Textarea> = {
  title: 'Cadence/Components/Forms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the textarea',
    },
    rows: {
      control: 'number',
      description: 'Number of visible text rows',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the textarea is read-only',
    },
    required: {
      control: 'boolean',
      description: 'Whether the textarea is required',
    },
    value: {
      control: 'text',
      description: 'The value of the textarea',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
    rows: 5,
  },
}

export const WithLabel: Story = {
  render: (args) => (
    <Field>
      <Label htmlFor="textarea-with-label">Message</Label>
      <Textarea id="textarea-with-label" {...args} />
    </Field>
  ),
  args: {
    placeholder: 'Type your message here...',
    rows: 5,
  },
}

export const SmallTextarea: Story = {
  args: {
    placeholder: 'Small textarea',
    rows: 3,
  },
}

export const LargeTextarea: Story = {
  args: {
    placeholder: 'Large textarea for longer content',
    rows: 10,
  },
}

export const Required: Story = {
  render: (args) => (
    <Field>
      <Label htmlFor="textarea-required">Description</Label>
      <Textarea id="textarea-required" {...args} />
    </Field>
  ),
  args: {
    placeholder: 'Please provide a detailed description',
    required: true,
    rows: 6,
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'This textarea is disabled',
    disabled: true,
    rows: 5,
  },
}

export const ReadOnly: Story = {
  args: {
    value: 'This is read-only content.\nYou cannot edit this text.\nIt spans multiple lines.',
    readOnly: true,
    rows: 5,
  },
}

export const WithContent: Story = {
  args: {
    value: 'This textarea has pre-filled content that can be edited.',
    rows: 5,
  },
}

export const FocusStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Standard Focus States</h3>
        <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
          Click or tab into textareas to see focus rings
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Field>
            <Label htmlFor="focus-textarea1">Description</Label>
            <Textarea
              id="focus-textarea1"
              placeholder="Enter your description here..."
              rows={3}
            />
          </Field>
          <Field>
            <Label htmlFor="focus-textarea2">Comments</Label>
            <Textarea
              id="focus-textarea2"
              placeholder="Add your comments..."
              rows={4}
            />
          </Field>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Error State Focus</h3>
        <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
          Focus rings show critical color when textareas are in error state
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Field>
            <Label htmlFor="focus-error1">Required Description</Label>
            <Textarea
              id="focus-error1"
              placeholder="This field is required..."
              rows={3}
              isInvalid
              aria-describedby="error1-message"
            />
            <ValidationMessage id="error1-message" type="error">
              Description is required
            </ValidationMessage>
          </Field>
          <Field>
            <Label htmlFor="focus-error2">Message</Label>
            <Textarea
              id="focus-error2"
              placeholder="Enter your message..."
              rows={4}
              isInvalid
              aria-describedby="error2-message"
            />
            <ValidationMessage id="error2-message" type="error">
              Message must be at least 10 characters
            </ValidationMessage>
          </Field>
        </div>
      </div>
    </div>
  ),
}