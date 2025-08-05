import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Microphone } from 'cadence-icons'
import { Text } from '../../../text'
import { RadioCardGroup, RadioCardItem } from '../index'
import { Field } from '../../field'
import { Label } from '../../primitives/label'
import { HelperText } from '../../primitives/helper-text'
import { ValidationMessage } from '../../primitives/validation-message'
import { Badge } from '../../../badge'

const meta: Meta<typeof RadioCardGroup> = {
  title: 'Cadence/Components/Forms/RadioCardGroup',
  component: RadioCardGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The current selected value',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio card group is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the radio card group is required',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the radio card group',
    },
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Number of columns in grid layout',
    },
    gap: {
      control: 'select',
      options: ['small', 'base', 'large'],
      description: 'Gap between radio cards',
    },
    loop: {
      control: 'boolean',
      description: 'Whether keyboard navigation should loop',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <RadioCardGroup
        value={value}
        onValueChange={setValue}
        aria-label="Choose your payment method"
        columns={3}
      >
        <RadioCardItem
          value="credit-card"
          title="Credit Card"
          icon={<Microphone />}
        />
        <RadioCardItem
          value="paypal"
          title="PayPal"
          icon={<Microphone />}
        />
        <RadioCardItem
          value="bank-transfer"
          title="Bank Transfer"
          icon={<Microphone />}
        />
      </RadioCardGroup>
    )
  },
}

export const WithDefaultValue: Story = {
  render: () => (
    <RadioCardGroup
      defaultValue="paypal"
      aria-label="Choose your payment method"
      columns={3}
    >
      <RadioCardItem
        value="credit-card"
        title="Credit Card"
        icon={<Microphone />}
      />
      <RadioCardItem
        value="paypal"
        title="PayPal"
        icon={<Microphone />}
      />
      <RadioCardItem
        value="bank-transfer"
        title="Bank Transfer"
        icon={<Microphone />}
      />
    </RadioCardGroup>
  ),
}

export const WithBadges: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <RadioCardGroup
        value={value}
        onValueChange={setValue}
        aria-label="Choose your plan"
        columns={3}
      >
        <RadioCardItem
          value="basic"
          title="Basic Plan"
          icon={<Microphone />}
          badge={<Badge text="$9/mo" size="small" type="neutral" />}
        />
        <RadioCardItem
          value="pro"
          title="Pro Plan"
          icon={<Microphone />}
          badge={<Badge text="$29/mo" size="small" type="warning" />}
        />
        <RadioCardItem
          value="enterprise"
          title="Enterprise Plan"
          icon={<Microphone />}
          badge={<Badge text="$99/mo" size="small" type="info" />}
        />
      </RadioCardGroup>
    )
  },
}

export const Alignment: Story = {
  render: () => {
    const [leftValue, setLeftValue] = useState('')
    const [centerValue, setCenterValue] = useState('')

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h3>Left Aligned (Default)</h3>
          <RadioCardGroup
            value={leftValue}
            onValueChange={setLeftValue}
            aria-label="Left aligned cards"
            columns={3}
          >
            <RadioCardItem
              value="left-1"
              title="Left Aligned"
              alignment="left"
              icon={<Microphone />}
            >
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
                Content is left-aligned
              </p>
            </RadioCardItem>
            <RadioCardItem
              value="left-2"
              title="Left Aligned"
              alignment="left"
              icon={<Microphone />}
            >
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
                Content is left-aligned
              </p>
            </RadioCardItem>
            <RadioCardItem
              value="left-3"
              title="Left Aligned"
              alignment="left"
              icon={<Microphone />}
            >
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
                Content is left-aligned
              </p>
            </RadioCardItem>
          </RadioCardGroup>
        </div>

        <div>
          <h3>Center Aligned</h3>
          <RadioCardGroup
            value={centerValue}
            onValueChange={setCenterValue}
            aria-label="Center aligned cards"
            columns={3}
          >
            <RadioCardItem
              value="center-1"
              title="Center Aligned"
              alignment="center"
              icon={<Microphone />}
            >
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)', textAlign: 'center' }}>
                Content is center-aligned
              </p>
            </RadioCardItem>
            <RadioCardItem
              value="center-2"
              title="Center Aligned"
              alignment="center"
              icon={<Microphone />}
            >
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)', textAlign: 'center' }}>
                Content is center-aligned
              </p>
            </RadioCardItem>
            <RadioCardItem
              value="center-3"
              title="Center Aligned"
              alignment="center"
              icon={<Microphone />}
            >
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)', textAlign: 'center' }}>
                Content is center-aligned
              </p>
            </RadioCardItem>
          </RadioCardGroup>
        </div>
      </div>
    )
  },
}

export const CustomContent: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <RadioCardGroup
        value={value}
        onValueChange={setValue}
        aria-label="Choose your shipping method"
        columns={2}
      >
        <RadioCardItem value="standard">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Standard Shipping</h3>
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
                5-7 business days
              </p>
              <p style={{ margin: '8px 0 0', fontSize: '12px', color: 'var(--cds-color-foreground-tertiary)' }}>
                Free on orders over $50
              </p>
            </div>
            <span style={{ fontSize: '16px', fontWeight: '600' }}>$5.99</span>
          </div>
        </RadioCardItem>
        <RadioCardItem value="express">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Express Shipping</h3>
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--cds-color-foreground-secondary)' }}>
                2-3 business days
              </p>
              <p style={{ margin: '8px 0 0', fontSize: '12px', color: 'var(--cds-color-foreground-tertiary)' }}>
                Guaranteed delivery
              </p>
            </div>
            <span style={{ fontSize: '16px', fontWeight: '600' }}>$15.99</span>
          </div>
        </RadioCardItem>
      </RadioCardGroup>
    )
  },
}

export const Sizes: Story = {
  render: () => {
    const [smallValue, setSmallValue] = useState('')
    const [mediumValue, setMediumValue] = useState('')
    const [largeValue, setLargeValue] = useState('')

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h3>Small Size</h3>
          <RadioCardGroup
            value={smallValue}
            onValueChange={setSmallValue}
            aria-label="Small cards"
            columns={3}
          >
            <RadioCardItem
              value="small-1"
              title="Option 1"
              size="small"
              icon={<Microphone />}
            />
            <RadioCardItem
              value="small-2"
              title="Option 2"
              size="small"
              icon={<Microphone />}
            />
            <RadioCardItem
              value="small-3"
              title="Option 3"
              size="small"
              icon={<Microphone />}
            />
          </RadioCardGroup>
        </div>

        <div>
          <h3>Medium Size (Default)</h3>
          <RadioCardGroup
            value={mediumValue}
            onValueChange={setMediumValue}
            aria-label="Medium cards"
            columns={3}
          >
            <RadioCardItem
              value="medium-1"
              title="Option 1"
              icon={<Microphone />}
            />
            <RadioCardItem
              value="medium-2"
              title="Option 2"
              icon={<Microphone />}
            />
            <RadioCardItem
              value="medium-3"
              title="Option 3"
              icon={<Microphone />}
            />
          </RadioCardGroup>
        </div>

        <div>
          <h3>Large Size</h3>
          <RadioCardGroup
            value={largeValue}
            onValueChange={setLargeValue}
            aria-label="Large cards"
            columns={2}
          >
            <RadioCardItem
              value="large-1"
              title="Option 1"
              size="large"
              icon={<Microphone />}
            />
            <RadioCardItem
              value="large-2"
              title="Option 2"
              size="large"
              icon={<Microphone />}
            />
          </RadioCardGroup>
        </div>
      </div>
    )
  },
}

export const GridLayouts: Story = {
  render: () => {
    const [singleValue, setSingleValue] = useState('')
    const [twoValue, setTwoValue] = useState('')
    const [fourValue, setFourValue] = useState('')

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h3>Single Column</h3>
          <RadioCardGroup
            value={singleValue}
            onValueChange={setSingleValue}
            aria-label="Single column layout"
            columns={1}
          >
            <RadioCardItem
              value="single-1"
              title="Full Width Option 1"
              icon={<Microphone />}
            />
            <RadioCardItem
              value="single-2"
              title="Full Width Option 2"
              icon={<Microphone />}
            />
          </RadioCardGroup>
        </div>

        <div>
          <h3>Two Columns</h3>
          <RadioCardGroup
            value={twoValue}
            onValueChange={setTwoValue}
            aria-label="Two column layout"
            columns={2}
          >
            <RadioCardItem
              value="two-1"
              title="Option 1"
              icon={<Microphone />}
            />
            <RadioCardItem
              value="two-2"
              title="Option 2"
              icon={<Microphone />}
            />
            <RadioCardItem
              value="two-3"
              title="Option 3"
              icon={<Microphone />}
            />
            <RadioCardItem
              value="two-4"
              title="Option 4"
              icon={<Microphone />}
            />
          </RadioCardGroup>
        </div>

        <div>
          <h3>Four Columns</h3>
          <RadioCardGroup
            value={fourValue}
            onValueChange={setFourValue}
            aria-label="Four column layout"
            columns={4}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <RadioCardItem
                key={num}
                value={`four-${num}`}
                title={`Option ${num}`}
                icon={<Microphone />}
              />
            ))}
          </RadioCardGroup>
        </div>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <RadioCardGroup
        value={value}
        onValueChange={setValue}
        disabled
        aria-label="Disabled payment methods"
        columns={3}
      >
        <RadioCardItem
          value="credit-card"
          title="Credit Card"
          icon={<Microphone />}
        />
        <RadioCardItem
          value="paypal"
          title="PayPal"
          icon={<Microphone />}
        />
        <RadioCardItem
          value="bank-transfer"
          title="Bank Transfer"
          icon={<Microphone />}
        />
      </RadioCardGroup>
    )
  },
}

export const DisabledWithValue: Story = {
  render: () => (
    <RadioCardGroup
      disabled
      defaultValue="paypal"
      aria-label="Disabled payment methods"
      columns={3}
    >
      <RadioCardItem
        value="credit-card"
        title="Credit Card"
        icon={<Microphone />}
      />
      <RadioCardItem
        value="paypal"
        title="PayPal"
        icon={<Microphone />}
      />
      <RadioCardItem
        value="bank-transfer"
        title="Bank Transfer"
        icon={<Microphone />}
      />
    </RadioCardGroup>
  ),
}

export const IndividualItemDisabled: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <RadioCardGroup
        value={value}
        onValueChange={setValue}
        aria-label="Payment methods with individual disabled"
        columns={3}
      >
        <RadioCardItem
          value="credit-card"
          title="Credit Card"
          icon={<Microphone />}
        />
        <RadioCardItem
          value="paypal"
          title="PayPal (Unavailable)"
          icon={<Microphone />}
          disabled
        />
        <RadioCardItem
          value="bank-transfer"
          title="Bank Transfer"
          icon={<Microphone />}
        />
      </RadioCardGroup>
    )
  },
}

export const Invalid: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <RadioCardGroup
        value={value}
        onValueChange={setValue}
        aria-label="Payment methods with validation error"
        columns={3}
      >
        <RadioCardItem
          value="credit-card"
          title="Credit Card"
          icon={<Microphone />}
          isInvalid
        />
        <RadioCardItem
          value="paypal"
          title="PayPal"
          icon={<Microphone />}
          isInvalid
        />
        <RadioCardItem
          value="bank-transfer"
          title="Bank Transfer"
          icon={<Microphone />}
          isInvalid
        />
      </RadioCardGroup>
    )
  },
}

export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <Field>
        <Label style={{ fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>
          Choose Your Plan
        </Label>
        <RadioCardGroup
          value={value}
          onValueChange={setValue}
          aria-label="Choose your plan"
          aria-describedby="plan-helper"
          columns={3}
        >
          <RadioCardItem
            value="basic"
            title="Basic Plan"
            icon={<Microphone />}
            badge={<Badge text="$9/mo" size="small" type="neutral" />}
          />
          <RadioCardItem
            value="pro"
            title="Pro Plan"
            icon={<Microphone />}
            badge={<Badge text="$29/mo" size="small" type="warning" />}
          />
          <RadioCardItem
            value="enterprise"
            title="Enterprise Plan"
            icon={<Microphone />}
            badge={<Badge text="$99/mo" size="small" type="info" />}
          />
        </RadioCardGroup>
        <HelperText>
          All plans include a 14-day free trial. You can upgrade or downgrade anytime.
        </HelperText>
      </Field>
    )
  },
}

export const WithValidation: Story = {
  render: () => {
    const [selectedPlan, setSelectedPlan] = useState('')
    const [showError, setShowError] = useState(false)

    const handleSubmit = () => {
      if (!selectedPlan) {
        setShowError(true)
      } else {
        setShowError(false)
        alert(`Selected plan: ${selectedPlan}`)
      }
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Field>
          <Label style={{ fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>
            Choose Your Plan *
          </Label>
          <RadioCardGroup
            value={selectedPlan}
            onValueChange={(value) => {
              setSelectedPlan(value)
              setShowError(false)
            }}
            required
            aria-label="Choose your plan"
            aria-describedby={showError ? 'plan-error' : undefined}
            columns={3}
          >
            <RadioCardItem
              value="basic"
              title="Basic Plan"
              icon={<Microphone />}
              badge={<Badge text="$9/mo" size="small" type="neutral" />}
              isInvalid={showError}
            />
            <RadioCardItem
              value="pro"
              title="Pro Plan"
              icon={<Microphone />}
              badge={<Badge text="$29/mo" size="small" type="warning" />}
              isInvalid={showError}
            />
            <RadioCardItem
              value="enterprise"
              title="Enterprise Plan"
              icon={<Microphone />}
              badge={<Badge text="$99/mo" size="small" type="info" />}
              isInvalid={showError}
            />
          </RadioCardGroup>
          {showError && (
            <ValidationMessage id="plan-error" type="error">
              Please select a plan to continue
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
      plan: '',
      paymentMethod: '',
      billing: 'monthly',
    })

    const [errors, setErrors] = useState({
      plan: false,
      paymentMethod: false,
    })

    const handleFieldChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }))
      setErrors(prev => ({ ...prev, [field]: false }))
    }

    const handleSubmit = () => {
      const newErrors = {
        plan: !formData.plan,
        paymentMethod: !formData.paymentMethod,
      }
      setErrors(newErrors)

      if (!newErrors.plan && !newErrors.paymentMethod) {
        alert('Order completed successfully!')
      }
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: '600px' }}>
        <h3 style={{ margin: 0 }}>Complete Your Subscription</h3>

        <Field>
          <Label style={{ fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>
            Choose Your Plan *
          </Label>
          <RadioCardGroup
            value={formData.plan}
            onValueChange={(value) => handleFieldChange('plan', value)}
            required
            aria-describedby={errors.plan ? 'plan-error' : 'plan-helper'}
            columns={3}
          >
            <RadioCardItem
              value="basic"
              title="Basic"
              icon={<Microphone />}
              badge={<Badge text="$9/mo" size="small" type="neutral" />}
              isInvalid={errors.plan}
            />
            <RadioCardItem
              value="pro"
              title="Pro"
              icon={<Microphone />}
              badge={<Badge text="$29/mo" size="small" type="warning" />}
              isInvalid={errors.plan}
            />
            <RadioCardItem
              value="enterprise"
              title="Enterprise"
              icon={<Microphone />}
              badge={<Badge text="$99/mo" size="small" type="info" />}
              isInvalid={errors.plan}
            />
          </RadioCardGroup>
          {errors.plan ? (
            <ValidationMessage id="plan-error" type="error">
              Please select a plan
            </ValidationMessage>
          ) : (
            <HelperText>
              All plans include a 14-day free trial
            </HelperText>
          )}
        </Field>

        <Field>
          <Label style={{ fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>
            Payment Method *
          </Label>
          <RadioCardGroup
            value={formData.paymentMethod}
            onValueChange={(value) => handleFieldChange('paymentMethod', value)}
            required
            aria-describedby={errors.paymentMethod ? 'payment-error' : undefined}
            columns={3}
          >
            <RadioCardItem
              value="credit-card"
              title="Credit Card"
              icon={<Microphone />}
              isInvalid={errors.paymentMethod}
            />
            <RadioCardItem
              value="paypal"
              title="PayPal"
              icon={<Microphone />}
              isInvalid={errors.paymentMethod}
            />
            <RadioCardItem
              value="bank-transfer"
              title="Bank Transfer"
              icon={<Microphone />}
              isInvalid={errors.paymentMethod}
            />
          </RadioCardGroup>
          {errors.paymentMethod && (
            <ValidationMessage id="payment-error" type="error">
              Please select a payment method
            </ValidationMessage>
          )}
        </Field>

        <Field>
          <Label style={{ fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>
            Billing Cycle
          </Label>
          <RadioCardGroup
            value={formData.billing}
            onValueChange={(value) => handleFieldChange('billing', value)}
            columns={2}
            gap="small"
          >
            <RadioCardItem
              value="monthly"
              title="Monthly"
              size="small"
            />
            <RadioCardItem
              value="annual"
              title="Annual"
              size="small"
              badge={<Badge text="Save 20%" size="small" type="success" />}
            />
          </RadioCardGroup>
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
          Complete Subscription
        </button>
      </div>
    )
  },
}