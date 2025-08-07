import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '../checkbox'
import { Field } from '../../field'
import { Label } from '../../primitives/label'
import { HelperText } from '../../primitives/helper-text'
import { ValidationMessage } from '../../primitives/validation-message'

const meta: Meta<typeof Checkbox> = {
  title: 'Cadence/Components/Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'radio' },
      options: [true, false, 'indeterminate'],
      description: 'The checked state of the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox is required',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Whether the checkbox is in an invalid state',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Checkbox id="default-checkbox" />
        <Label htmlFor="default-checkbox">Default checkbox</Label>
      </div>
    )
  },
}

export const Indeterminate: Story = {
  render: () => {
    const [checked, setChecked] = useState<boolean | 'indeterminate'>('indeterminate')

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Checkbox
          checked={checked}
          onCheckedChange={(value) => setChecked(value)}
          id="indeterminate-checkbox"
        />
        <Label htmlFor="indeterminate-checkbox">Indeterminate checkbox</Label>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Checkbox disabled id="disabled-unchecked" />
        <Label htmlFor="disabled-unchecked">Disabled unchecked</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Checkbox disabled checked id="disabled-checked" />
        <Label htmlFor="disabled-checked">Disabled checked</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Checkbox disabled checked="indeterminate" id="disabled-indeterminate" />
        <Label htmlFor="disabled-indeterminate">Disabled indeterminate</Label>
      </div>
    </div>
  ),
}

export const Invalid: Story = {
  render: () => {

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Checkbox
          isInvalid
          id="invalid-checkbox"
        />
        <Label htmlFor="invalid-checkbox">Invalid checkbox</Label>
      </div>
    )
  },
}

export const WithField: Story = {
  render: () => {

    return (
      <Field>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox
            id="field-checkbox"
            aria-describedby="field-helper"
          />
          <Label htmlFor="field-checkbox">I agree to the terms and conditions</Label>
        </div>
        <HelperText>
          Please read and accept our terms and conditions to continue.
        </HelperText>
      </Field>
    )
  },
}

export const WithValidation: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    const [showError, setShowError] = useState(false)

    const handleSubmit = () => {
      if (!checked) {
        setShowError(true)
      } else {
        setShowError(false)
        alert('Form submitted successfully!')
      }
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Field>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Checkbox
              checked={checked}
              onCheckedChange={(value) => {
                setChecked(!!value)
                setShowError(false)
              }}
              isInvalid={showError}
              id="validation-checkbox"
              aria-describedby={showError ? 'validation-error' : undefined}
            />
            <Label htmlFor="validation-checkbox">I agree to receive marketing emails</Label>
          </div>
          {showError && (
            <ValidationMessage id="validation-error" type="error">
              You must agree to receive marketing emails to continue
            </ValidationMessage>
          )}
        </Field>
        <button
          type="button"
          onClick={handleSubmit}
          style={{
            padding: '8px 16px',
            alignSelf: 'flex-start',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </div>
    )
  },
}

export const CheckboxGroup: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>(['option2'])

    const handleItemChange = (value: string, checked: boolean) => {
      if (checked) {
        setSelectedItems(prev => [...prev, value])
      } else {
        setSelectedItems(prev => prev.filter(item => item !== value))
      }
    }

    return (
      <Field>
        <Label style={{ fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>
          Select your interests
        </Label>
        <div
          role="group"
          aria-label="Select your interests"
          style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Checkbox
              checked={selectedItems.includes('option1')}
              onCheckedChange={(checked) => handleItemChange('option1', !!checked)}
              id="group-option1"
            />
            <Label htmlFor="group-option1">Technology</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Checkbox
              checked={selectedItems.includes('option2')}
              onCheckedChange={(checked) => handleItemChange('option2', !!checked)}
              id="group-option2"
            />
            <Label htmlFor="group-option2">Design</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Checkbox
              checked={selectedItems.includes('option3')}
              onCheckedChange={(checked) => handleItemChange('option3', !!checked)}
              id="group-option3"
            />
            <Label htmlFor="group-option3">Music</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Checkbox
              checked={selectedItems.includes('option4')}
              onCheckedChange={(checked) => handleItemChange('option4', !!checked)}
              id="group-option4"
            />
            <Label htmlFor="group-option4">Sports</Label>
          </div>
        </div>
        <HelperText>
          Select all topics that interest you. You can select multiple options.
        </HelperText>
      </Field>
    )
  },
}

export const FocusStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
          Keyboard Focus Demonstration
        </h4>
        <p style={{ marginBottom: '16px', fontSize: '12px', color: '#666' }}>
          Use Tab key to navigate and see focus rings appear on keyboard navigation only
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Checkbox id="focus-normal" />
            <Label htmlFor="focus-normal">Normal checkbox (standard focus ring)</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Checkbox checked id="focus-checked" />
            <Label htmlFor="focus-checked">Checked checkbox</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Checkbox checked="indeterminate" id="focus-indeterminate" />
            <Label htmlFor="focus-indeterminate">Indeterminate checkbox</Label>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Focus rings appear when navigating with keyboard (Tab key) but not when clicking with mouse. All checkbox states (unchecked, checked, indeterminate) use the standard blue focus ring.',
      },
    },
  },
}