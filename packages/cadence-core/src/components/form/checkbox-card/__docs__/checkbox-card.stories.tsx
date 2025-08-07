import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Microphone } from 'cadence-icons'
import { CheckboxCardGroup, CheckboxCardItem } from '../index'
import { Field } from '../../field'
import { Label } from '../../primitives/label'
import { HelperText } from '../../primitives/helper-text'
import { ValidationMessage } from '../../primitives/validation-message'
import { Badge } from '../../../badge'

const meta: Meta<typeof CheckboxCardGroup> = {
  title: 'Cadence/Components/Forms/CheckboxCardGroup',
  component: CheckboxCardGroup,
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
      description: 'Whether the checkbox card group is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox card group is required',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the checkbox card group',
    },
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Number of columns in the grid layout',
    },
    gap: {
      control: 'select',
      options: ['small', 'base', 'large'],
      description: 'Gap between cards',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])

    return (
      <CheckboxCardGroup
        value={value}
        onValueChange={setValue}
        aria-label="Choose your preferred payment methods"
      >
        <CheckboxCardItem
          value="credit-card"
          title="Credit Card"
          icon={<Microphone />}
        >
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
            Pay with Visa, Mastercard, or American Express
          </p>
        </CheckboxCardItem>
        <CheckboxCardItem
          value="bank-transfer"
          title="Bank Transfer"
          icon={<Microphone />}
        >
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
            Direct transfer from your bank account
          </p>
        </CheckboxCardItem>
        <CheckboxCardItem
          value="digital-wallet"
          title="Digital Wallet"
          icon={<Microphone />}
        >
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
            Pay with PayPal, Apple Pay, or Google Pay
          </p>
        </CheckboxCardItem>
      </CheckboxCardGroup>
    )
  },
}

export const WithDefaultValues: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['credit-card', 'digital-wallet'])

    return (
      <CheckboxCardGroup
        value={value}
        onValueChange={setValue}
        aria-label="Choose your preferred payment methods"
      >
        <CheckboxCardItem
          value="credit-card"
          title="Credit Card"
          icon={<Microphone />}
        >
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
            Pay with Visa, Mastercard, or American Express
          </p>
        </CheckboxCardItem>
        <CheckboxCardItem
          value="bank-transfer"
          title="Bank Transfer"
          icon={<Microphone />}
        >
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
            Direct transfer from your bank account
          </p>
        </CheckboxCardItem>
        <CheckboxCardItem
          value="digital-wallet"
          title="Digital Wallet"
          icon={<Microphone />}
        >
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
            Pay with PayPal, Apple Pay, or Google Pay
          </p>
        </CheckboxCardItem>
      </CheckboxCardGroup>
    )
  },
}

export const StandaloneCard: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <CheckboxCardItem
        value="newsletter"
        title="Subscribe to Newsletter"
        icon={<Microphone />}
        checked={checked}
        onCheckedChange={setChecked}
      >
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
          Get the latest updates and exclusive offers delivered to your inbox
        </p>
      </CheckboxCardItem>
    )
  },
}

export const WithBadges: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])

    return (
      <CheckboxCardGroup
        value={value}
        onValueChange={setValue}
        aria-label="Choose your plan features"
        columns={2}
      >
        <CheckboxCardItem
          value="basic-analytics"
          title="Basic Analytics"
          icon={<Microphone />}
          badge={<Badge text="Free" size="small" type="success" />}
        >
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
            View basic metrics and reports
          </p>
        </CheckboxCardItem>
        <CheckboxCardItem
          value="advanced-analytics"
          title="Advanced Analytics"
          icon={<Microphone />}
          badge={<Badge text="Pro" size="small" type="warning" />}
        >
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
            Get detailed insights and custom reports
          </p>
        </CheckboxCardItem>
        <CheckboxCardItem
          value="real-time-data"
          title="Real-time Data"
          icon={<Microphone />}
          badge={<Badge text="Premium" size="small" type="error" />}
        >
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
            Live dashboard with instant updates
          </p>
        </CheckboxCardItem>
        <CheckboxCardItem
          value="api-access"
          title="API Access"
          icon={<Microphone />}
          badge={<Badge text="Enterprise" size="small" type="info" />}
        >
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
            Integrate with third-party applications
          </p>
        </CheckboxCardItem>
      </CheckboxCardGroup>
    )
  },
}

export const GridLayouts: Story = {
  render: () => {
    const [twoColumnValue, setTwoColumnValue] = useState<string[]>([])
    const [threeColumnValue, setThreeColumnValue] = useState<string[]>([])

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h4>2 Columns</h4>
          <CheckboxCardGroup
            value={twoColumnValue}
            onValueChange={setTwoColumnValue}
            aria-label="2 column layout"
            columns={2}
          >
            <CheckboxCardItem value="option1" title="Option 1" />
            <CheckboxCardItem value="option2" title="Option 2" />
            <CheckboxCardItem value="option3" title="Option 3" />
            <CheckboxCardItem value="option4" title="Option 4" />
          </CheckboxCardGroup>
        </div>

        <div>
          <h4>3 Columns</h4>
          <CheckboxCardGroup
            value={threeColumnValue}
            onValueChange={setThreeColumnValue}
            aria-label="3 column layout"
            columns={3}
          >
            <CheckboxCardItem value="option1" title="Option 1" />
            <CheckboxCardItem value="option2" title="Option 2" />
            <CheckboxCardItem value="option3" title="Option 3" />
            <CheckboxCardItem value="option4" title="Option 4" />
            <CheckboxCardItem value="option5" title="Option 5" />
            <CheckboxCardItem value="option6" title="Option 6" />
          </CheckboxCardGroup>
        </div>
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => {
    const [smallValue, setSmallValue] = useState<string[]>([])
    const [mediumValue, setMediumValue] = useState<string[]>([])
    const [largeValue, setLargeValue] = useState<string[]>([])

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h4>Small Size</h4>
          <CheckboxCardGroup
            value={smallValue}
            onValueChange={setSmallValue}
            aria-label="Small cards"
            columns={3}
          >
            <CheckboxCardItem
              value="small1"
              title="Small Card 1"
              size="small"
              icon={<Microphone />}
            />
            <CheckboxCardItem
              value="small2"
              title="Small Card 2"
              size="small"
              icon={<Microphone />}
            />
            <CheckboxCardItem
              value="small3"
              title="Small Card 3"
              size="small"
              icon={<Microphone />}
            />
          </CheckboxCardGroup>
        </div>

        <div>
          <h4>Medium Size (Default)</h4>
          <CheckboxCardGroup
            value={mediumValue}
            onValueChange={setMediumValue}
            aria-label="Medium cards"
            columns={2}
          >
            <CheckboxCardItem
              value="medium1"
              title="Medium Card 1"
              size="medium"
              icon={<Microphone />}
            >
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
                This is a medium-sized card
              </p>
            </CheckboxCardItem>
            <CheckboxCardItem
              value="medium2"
              title="Medium Card 2"
              size="medium"
              icon={<Microphone />}
            >
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
                This is a medium-sized card
              </p>
            </CheckboxCardItem>
          </CheckboxCardGroup>
        </div>

        <div>
          <h4>Large Size</h4>
          <CheckboxCardGroup
            value={largeValue}
            onValueChange={setLargeValue}
            aria-label="Large cards"
            columns={2}
          >
            <CheckboxCardItem
              value="large1"
              title="Large Card 1"
              size="large"
              icon={<Microphone />}
            >
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
                This is a large card with more space for content and descriptions that might be longer
              </p>
            </CheckboxCardItem>
            <CheckboxCardItem
              value="large2"
              title="Large Card 2"
              size="large"
              icon={<Microphone />}
            >
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
                This is a large card with more space for content and descriptions that might be longer
              </p>
            </CheckboxCardItem>
          </CheckboxCardGroup>
        </div>
      </div>
    )
  },
}

export const Variants: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h4>Default Style</h4>
          <CheckboxCardGroup
            value={value}
            onValueChange={setValue}
            aria-label="Default style cards"
            columns={3}
          >
            <CheckboxCardItem
              value="default1"
              title="Default Card"
            >
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
                Standard card appearance
              </p>
            </CheckboxCardItem>
            <CheckboxCardItem
              value="default2"
              title="Default Card"
            >
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
                Standard card appearance
              </p>
            </CheckboxCardItem>
            <CheckboxCardItem
              value="default3"
              title="Default Card"
            >
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
                Standard card appearance
              </p>
            </CheckboxCardItem>
          </CheckboxCardGroup>
        </div>
      </div>
    )
  },
}

export const Alignment: Story = {
  render: () => {
    const [leftValue, setLeftValue] = useState<string[]>([])
    const [centerValue, setCenterValue] = useState<string[]>([])

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h4>Left Aligned (Default)</h4>
          <CheckboxCardGroup
            value={leftValue}
            onValueChange={setLeftValue}
            aria-label="Left aligned cards"
            columns={3}
          >
            <CheckboxCardItem
              value="left1"
              title="Left Aligned"
              alignment="left"
              icon={<Microphone />}
            >
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
                Content is left-aligned
              </p>
            </CheckboxCardItem>
            <CheckboxCardItem
              value="left2"
              title="Left Aligned"
              alignment="left"
              icon={<Microphone />}
            >
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
                Content is left-aligned
              </p>
            </CheckboxCardItem>
            <CheckboxCardItem
              value="left3"
              title="Left Aligned"
              alignment="left"
              icon={<Microphone />}
            >
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
                Content is left-aligned
              </p>
            </CheckboxCardItem>
          </CheckboxCardGroup>
        </div>

        <div>
          <h4>Center Aligned</h4>
          <CheckboxCardGroup
            value={centerValue}
            onValueChange={setCenterValue}
            aria-label="Center aligned cards"
            columns={3}
          >
            <CheckboxCardItem
              value="center1"
              title="Center Aligned"
              alignment="center"
              icon={<Microphone />}
            >
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)', textAlign: 'center' }}>
                Content is center-aligned
              </p>
            </CheckboxCardItem>
            <CheckboxCardItem
              value="center2"
              title="Center Aligned"
              alignment="center"
              icon={<Microphone />}
            >
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)', textAlign: 'center' }}>
                Content is center-aligned
              </p>
            </CheckboxCardItem>
            <CheckboxCardItem
              value="center3"
              title="Center Aligned"
              alignment="center"
              icon={<Microphone />}
            >
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)', textAlign: 'center' }}>
                Content is center-aligned
              </p>
            </CheckboxCardItem>
          </CheckboxCardGroup>
        </div>
      </div>
    )
  },
}

export const CustomContent: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])

    return (
      <CheckboxCardGroup
        value={value}
        onValueChange={setValue}
        aria-label="Custom content cards"
        columns={2}
      >
        <CheckboxCardItem value="custom1">
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎵</div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>Music Plan</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>$9.99/month</p>
          </div>
        </CheckboxCardItem>
        <CheckboxCardItem value="custom2">
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎬</div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>Video Plan</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>$14.99/month</p>
          </div>
        </CheckboxCardItem>
        <CheckboxCardItem value="custom3">
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📚</div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>Premium Plan</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>$19.99/month</p>
          </div>
        </CheckboxCardItem>
        <CheckboxCardItem value="custom4">
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎯</div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>Everything Plan</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>$29.99/month</p>
          </div>
        </CheckboxCardItem>
      </CheckboxCardGroup>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])

    return (
      <CheckboxCardGroup
        value={value}
        onValueChange={setValue}
        disabled
        aria-label="Disabled checkbox cards"
        columns={2}
      >
        <CheckboxCardItem
          value="disabled1"
          title="Disabled Card 1"
          icon={<Microphone />}
        >
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
            This card is disabled
          </p>
        </CheckboxCardItem>
        <CheckboxCardItem
          value="disabled2"
          title="Disabled Card 2"
          icon={<Microphone />}
        >
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
            This card is disabled
          </p>
        </CheckboxCardItem>
      </CheckboxCardGroup>
    )
  },
}

export const IndividualDisabled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])

    return (
      <CheckboxCardGroup
        value={value}
        onValueChange={setValue}
        aria-label="Mixed disabled states"
        columns={2}
      >
        <CheckboxCardItem
          value="enabled"
          title="Enabled Card"
          icon={<Microphone />}
        >
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
            This card is enabled
          </p>
        </CheckboxCardItem>
        <CheckboxCardItem
          value="disabled"
          title="Disabled Card"
          icon={<Microphone />}
          disabled
        >
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
            This card is disabled
          </p>
        </CheckboxCardItem>
      </CheckboxCardGroup>
    )
  },
}

export const WithValidation: Story = {
  render: () => {
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
    const [showError, setShowError] = useState(false)

    const handleSubmit = () => {
      if (selectedFeatures.length === 0) {
        setShowError(true)
      } else {
        setShowError(false)
        alert(`Selected features: ${selectedFeatures.join(', ')}`)
      }
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Field>
          <Label style={{ fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>
            Choose Features *
          </Label>
          <CheckboxCardGroup
            value={selectedFeatures}
            onValueChange={(values) => {
              setSelectedFeatures(values)
              setShowError(false)
            }}
            required
            aria-label="Choose features"
            aria-describedby={showError ? 'features-error' : undefined}
            columns={2}
          >
            <CheckboxCardItem
              value="analytics"
              title="Analytics"
              icon={<Microphone />}
              isInvalid={showError}
            />
            <CheckboxCardItem
              value="collaboration"
              title="Collaboration"
              icon={<Microphone />}
              isInvalid={showError}
            />
            <CheckboxCardItem
              value="security"
              title="Security"
              icon={<Microphone />}
              isInvalid={showError}
            />
            <CheckboxCardItem
              value="automation"
              title="Automation"
              icon={<Microphone />}
              isInvalid={showError}
            />
          </CheckboxCardGroup>
          {showError && (
            <ValidationMessage id="features-error" type="error">
              Please select at least one feature to continue
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

export const FocusStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Standard Focus States</h3>
        <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
          Use Tab key to navigate between checkbox cards and see focus rings
        </p>
        <CheckboxCardGroup aria-label="Standard focus example" columns={3}>
          <CheckboxCardItem
            value="focus1"
            title="Option 1"
            icon={<Microphone />}
          />
          <CheckboxCardItem
            value="focus2"
            title="Option 2"
            icon={<Microphone />}
          />
          <CheckboxCardItem
            value="focus3"
            title="Option 3"
            icon={<Microphone />}
          />
        </CheckboxCardGroup>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Error State Focus</h3>
        <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
          Focus rings show critical color when checkbox cards are in error state
        </p>
        <CheckboxCardGroup aria-label="Error focus example" columns={3}>
          <CheckboxCardItem
            value="error1"
            title="Error Option 1"
            icon={<Microphone />}
            isInvalid
          />
          <CheckboxCardItem
            value="error2"
            title="Error Option 2"
            icon={<Microphone />}
            isInvalid
          />
          <CheckboxCardItem
            value="error3"
            title="Error Option 3"
            icon={<Microphone />}
            isInvalid
          />
        </CheckboxCardGroup>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Mixed States</h3>
        <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
          Checkbox cards can have different checked/unchecked/indeterminate states
        </p>
        <CheckboxCardGroup
          aria-label="Mixed states example"
          defaultValue={['mixed2']}
          columns={3}
        >
          <CheckboxCardItem
            value="mixed1"
            title="Unchecked"
            icon={<Microphone />}
          />
          <CheckboxCardItem
            value="mixed2"
            title="Checked"
            icon={<Microphone />}
          />
          <CheckboxCardItem
            value="mixed3"
            title="Available"
            icon={<Microphone />}
          />
        </CheckboxCardGroup>
      </div>
    </div>
  ),
}

export const CompleteExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      services: [] as string[],
      addons: [] as string[],
      preferences: [] as string[],
    })

    const [errors, setErrors] = useState({
      services: false,
    })

    const handleFieldChange = (field: string, values: string[]) => {
      setFormData(prev => ({ ...prev, [field]: values }))
      setErrors(prev => ({ ...prev, [field]: false }))
    }

    const handleSubmit = () => {
      const newErrors = {
        services: formData.services.length === 0,
      }
      setErrors(newErrors)

      if (!newErrors.services) {
        alert('Configuration saved successfully!')
      }
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: '600px' }}>
        <h3 style={{ margin: 0 }}>Service Configuration</h3>

        <Field>
          <Label style={{ fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>
            Core Services *
          </Label>
          <CheckboxCardGroup
            value={formData.services}
            onValueChange={(values) => handleFieldChange('services', values)}
            required
            aria-describedby={errors.services ? 'services-error' : 'services-helper'}
            columns={2}
            gap="large"
          >
            <CheckboxCardItem
              value="hosting"
              title="Web Hosting"
              icon={<Microphone />}
              badge={<Badge text="Essential" size="small" type="success" />}
              isInvalid={errors.services}
            />
            <CheckboxCardItem
              value="database"
              title="Database"
              icon={<Microphone />}
              badge={<Badge text="Essential" size="small" type="success" />}
              isInvalid={errors.services}
            />
            <CheckboxCardItem
              value="cdn"
              title="Content Delivery Network"
              icon={<Microphone />}
              badge={<Badge text="Recommended" size="small" type="warning" />}
              isInvalid={errors.services}
            />
            <CheckboxCardItem
              value="monitoring"
              title="Application Monitoring"

              icon={<Microphone />}
              badge={<Badge text="Optional" size="small" type="info" />}
              isInvalid={errors.services}
            />
          </CheckboxCardGroup>
          {errors.services ? (
            <ValidationMessage id="services-error" type="error">
              Please select at least one core service
            </ValidationMessage>
          ) : (
            <HelperText>
              Choose the core services you need for your application
            </HelperText>
          )}
        </Field>

        <Field>
          <Label style={{ fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>
            Add-on Services
          </Label>
          <CheckboxCardGroup
            value={formData.addons}
            onValueChange={(values) => handleFieldChange('addons', values)}
            aria-describedby="addons-helper"
            columns={3}
          >
            <CheckboxCardItem
              value="ssl"
              title="SSL Certificate"
              size="small"
            />
            <CheckboxCardItem
              value="backup"
              title="Daily Backups"

              size="small"
            />
            <CheckboxCardItem
              value="staging"
              title="Staging Environment"

              size="small"
            />
            <CheckboxCardItem
              value="analytics"
              title="Analytics"

              size="small"
            />
            <CheckboxCardItem
              value="support"
              title="Priority Support"

              size="small"
            />
            <CheckboxCardItem
              value="migration"
              title="Migration Service"

              size="small"
            />
          </CheckboxCardGroup>
          <HelperText>
            Optional services to enhance your hosting experience
          </HelperText>
        </Field>

        <Field>
          <Label style={{ fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>
            Communication Preferences
          </Label>
          <CheckboxCardGroup
            value={formData.preferences}
            onValueChange={(values) => handleFieldChange('preferences', values)}
            aria-describedby="preferences-helper"
            columns={2}
          >
            <CheckboxCardItem
              value="email-updates"
              title="Email Updates"

            />
            <CheckboxCardItem
              value="sms-alerts"
              title="SMS Alerts"

            />
            <CheckboxCardItem
              value="newsletter"
              title="Newsletter"

            />
            <CheckboxCardItem
              value="promotional"
              title="Promotional Offers"

            />
          </CheckboxCardGroup>
          <HelperText>
            Choose how you'd like to receive communications from us
          </HelperText>
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
          Save Configuration
        </button>
      </div>
    )
  },
}