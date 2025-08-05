import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CheckboxGroup, CheckboxItem } from '../checkbox'
import { Field } from '../../field'
import { Label } from '../../primitives/label'
import { HelperText } from '../../primitives/helper-text'
import { ValidationMessage } from '../../primitives/validation-message'

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Cadence/Components/Forms/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'object',
      description: 'The current selected values as an array',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox group is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox group is required',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the checkbox group',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])

    return (
      <CheckboxGroup
        value={value}
        onValueChange={setValue}
        aria-label="Choose your favorite colors"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckboxItem value="red" id="color-red" />
          <Label htmlFor="color-red">Red</Label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckboxItem value="blue" id="color-blue" />
          <Label htmlFor="color-blue">Blue</Label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckboxItem value="green" id="color-green" />
          <Label htmlFor="color-green">Green</Label>
        </div>
      </CheckboxGroup>
    )
  },
}

export const WithDefaultValues: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['blue', 'green'])

    return (
      <CheckboxGroup
        value={value}
        onValueChange={setValue}
        aria-label="Choose your favorite colors"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckboxItem value="red" id="default-red" />
          <Label htmlFor="default-red">Red</Label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckboxItem value="blue" id="default-blue" />
          <Label htmlFor="default-blue">Blue (Default)</Label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckboxItem value="green" id="default-green" />
          <Label htmlFor="default-green">Green (Default)</Label>
        </div>
      </CheckboxGroup>
    )
  },
}

export const StandaloneCheckbox: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <CheckboxItem
          value="standalone"
          id="standalone-checkbox"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <Label htmlFor="standalone-checkbox">I agree to the terms and conditions</Label>
      </div>
    )
  },
}

export const IndeterminateState: Story = {
  render: () => {
    const [parentChecked, setParentChecked] = useState<boolean | 'indeterminate'>('indeterminate')
    const [childChecked, setChildChecked] = useState(['option1'])

    const handleParentChange = (checked: boolean) => {
      if (checked) {
        setChildChecked(['option1', 'option2', 'option3'])
        setParentChecked(true)
      } else {
        setChildChecked([])
        setParentChecked(false)
      }
    }

    const handleChildChange = (values: string[]) => {
      setChildChecked(values)
      if (values.length === 0) {
        setParentChecked(false)
      } else if (values.length === 3) {
        setParentChecked(true)
      } else {
        setParentChecked('indeterminate')
      }
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckboxItem
            value="all"
            id="parent-checkbox"
            checked={parentChecked}
            onCheckedChange={handleParentChange}
          />
          <Label htmlFor="parent-checkbox" style={{ fontWeight: 'bold' }}>
            Select All Features
          </Label>
        </div>

        <div style={{ paddingLeft: '24px' }}>
          <CheckboxGroup
            value={childChecked}
            onValueChange={handleChildChange}
            aria-label="Available features"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckboxItem value="option1" id="feature-1" />
              <Label htmlFor="feature-1">Feature 1</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckboxItem value="option2" id="feature-2" />
              <Label htmlFor="feature-2">Feature 2</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckboxItem value="option3" id="feature-3" />
              <Label htmlFor="feature-3">Feature 3</Label>
            </div>
          </CheckboxGroup>
        </div>
      </div>
    )
  },
}

export const Horizontal: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])

    return (
      <CheckboxGroup
        value={value}
        onValueChange={setValue}
        orientation="horizontal"
        aria-label="Choose your favorite colors"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckboxItem value="red" id="horizontal-red" />
          <Label htmlFor="horizontal-red">Red</Label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckboxItem value="blue" id="horizontal-blue" />
          <Label htmlFor="horizontal-blue">Blue</Label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckboxItem value="green" id="horizontal-green" />
          <Label htmlFor="horizontal-green">Green</Label>
        </div>
      </CheckboxGroup>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <CheckboxGroup disabled aria-label="Choose your favorite colors">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <CheckboxItem value="red" id="disabled-red" />
        <Label htmlFor="disabled-red">Red</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <CheckboxItem value="blue" id="disabled-blue" />
        <Label htmlFor="disabled-blue">Blue</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <CheckboxItem value="green" id="disabled-green" />
        <Label htmlFor="disabled-green">Green</Label>
      </div>
    </CheckboxGroup>
  ),
}

export const DisabledWithValues: Story = {
  render: () => (
    <CheckboxGroup disabled value={['blue', 'green']} aria-label="Choose your favorite colors">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <CheckboxItem value="red" id="disabled-value-red" />
        <Label htmlFor="disabled-value-red">Red</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <CheckboxItem value="blue" id="disabled-value-blue" />
        <Label htmlFor="disabled-value-blue">Blue (Selected)</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <CheckboxItem value="green" id="disabled-value-green" />
        <Label htmlFor="disabled-value-green">Green (Selected)</Label>
      </div>
    </CheckboxGroup>
  ),
}

export const IndividualItemDisabled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])

    return (
      <CheckboxGroup
        value={value}
        onValueChange={setValue}
        aria-label="Choose your favorite colors"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckboxItem value="red" id="individual-red" />
          <Label htmlFor="individual-red">Red</Label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckboxItem value="blue" id="individual-blue" disabled />
          <Label htmlFor="individual-blue">Blue (Disabled)</Label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckboxItem value="green" id="individual-green" />
          <Label htmlFor="individual-green">Green</Label>
        </div>
      </CheckboxGroup>
    )
  },
}

export const Invalid: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])

    return (
      <CheckboxGroup
        value={value}
        onValueChange={setValue}
        aria-label="Choose your favorite colors"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckboxItem value="red" id="invalid-red" isInvalid />
          <Label htmlFor="invalid-red">Red</Label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckboxItem value="blue" id="invalid-blue" isInvalid />
          <Label htmlFor="invalid-blue">Blue</Label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckboxItem value="green" id="invalid-green" isInvalid />
          <Label htmlFor="invalid-green">Green</Label>
        </div>
      </CheckboxGroup>
    )
  },
}

export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])

    return (
      <Field>
        <CheckboxGroup
          value={value}
          onValueChange={setValue}
          aria-label="Choose your interests"
          aria-describedby="interests-helper"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckboxItem value="technology" id="interest-tech" />
            <Label htmlFor="interest-tech">Technology</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckboxItem value="design" id="interest-design" />
            <Label htmlFor="interest-design">Design</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckboxItem value="music" id="interest-music" />
            <Label htmlFor="interest-music">Music</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckboxItem value="sports" id="interest-sports" />
            <Label htmlFor="interest-sports">Sports</Label>
          </div>
        </CheckboxGroup>
        <HelperText>
          Select all topics that interest you. We'll customize your experience based on your choices.
        </HelperText>
      </Field>
    )
  },
}

export const WithValidation: Story = {
  render: () => {
    const [selectedInterests, setSelectedInterests] = useState<string[]>([])
    const [showError, setShowError] = useState(false)

    const handleSubmit = () => {
      if (selectedInterests.length === 0) {
        setShowError(true)
      } else {
        setShowError(false)
        alert(`Selected interests: ${selectedInterests.join(', ')}`)
      }
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Field>
          <CheckboxGroup
            value={selectedInterests}
            onValueChange={(values) => {
              setSelectedInterests(values)
              setShowError(false)
            }}
            required
            aria-label="Choose your interests"
            aria-describedby={showError ? 'interests-error' : undefined}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckboxItem
                value="technology"
                id="validation-tech"
                isInvalid={showError}
              />
              <Label htmlFor="validation-tech">Technology</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckboxItem
                value="design"
                id="validation-design"
                isInvalid={showError}
              />
              <Label htmlFor="validation-design">Design</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckboxItem
                value="music"
                id="validation-music"
                isInvalid={showError}
              />
              <Label htmlFor="validation-music">Music</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckboxItem
                value="sports"
                id="validation-sports"
                isInvalid={showError}
              />
              <Label htmlFor="validation-sports">Sports</Label>
            </div>
          </CheckboxGroup>
          {showError && (
            <ValidationMessage id="interests-error" type="error">
              Please select at least one interest to continue
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
            cursor: 'pointer'
          }}
        >
          Continue
        </button>
      </div>
    )
  },
}

export const CompleteExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      features: [] as string[],
      notifications: [] as string[],
      privacy: [] as string[],
    })

    const [errors, setErrors] = useState({
      features: false,
      privacy: false,
    })

    const handleFieldChange = (field: string, values: string[]) => {
      setFormData(prev => ({ ...prev, [field]: values }))
      setErrors(prev => ({ ...prev, [field]: false }))
    }

    const handleSubmit = () => {
      const newErrors = {
        features: formData.features.length === 0,
        privacy: formData.privacy.length === 0,
      }
      setErrors(newErrors)

      if (!newErrors.features && !newErrors.privacy) {
        alert('Settings saved successfully!')
      }
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: '400px' }}>
        <h3 style={{ margin: 0 }}>Account Settings</h3>

        <Field>
          <Label style={{ fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>
            Features *
          </Label>
          <CheckboxGroup
            value={formData.features}
            onValueChange={(values) => handleFieldChange('features', values)}
            required
            aria-describedby={errors.features ? 'features-error' : 'features-helper'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckboxItem
                value="analytics"
                id="feature-analytics"
                isInvalid={errors.features}
              />
              <Label htmlFor="feature-analytics">Advanced Analytics</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckboxItem
                value="collaboration"
                id="feature-collaboration"
                isInvalid={errors.features}
              />
              <Label htmlFor="feature-collaboration">Team Collaboration</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckboxItem
                value="api-access"
                id="feature-api"
                isInvalid={errors.features}
              />
              <Label htmlFor="feature-api">API Access</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckboxItem
                value="priority-support"
                id="feature-support"
                isInvalid={errors.features}
              />
              <Label htmlFor="feature-support">Priority Support</Label>
            </div>
          </CheckboxGroup>
          {errors.features ? (
            <ValidationMessage id="features-error" type="error">
              Please select at least one feature
            </ValidationMessage>
          ) : (
            <HelperText>
              Choose the features you want to enable for your account
            </HelperText>
          )}
        </Field>

        <Field>
          <Label style={{ fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>
            Notification Preferences
          </Label>
          <CheckboxGroup
            value={formData.notifications}
            onValueChange={(values) => handleFieldChange('notifications', values)}
            aria-describedby="notifications-helper"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckboxItem value="email" id="notification-email" />
              <Label htmlFor="notification-email">Email notifications</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckboxItem value="push" id="notification-push" />
              <Label htmlFor="notification-push">Push notifications</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckboxItem value="sms" id="notification-sms" />
              <Label htmlFor="notification-sms">SMS notifications</Label>
            </div>
          </CheckboxGroup>
          <HelperText>
            Choose how you want to receive notifications
          </HelperText>
        </Field>

        <Field>
          <Label style={{ fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>
            Privacy Settings *
          </Label>
          <CheckboxGroup
            value={formData.privacy}
            onValueChange={(values) => handleFieldChange('privacy', values)}
            required
            aria-describedby={errors.privacy ? 'privacy-error' : 'privacy-helper'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckboxItem
                value="analytics-cookies"
                id="privacy-analytics"
                isInvalid={errors.privacy}
              />
              <Label htmlFor="privacy-analytics">Allow analytics cookies</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckboxItem
                value="marketing-cookies"
                id="privacy-marketing"
                isInvalid={errors.privacy}
              />
              <Label htmlFor="privacy-marketing">Allow marketing cookies</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckboxItem
                value="data-sharing"
                id="privacy-sharing"
                isInvalid={errors.privacy}
              />
              <Label htmlFor="privacy-sharing">Allow data sharing with partners</Label>
            </div>
          </CheckboxGroup>
          {errors.privacy ? (
            <ValidationMessage id="privacy-error" type="error">
              Please select at least one privacy setting
            </ValidationMessage>
          ) : (
            <HelperText>
              Choose your privacy preferences (at least one required)
            </HelperText>
          )}
        </Field>

        <button
          type="button"
          onClick={handleSubmit}
          style={{
            padding: '12px 24px',
            alignSelf: 'flex-start',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Save Settings
        </button>
      </div>
    )
  },
}