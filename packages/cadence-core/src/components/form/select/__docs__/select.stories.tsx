import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Select } from '../select'
import { Field } from '../../field'
import { Label } from '../../primitives'

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
]

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'mango', label: 'Mango' },
]

const meta: Meta<typeof Select> = {
  title: 'Cadence/Components/Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Whether the select is in an invalid state',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Select {...args} defaultValue="">
      <option value="" disabled>Select a country</option>
      {countries.map((country) => (
        <option key={country.value} value={country.value}>
          {country.label}
        </option>
      ))}
    </Select>
  ),
}

export const WithLabel: Story = {
  render: (args) => (
    <Field>
      <Label htmlFor="select-with-label">Country</Label>
      <Select id="select-with-label" {...args} defaultValue="">
        <option value="" disabled>Select a country</option>
        {countries.map((country) => (
          <option key={country.value} value={country.value}>
            {country.label}
          </option>
        ))}
      </Select>
    </Field>
  ),
}

export const WithPlaceholder: Story = {
  render: (args) => (
    <Field>
      <Label htmlFor="select-placeholder">Favorite Fruit</Label>
      <Select id="select-placeholder" {...args} defaultValue="">
        <option value="" disabled>Choose your favorite fruit...</option>
        {fruits.map((fruit) => (
          <option key={fruit.value} value={fruit.value}>
            {fruit.label}
          </option>
        ))}
      </Select>
    </Field>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <Field>
      <Label htmlFor="select-disabled">Country (Disabled)</Label>
      <Select id="select-disabled" {...args} disabled defaultValue="">
        <option value="" disabled>Cannot select</option>
        {countries.map((country) => (
          <option key={country.value} value={country.value}>
            {country.label}
          </option>
        ))}
      </Select>
    </Field>
  ),
}

export const Invalid: Story = {
  render: (args) => (
    <Field>
      <Label htmlFor="select-invalid">Country</Label>
      <Select id="select-invalid" {...args} isInvalid defaultValue="">
        <option value="" disabled>Please select a country</option>
        {countries.map((country) => (
          <option key={country.value} value={country.value}>
            {country.label}
          </option>
        ))}
      </Select>
    </Field>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows the select in an invalid state with error styling. The select displays a red border to indicate validation errors.',
      },
    },
  },
}

export const WithOptgroups: Story = {
  render: (args) => (
    <Field>
      <Label htmlFor="select-groups">Location</Label>
      <Select id="select-groups" {...args} defaultValue="">
        <option value="" disabled>Select a location</option>
        <optgroup label="North America">
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="mx">Mexico</option>
        </optgroup>
        <optgroup label="Europe">
          <option value="uk">United Kingdom</option>
          <option value="de">Germany</option>
          <option value="fr">France</option>
          <option value="es">Spain</option>
        </optgroup>
        <optgroup label="Asia">
          <option value="jp">Japan</option>
          <option value="cn">China</option>
          <option value="kr">South Korea</option>
        </optgroup>
      </Select>
    </Field>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates grouping options with native optgroup elements for better organization of related items.',
      },
    },
  },
}

const ControlledSelect = () => {
  const [value, setValue] = useState<string>('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Field>
        <Label htmlFor="select-controlled">Country</Label>
        <Select
          id="select-controlled"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <option value="" disabled>Select a country</option>
          {countries.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </Select>
      </Field>
      <p style={{ fontSize: '14px', color: '#666' }}>
        Selected value: <strong>{value || '(none)'}</strong>
      </p>
      <button
        onClick={() => setValue('')}
        style={{
          padding: '8px 16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: 'white',
          cursor: 'pointer',
          width: 'fit-content',
        }}
      >
        Clear Selection
      </button>
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledSelect />,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates controlled usage with React state. The selected value is managed externally and can be read or reset programmatically.',
      },
    },
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
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
          <Field>
            <Label htmlFor="focus-normal">Normal Select (Standard Focus Ring)</Label>
            <Select id="focus-normal" defaultValue="">
              <option value="" disabled>Standard blue focus ring</option>
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </Select>
          </Field>

          <Field>
            <Label htmlFor="focus-invalid">Invalid Select (Critical Focus Ring)</Label>
            <Select id="focus-invalid" isInvalid defaultValue="">
              <option value="" disabled>Critical red focus ring</option>
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </Select>
          </Field>

          <Field>
            <Label htmlFor="focus-with-value">Select With Value</Label>
            <Select id="focus-with-value" defaultValue="us">
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Focus rings appear when navigating with keyboard (Tab key). Normal selects use the standard blue focus ring, while invalid selects use the critical red focus ring to indicate errors.',
      },
    },
  },
}

export const Required: Story = {
  render: (args) => (
    <Field>
      <Label htmlFor="select-required">Country (Required)</Label>
      <Select id="select-required" {...args} required defaultValue="">
        <option value="" disabled>Select a country</option>
        {countries.map((country) => (
          <option key={country.value} value={country.value}>
            {country.label}
          </option>
        ))}
      </Select>
    </Field>
  ),
}
