import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RadioCardGroup, RadioCardItem } from '../radio-card'
import { Field } from '../../field'
import { Label } from '../../primitives/label'
import { HelperText } from '../../primitives/helper-text'
import { ValidationMessage } from '../../primitives/validation-message'
import { Badge } from '../../../badge'

// Mock icons for demonstration
const CreditCardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2zM1 6h14v6H1V6z" />
    <path d="M2 8h2v1H2V8zm3 0h2v1H5V8z" />
  </svg>
)

const PayPalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M14.06 3.713c.12-1.071-.093-1.832-.702-2.526C12.628.356 11.312 0 9.626 0H4.734a.696.696 0 0 0-.691.59L2.005 13.509a.42.42 0 0 0 .415.486h2.756l-.202 1.28a.628.628 0 0 0 .62.726H8.14c.429 0 .793-.31.862-.731l.025-.13.48-3.043.03-.164.001-.018a.896.896 0 0 1 .896-.81h.564c2.606 0 4.648-.814 5.24-3.167.423-1.68.185-3.062-.79-3.777-.297-.218-.65-.416-1.018-.55z" />
  </svg>
)

const BankIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1.5 1 5v1h14V5L8 1.5zM2 7v6h2V7H2zm3 0v6h2V7H5zm3 0v6h2V7H8zm3 0v6h2V7h-2zM1 14h14v1H1v-1z" />
  </svg>
)

const PlanIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM7 4.5V6H5.5a.5.5 0 0 0 0 1H7v1.5H5.5a.5.5 0 0 0 0 1H7V11a.5.5 0 0 0 1 0V9.5h1.5a.5.5 0 0 0 0-1H8V7h1.5a.5.5 0 0 0 0-1H8V4.5a.5.5 0 0 0-1 0z" />
  </svg>
)

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
  render: () => (
    <RadioCardGroup aria-label="Choose your payment method" columns={3}>
      <RadioCardItem
        value="credit-card"
        title="Credit Card"
        description="Pay with your credit or debit card"
        icon={<CreditCardIcon />}
      />
      <RadioCardItem
        value="paypal"
        title="PayPal"
        description="Pay securely with your PayPal account"
        icon={<PayPalIcon />}
      />
      <RadioCardItem
        value="bank-transfer"
        title="Bank Transfer"
        description="Direct transfer from your bank account"
        icon={<BankIcon />}
      />
    </RadioCardGroup>
  ),
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
        description="Pay with your credit or debit card"
        icon={<CreditCardIcon />}
      />
      <RadioCardItem
        value="paypal"
        title="PayPal"
        description="Pay securely with your PayPal account"
        icon={<PayPalIcon />}
      />
      <RadioCardItem
        value="bank-transfer"
        title="Bank Transfer"
        description="Direct transfer from your bank account"
        icon={<BankIcon />}
      />
    </RadioCardGroup>
  ),
}

export const WithBadges: Story = {
  render: () => (
    <RadioCardGroup aria-label="Choose your plan" columns={3}>
      <RadioCardItem
        value="basic"
        title="Basic Plan"
        description="Perfect for individuals getting started"
        icon={<PlanIcon />}
        badge={<Badge style="outlined" type="neutral" text="$9/mo" />}
      />
      <RadioCardItem
        value="pro"
        title="Pro Plan"
        description="Great for growing teams and businesses"
        icon={<PlanIcon />}
        badge={<Badge style="outlined" type="highlight" text="$29/mo" />}
      />
      <RadioCardItem
        value="enterprise"
        title="Enterprise Plan"
        description="Advanced features for large organizations"
        icon={<PlanIcon />}
        badge={<Badge style="outlined" type="info" text="$99/mo" />}
      />
    </RadioCardGroup>
  ),
}

export const CustomContent: Story = {
  render: () => (
    <RadioCardGroup aria-label="Choose your shipping method" columns={2}>
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
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3>Small Size</h3>
        <RadioCardGroup aria-label="Small cards" columns={3}>
          <RadioCardItem
            value="small-1"
            title="Option 1"
            size="small"
            icon={<CreditCardIcon />}
          />
          <RadioCardItem
            value="small-2"
            title="Option 2"
            size="small"
            icon={<PayPalIcon />}
          />
          <RadioCardItem
            value="small-3"
            title="Option 3"
            size="small"
            icon={<BankIcon />}
          />
        </RadioCardGroup>
      </div>

      <div>
        <h3>Medium Size (Default)</h3>
        <RadioCardGroup aria-label="Medium cards" columns={3}>
          <RadioCardItem
            value="medium-1"
            title="Option 1"
            description="Medium sized option"
            icon={<CreditCardIcon />}
          />
          <RadioCardItem
            value="medium-2"
            title="Option 2"
            description="Medium sized option"
            icon={<PayPalIcon />}
          />
          <RadioCardItem
            value="medium-3"
            title="Option 3"
            description="Medium sized option"
            icon={<BankIcon />}
          />
        </RadioCardGroup>
      </div>

      <div>
        <h3>Large Size</h3>
        <RadioCardGroup aria-label="Large cards" columns={2}>
          <RadioCardItem
            value="large-1"
            title="Option 1"
            description="Large sized option with more content and details"
            size="large"
            icon={<CreditCardIcon />}
          />
          <RadioCardItem
            value="large-2"
            title="Option 2"
            description="Large sized option with more content and details"
            size="large"
            icon={<PayPalIcon />}
          />
        </RadioCardGroup>
      </div>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3>Default Variant</h3>
        <RadioCardGroup aria-label="Default variant cards" columns={3}>
          <RadioCardItem
            value="default-1"
            title="Default Card"
            description="Standard card appearance"
            icon={<CreditCardIcon />}
          />
          <RadioCardItem
            value="default-2"
            title="Default Card"
            description="Standard card appearance"
            icon={<PayPalIcon />}
          />
          <RadioCardItem
            value="default-3"
            title="Default Card"
            description="Standard card appearance"
            icon={<BankIcon />}
          />
        </RadioCardGroup>
      </div>

      <div>
        <h3>Outlined Variant</h3>
        <RadioCardGroup aria-label="Outlined variant cards" columns={3}>
          <RadioCardItem
            value="outlined-1"
            title="Outlined Card"
            description="Outlined card appearance"
            variant="outlined"
            icon={<CreditCardIcon />}
          />
          <RadioCardItem
            value="outlined-2"
            title="Outlined Card"
            description="Outlined card appearance"
            variant="outlined"
            icon={<PayPalIcon />}
          />
          <RadioCardItem
            value="outlined-3"
            title="Outlined Card"
            description="Outlined card appearance"
            variant="outlined"
            icon={<BankIcon />}
          />
        </RadioCardGroup>
      </div>

      <div>
        <h3>Filled Variant</h3>
        <RadioCardGroup aria-label="Filled variant cards" columns={3}>
          <RadioCardItem
            value="filled-1"
            title="Filled Card"
            description="Filled card appearance"
            variant="filled"
            icon={<CreditCardIcon />}
          />
          <RadioCardItem
            value="filled-2"
            title="Filled Card"
            description="Filled card appearance"
            variant="filled"
            icon={<PayPalIcon />}
          />
          <RadioCardItem
            value="filled-3"
            title="Filled Card"
            description="Filled card appearance"
            variant="filled"
            icon={<BankIcon />}
          />
        </RadioCardGroup>
      </div>
    </div>
  ),
}

export const GridLayouts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3>Single Column</h3>
        <RadioCardGroup aria-label="Single column layout" columns={1}>
          <RadioCardItem
            value="single-1"
            title="Full Width Option 1"
            description="This card spans the full width"
            icon={<CreditCardIcon />}
          />
          <RadioCardItem
            value="single-2"
            title="Full Width Option 2"
            description="This card also spans the full width"
            icon={<PayPalIcon />}
          />
        </RadioCardGroup>
      </div>

      <div>
        <h3>Two Columns</h3>
        <RadioCardGroup aria-label="Two column layout" columns={2}>
          <RadioCardItem
            value="two-1"
            title="Option 1"
            description="Half width option"
            icon={<CreditCardIcon />}
          />
          <RadioCardItem
            value="two-2"
            title="Option 2"
            description="Half width option"
            icon={<PayPalIcon />}
          />
          <RadioCardItem
            value="two-3"
            title="Option 3"
            description="Half width option"
            icon={<BankIcon />}
          />
          <RadioCardItem
            value="two-4"
            title="Option 4"
            description="Half width option"
            icon={<PlanIcon />}
          />
        </RadioCardGroup>
      </div>

      <div>
        <h3>Four Columns</h3>
        <RadioCardGroup aria-label="Four column layout" columns={4}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
            <RadioCardItem
              key={num}
              value={`four-${num}`}
              title={`Option ${num}`}
              icon={<PlanIcon />}
            />
          ))}
        </RadioCardGroup>
      </div>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioCardGroup disabled aria-label="Disabled payment methods" columns={3}>
      <RadioCardItem
        value="credit-card"
        title="Credit Card"
        description="Pay with your credit or debit card"
        icon={<CreditCardIcon />}
      />
      <RadioCardItem
        value="paypal"
        title="PayPal"
        description="Pay securely with your PayPal account"
        icon={<PayPalIcon />}
      />
      <RadioCardItem
        value="bank-transfer"
        title="Bank Transfer"
        description="Direct transfer from your bank account"
        icon={<BankIcon />}
      />
    </RadioCardGroup>
  ),
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
        description="Pay with your credit or debit card"
        icon={<CreditCardIcon />}
      />
      <RadioCardItem
        value="paypal"
        title="PayPal"
        description="Pay securely with your PayPal account"
        icon={<PayPalIcon />}
      />
      <RadioCardItem
        value="bank-transfer"
        title="Bank Transfer"
        description="Direct transfer from your bank account"
        icon={<BankIcon />}
      />
    </RadioCardGroup>
  ),
}

export const IndividualItemDisabled: Story = {
  render: () => (
    <RadioCardGroup aria-label="Payment methods with individual disabled" columns={3}>
      <RadioCardItem
        value="credit-card"
        title="Credit Card"
        description="Pay with your credit or debit card"
        icon={<CreditCardIcon />}
      />
      <RadioCardItem
        value="paypal"
        title="PayPal (Unavailable)"
        description="PayPal is temporarily unavailable"
        icon={<PayPalIcon />}
        disabled
      />
      <RadioCardItem
        value="bank-transfer"
        title="Bank Transfer"
        description="Direct transfer from your bank account"
        icon={<BankIcon />}
      />
    </RadioCardGroup>
  ),
}

export const Invalid: Story = {
  render: () => (
    <RadioCardGroup aria-label="Payment methods with validation error" columns={3}>
      <RadioCardItem
        value="credit-card"
        title="Credit Card"
        description="Pay with your credit or debit card"
        icon={<CreditCardIcon />}
        isInvalid
      />
      <RadioCardItem
        value="paypal"
        title="PayPal"
        description="Pay securely with your PayPal account"
        icon={<PayPalIcon />}
        isInvalid
      />
      <RadioCardItem
        value="bank-transfer"
        title="Bank Transfer"
        description="Direct transfer from your bank account"
        icon={<BankIcon />}
        isInvalid
      />
    </RadioCardGroup>
  ),
}

export const WithHelperText: Story = {
  render: () => (
    <Field>
      <Label style={{ fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>
        Choose Your Plan
      </Label>
      <RadioCardGroup
        aria-label="Choose your plan"
        aria-describedby="plan-helper"
        columns={3}
      >
        <RadioCardItem
          value="basic"
          title="Basic Plan"
          description="Perfect for individuals"
          icon={<PlanIcon />}
          badge={<Badge style="outlined" type="neutral" text="$9/mo" />}
        />
        <RadioCardItem
          value="pro"
          title="Pro Plan"
          description="Great for small teams"
          icon={<PlanIcon />}
          badge={<Badge style="filled" type="highlight" text="$29/mo" />}
        />
        <RadioCardItem
          value="enterprise"
          title="Enterprise Plan"
          description="For large organizations"
          icon={<PlanIcon />}
          badge={<Badge style="filled" type="info" text="$99/mo" />}
        />
      </RadioCardGroup>
      <HelperText>
        All plans include a 14-day free trial. You can upgrade or downgrade anytime.
      </HelperText>
    </Field>
  ),
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
              description="Perfect for individuals"
              icon={<PlanIcon />}
              badge={<Badge style="outlined" type="neutral" text="$9/mo" />}
              isInvalid={showError}
            />
            <RadioCardItem
              value="pro"
              title="Pro Plan"
              description="Great for small teams"
              icon={<PlanIcon />}
              badge={<Badge style="filled" type="highlight" text="$29/mo" />}
              isInvalid={showError}
            />
            <RadioCardItem
              value="enterprise"
              title="Enterprise Plan"
              description="For large organizations"
              icon={<PlanIcon />}
              badge={<Badge style="filled" type="info" text="$99/mo" />}
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
              description="For individuals"
              icon={<PlanIcon />}
              badge={<Badge style="outlined" type="neutral" text="$9/mo" />}
              isInvalid={errors.plan}
            />
            <RadioCardItem
              value="pro"
              title="Pro"
              description="For small teams"
              icon={<PlanIcon />}
              badge={<Badge style="filled" type="highlight" text="$29/mo" />}
              isInvalid={errors.plan}
            />
            <RadioCardItem
              value="enterprise"
              title="Enterprise"
              description="For large orgs"
              icon={<PlanIcon />}
              badge={<Badge style="filled" type="info" text="$99/mo" />}
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
              description="Visa, Mastercard, Amex"
              icon={<CreditCardIcon />}
              isInvalid={errors.paymentMethod}
            />
            <RadioCardItem
              value="paypal"
              title="PayPal"
              description="Pay with PayPal"
              icon={<PayPalIcon />}
              isInvalid={errors.paymentMethod}
            />
            <RadioCardItem
              value="bank-transfer"
              title="Bank Transfer"
              description="Direct bank transfer"
              icon={<BankIcon />}
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
              description="Billed monthly"
              size="small"
            />
            <RadioCardItem
              value="annual"
              title="Annual"
              description="Billed yearly (save 20%)"
              size="small"
              badge={<Badge style="filled" type="success" size="small" text="Save 20%" />}
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