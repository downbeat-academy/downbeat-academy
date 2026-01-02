import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel
} from '../select'
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

const meta: Meta<typeof SelectTrigger> = {
  title: 'Cadence/Components/Forms/Select',
  component: SelectTrigger,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when no value is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select trigger is disabled',
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
    <Select>
      <SelectTrigger {...args} placeholder="Select a country" />
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.value} value={country.value}>
            {country.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
}

export const WithLabel: Story = {
  render: (args) => (
    <Field>
      <Label htmlFor="select-with-label">Country</Label>
      <Select>
        <SelectTrigger id="select-with-label" {...args} placeholder="Select a country" />
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.value} value={country.value}>
              {country.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  ),
}

export const WithPlaceholder: Story = {
  render: (args) => (
    <Field>
      <Label htmlFor="select-placeholder">Favorite Fruit</Label>
      <Select>
        <SelectTrigger
          id="select-placeholder"
          {...args}
          placeholder="Choose your favorite fruit..."
        />
        <SelectContent>
          {fruits.map((fruit) => (
            <SelectItem key={fruit.value} value={fruit.value}>
              {fruit.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <Field>
      <Label htmlFor="select-disabled">Country (Disabled)</Label>
      <Select disabled>
        <SelectTrigger
          id="select-disabled"
          {...args}
          placeholder="Cannot select"
          disabled
        />
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.value} value={country.value}>
              {country.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  ),
}

export const Invalid: Story = {
  render: (args) => (
    <Field>
      <Label htmlFor="select-invalid">Country</Label>
      <Select>
        <SelectTrigger
          id="select-invalid"
          {...args}
          placeholder="Please select a country"
          isInvalid
        />
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.value} value={country.value}>
              {country.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows the select in an invalid state with error styling. The trigger displays a red border to indicate validation errors.',
      },
    },
  },
}

export const WithGroups: Story = {
  render: (args) => (
    <Field>
      <Label htmlFor="select-groups">Location</Label>
      <Select>
        <SelectTrigger id="select-groups" {...args} placeholder="Select a location" />
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="mx">Mexico</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="de">Germany</SelectItem>
            <SelectItem value="fr">France</SelectItem>
            <SelectItem value="es">Spain</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Asia</SelectLabel>
            <SelectItem value="jp">Japan</SelectItem>
            <SelectItem value="cn">China</SelectItem>
            <SelectItem value="kr">South Korea</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates grouping options with SelectGroup and SelectLabel for better organization of related items.',
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
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger id="select-controlled" placeholder="Select a country" />
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                {country.label}
              </SelectItem>
            ))}
          </SelectContent>
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
          Use Tab key to navigate and see focus rings appear on keyboard navigation only
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
          <Field>
            <Label htmlFor="focus-normal">Normal Select (Standard Focus Ring)</Label>
            <Select>
              <SelectTrigger id="focus-normal" placeholder="Standard blue focus ring" />
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <Label htmlFor="focus-invalid">Invalid Select (Critical Focus Ring)</Label>
            <Select>
              <SelectTrigger
                id="focus-invalid"
                placeholder="Critical red focus ring"
                isInvalid
              />
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <Label htmlFor="focus-with-value">Select With Value</Label>
            <Select defaultValue="us">
              <SelectTrigger
                id="focus-with-value"
                placeholder="Select a country"
              />
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Focus rings appear when navigating with keyboard (Tab key) but not when clicking with mouse. Normal selects use the standard blue focus ring, while invalid selects use the critical red focus ring to indicate errors.',
      },
    },
  },
}

export const Required: Story = {
  render: (args) => (
    <Field>
      <Label htmlFor="select-required">Country (Required)</Label>
      <Select required>
        <SelectTrigger
          id="select-required"
          {...args}
          placeholder="Select a country"
        />
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.value} value={country.value}>
              {country.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  ),
  args: {
    required: true,
  },
}
