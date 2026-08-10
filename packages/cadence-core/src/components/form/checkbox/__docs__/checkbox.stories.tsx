import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
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
      control: 'boolean',
      description: 'The checked state of the checkbox',
    },
    indeterminate: {
      control: 'boolean',
      description:
        'The third, mixed state. Native checkboxes model this as a DOM property rather than a value of `checked`, so the two are independent.',
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
    // The canonical use: a parent whose state is derived from its children. `checked` and
    // `indeterminate` are separate props because that is how the DOM models them.
    const [items, setItems] = useState([true, false, false])
    const allChecked = items.every(Boolean)
    const someChecked = items.some(Boolean) && !allChecked

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox
            id="indeterminate-parent"
            checked={allChecked}
            indeterminate={someChecked}
            onChange={(e) => setItems(items.map(() => e.target.checked))}
          />
          <Label htmlFor="indeterminate-parent">Select all</Label>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            paddingLeft: '24px',
          }}
        >
          {['Technology', 'Design', 'Music'].map((label, i) => (
            <div
              key={label}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Checkbox
                id={`indeterminate-child-${i}`}
                checked={items[i]}
                onChange={(e) =>
                  setItems(items.map((v, j) => (i === j ? e.target.checked : v)))
                }
              />
              <Label htmlFor={`indeterminate-child-${i}`}>{label}</Label>
            </div>
          ))}
        </div>
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
        <Checkbox disabled defaultChecked id="disabled-checked" />
        <Label htmlFor="disabled-checked">Disabled checked</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Checkbox disabled indeterminate id="disabled-indeterminate" />
        <Label htmlFor="disabled-indeterminate">Disabled indeterminate</Label>
      </div>
    </div>
  ),
}

export const Invalid: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Checkbox isInvalid id="invalid-checkbox" />
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
          <Checkbox id="field-checkbox" aria-describedby="field-helper" />
          <Label htmlFor="field-checkbox">
            I agree to the terms and conditions
          </Label>
        </div>
        <HelperText id="field-helper">
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
              onChange={(e) => {
                setChecked(e.target.checked)
                setShowError(false)
              }}
              isInvalid={showError}
              id="validation-checkbox"
              aria-describedby={showError ? 'validation-error' : undefined}
            />
            <Label htmlFor="validation-checkbox">
              I agree to receive marketing emails
            </Label>
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
    const options = [
      { value: 'option1', label: 'Technology' },
      { value: 'option2', label: 'Design' },
      { value: 'option3', label: 'Music' },
      { value: 'option4', label: 'Sports' },
    ]
    const [selectedItems, setSelectedItems] = useState<string[]>(['option2'])

    const handleItemChange = (value: string, checked: boolean) => {
      setSelectedItems((prev) =>
        checked ? [...prev, value] : prev.filter((item) => item !== value)
      )
    }

    return (
      <Field>
        <Label
          style={{ fontWeight: 'bold', marginBottom: '12px', display: 'block' }}
        >
          Select your interests
        </Label>
        <div
          role="group"
          aria-label="Select your interests"
          style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
          {options.map(({ value, label }) => (
            <div
              key={value}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Checkbox
                id={`group-${value}`}
                name="interests"
                value={value}
                checked={selectedItems.includes(value)}
                onChange={(e) => handleItemChange(value, e.target.checked)}
              />
              <Label htmlFor={`group-${value}`}>{label}</Label>
            </div>
          ))}
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
          Use Tab key to navigate and see focus rings appear on keyboard navigation
          only
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Checkbox id="focus-normal" />
            <Label htmlFor="focus-normal">
              Normal checkbox (standard focus ring)
            </Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Checkbox defaultChecked id="focus-checked" />
            <Label htmlFor="focus-checked">Checked checkbox</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Checkbox indeterminate id="focus-indeterminate" />
            <Label htmlFor="focus-indeterminate">Indeterminate checkbox</Label>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Focus rings appear when navigating with keyboard (Tab key) but not when clicking with mouse. All checkbox states (unchecked, checked, indeterminate) use the standard blue focus ring.',
      },
    },
  },
}
