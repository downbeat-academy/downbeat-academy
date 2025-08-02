import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from '../switch'
import { FormField } from '../../field/form-field'
import { Label } from '../../primitives/label'
import { HelperText } from '../../primitives/helper-text'
import { ValidationMessage } from '../../primitives/validation-message'

const meta: Meta<typeof Switch> = {
  title: 'Components/Form/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the switch is required',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Whether the switch is in an invalid state',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'switch-default',
    'aria-label': 'Toggle setting',
  },
}

export const Checked: Story = {
  args: {
    id: 'switch-checked',
    checked: true,
    'aria-label': 'Toggle setting',
  },
}

export const Disabled: Story = {
  args: {
    id: 'switch-disabled',
    disabled: true,
    'aria-label': 'Toggle setting',
  },
}

export const DisabledChecked: Story = {
  args: {
    id: 'switch-disabled-checked',
    disabled: true,
    checked: true,
    'aria-label': 'Toggle setting',
  },
}

export const Invalid: Story = {
  args: {
    id: 'switch-invalid',
    isInvalid: true,
    'aria-label': 'Toggle setting',
  },
}

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <FormField>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Switch
            id="switch-with-label"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <Label htmlFor="switch-with-label">Enable notifications</Label>
        </div>
      </FormField>
    )
  },
}

export const WithHelperText: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <FormField>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Switch
            id="switch-with-helper"
            checked={checked}
            onCheckedChange={setChecked}
            aria-describedby="switch-helper"
          />
          <Label htmlFor="switch-with-helper">Marketing emails</Label>
        </div>
        <HelperText>
          Receive updates about new features and promotions
        </HelperText>
      </FormField>
    )
  },
}

export const WithValidation: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    const [showError, setShowError] = useState(true)

    return (
      <FormField>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Switch
            id="switch-with-validation"
            checked={checked}
            onCheckedChange={(value) => {
              setChecked(value)
              setShowError(!value)
            }}
            isInvalid={showError}
            aria-describedby="switch-validation"
            required
          />
          <Label htmlFor="switch-with-validation">
            I agree to the terms and conditions
          </Label>
        </div>
        {showError && (
          <ValidationMessage id="switch-validation" type="error">
            You must accept the terms to continue
          </ValidationMessage>
        )}
      </FormField>
    )
  },
}

export const HorizontalLayout: Story = {
  render: () => {
    const [emailChecked, setEmailChecked] = useState(true)
    const [smsChecked, setSmsChecked] = useState(false)
    const [pushChecked, setPushChecked] = useState(true)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '400px' }}>
        <FormField orientation="horizontal">
          <Label htmlFor="switch-email" style={{ flex: 1 }}>Email notifications</Label>
          <Switch
            id="switch-email"
            checked={emailChecked}
            onCheckedChange={setEmailChecked}
          />
        </FormField>

        <FormField orientation="horizontal">
          <Label htmlFor="switch-sms" style={{ flex: 1 }}>SMS notifications</Label>
          <Switch
            id="switch-sms"
            checked={smsChecked}
            onCheckedChange={setSmsChecked}
          />
        </FormField>

        <FormField orientation="horizontal">
          <Label htmlFor="switch-push" style={{ flex: 1 }}>Push notifications</Label>
          <Switch
            id="switch-push"
            checked={pushChecked}
            onCheckedChange={setPushChecked}
          />
        </FormField>
      </div>
    )
  },
}

export const CompleteExample: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      marketing: false,
      analytics: true,
      terms: false,
    })

    const [errors, setErrors] = useState({
      terms: true,
    })

    const handleChange = (key: string, value: boolean) => {
      setSettings(prev => ({ ...prev, [key]: value }))
      if (key === 'terms') {
        setErrors(prev => ({ ...prev, terms: !value }))
      }
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '500px' }}>
        <h3 style={{ margin: 0 }}>Notification Settings</h3>

        <FormField>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Switch
              id="switch-notifications"
              checked={settings.notifications}
              onCheckedChange={(value) => handleChange('notifications', value)}
              aria-describedby="notifications-helper"
            />
            <Label htmlFor="switch-notifications">Enable all notifications</Label>
          </div>
          <HelperText>
            Get notified about important updates and activities
          </HelperText>
        </FormField>

        <FormField>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Switch
              id="switch-marketing"
              checked={settings.marketing}
              onCheckedChange={(value) => handleChange('marketing', value)}
              disabled={!settings.notifications}
            />
            <Label htmlFor="switch-marketing">Marketing communications</Label>
          </div>
        </FormField>

        <FormField>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Switch
              id="switch-analytics"
              checked={settings.analytics}
              onCheckedChange={(value) => handleChange('analytics', value)}
            />
            <Label htmlFor="switch-analytics">Share usage analytics</Label>
          </div>
        </FormField>

        <hr style={{ width: '100%', opacity: 0.2 }} />

        <FormField>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Switch
              id="switch-terms"
              checked={settings.terms}
              onCheckedChange={(value) => handleChange('terms', value)}
              isInvalid={errors.terms}
              aria-describedby={errors.terms ? 'terms-error' : undefined}
              required
            />
            <Label htmlFor="switch-terms">
              I accept the terms and conditions
            </Label>
          </div>
          {errors.terms && (
            <ValidationMessage id="terms-error" type="error">
              You must accept the terms to continue
            </ValidationMessage>
          )}
        </FormField>
      </div>
    )
  },
}