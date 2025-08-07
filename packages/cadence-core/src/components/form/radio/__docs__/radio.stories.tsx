import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, Radio } from '../radio'
import { Field } from '../../field'
import { Label } from '../../primitives/label'
import { HelperText } from '../../primitives/helper-text'
import { ValidationMessage } from '../../primitives/validation-message'

const meta: Meta<typeof RadioGroup> = {
  title: 'Cadence/Components/Forms/RadioGroup',
  component: RadioGroup,
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
      description: 'Whether the radio group is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the radio group is required',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the radio group',
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
    <RadioGroup aria-label="Choose your favorite color">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Radio value="red" id="color-red" />
        <Label htmlFor="color-red">Red</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Radio value="blue" id="color-blue" />
        <Label htmlFor="color-blue">Blue</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Radio value="green" id="color-green" />
        <Label htmlFor="color-green">Green</Label>
      </div>
    </RadioGroup>
  ),
}

export const WithDefaultValue: Story = {
  render: () => (
    <RadioGroup defaultValue="blue" aria-label="Choose your favorite color">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Radio value="red" id="default-red" />
        <Label htmlFor="default-red">Red</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Radio value="blue" id="default-blue" />
        <Label htmlFor="default-blue">Blue (Default)</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Radio value="green" id="default-green" />
        <Label htmlFor="default-green">Green</Label>
      </div>
    </RadioGroup>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <RadioGroup orientation="horizontal" aria-label="Choose your favorite color">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Radio value="red" id="horizontal-red" />
        <Label htmlFor="horizontal-red">Red</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Radio value="blue" id="horizontal-blue" />
        <Label htmlFor="horizontal-blue">Blue</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Radio value="green" id="horizontal-green" />
        <Label htmlFor="horizontal-green">Green</Label>
      </div>
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup disabled aria-label="Choose your favorite color">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Radio value="red" id="disabled-red" />
        <Label htmlFor="disabled-red">Red</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Radio value="blue" id="disabled-blue" />
        <Label htmlFor="disabled-blue">Blue</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Radio value="green" id="disabled-green" />
        <Label htmlFor="disabled-green">Green</Label>
      </div>
    </RadioGroup>
  ),
}

export const DisabledWithValue: Story = {
  render: () => (
    <RadioGroup disabled defaultValue="blue" aria-label="Choose your favorite color">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Radio value="red" id="disabled-value-red" />
        <Label htmlFor="disabled-value-red">Red</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Radio value="blue" id="disabled-value-blue" />
        <Label htmlFor="disabled-value-blue">Blue (Selected)</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Radio value="green" id="disabled-value-green" />
        <Label htmlFor="disabled-value-green">Green</Label>
      </div>
    </RadioGroup>
  ),
}

export const IndividualItemDisabled: Story = {
  render: () => (
    <RadioGroup aria-label="Choose your favorite color">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Radio value="red" id="individual-red" />
        <Label htmlFor="individual-red">Red</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Radio value="blue" id="individual-blue" disabled />
        <Label htmlFor="individual-blue">Blue (Disabled)</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Radio value="green" id="individual-green" />
        <Label htmlFor="individual-green">Green</Label>
      </div>
    </RadioGroup>
  ),
}

export const Invalid: Story = {
  render: () => (
    <RadioGroup aria-label="Choose your favorite color">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Radio value="red" id="invalid-red" isInvalid />
        <Label htmlFor="invalid-red">Red</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Radio value="blue" id="invalid-blue" isInvalid />
        <Label htmlFor="invalid-blue">Blue</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Radio value="green" id="invalid-green" isInvalid />
        <Label htmlFor="invalid-green">Green</Label>
      </div>
    </RadioGroup>
  ),
}

export const WithHelperText: Story = {
  render: () => (
    <Field>
      <RadioGroup aria-label="Choose your plan" aria-describedby="plan-helper">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Radio value="basic" id="plan-basic" />
          <Label htmlFor="plan-basic">Basic Plan - $9/month</Label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Radio value="pro" id="plan-pro" />
          <Label htmlFor="plan-pro">Pro Plan - $29/month</Label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Radio value="enterprise" id="plan-enterprise" />
          <Label htmlFor="plan-enterprise">Enterprise Plan - $99/month</Label>
        </div>
      </RadioGroup>
      <HelperText id="plan-helper">
        Choose the plan that best fits your needs. You can upgrade or downgrade anytime.
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
          <RadioGroup
            value={selectedPlan}
            onValueChange={(value) => {
              setSelectedPlan(value)
              setShowError(false)
            }}
            required
            aria-label="Choose your plan"
            aria-describedby={showError ? 'plan-error' : undefined}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio
                value="basic"
                id="validation-basic"
                isInvalid={showError}
              />
              <Label htmlFor="validation-basic">Basic Plan - $9/month</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio
                value="pro"
                id="validation-pro"
                isInvalid={showError}
              />
              <Label htmlFor="validation-pro">Pro Plan - $29/month</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio
                value="enterprise"
                id="validation-enterprise"
                isInvalid={showError}
              />
              <Label htmlFor="validation-enterprise">Enterprise Plan - $99/month</Label>
            </div>
          </RadioGroup>
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

export const FocusStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Standard Focus States</h3>
        <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
          Use Tab key to navigate between radio buttons and see focus rings
        </p>
        <RadioGroup aria-label="Standard focus example">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio value="option1" id="focus-option1" />
            <Label htmlFor="focus-option1">Option 1</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio value="option2" id="focus-option2" />
            <Label htmlFor="focus-option2">Option 2</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio value="option3" id="focus-option3" />
            <Label htmlFor="focus-option3">Option 3</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Error State Focus</h3>
        <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
          Focus rings show critical color when radio buttons are in error state
        </p>
        <RadioGroup aria-label="Error focus example">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio value="error1" id="focus-error1" isInvalid />
            <Label htmlFor="focus-error1">Error Option 1</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio value="error2" id="focus-error2" isInvalid />
            <Label htmlFor="focus-error2">Error Option 2</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio value="error3" id="focus-error3" isInvalid />
            <Label htmlFor="focus-error3">Error Option 3</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
}

export const CompleteExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      paymentMethod: '',
      shippingSpeed: 'standard',
      newsletter: '',
    })

    const [errors, setErrors] = useState({
      paymentMethod: false,
      newsletter: false,
    })

    const handleFieldChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }))
      setErrors(prev => ({ ...prev, [field]: false }))
    }

    const handleSubmit = () => {
      const newErrors = {
        paymentMethod: !formData.paymentMethod,
        newsletter: !formData.newsletter,
      }
      setErrors(newErrors)

      if (!newErrors.paymentMethod && !newErrors.newsletter) {
        alert('Form submitted successfully!')
      }
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: '400px' }}>
        <h3 style={{ margin: 0 }}>Complete Your Order</h3>

        <Field>
          <Label style={{ fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>
            Payment Method *
          </Label>
          <RadioGroup
            value={formData.paymentMethod}
            onValueChange={(value) => handleFieldChange('paymentMethod', value)}
            required
            aria-describedby={errors.paymentMethod ? 'payment-error' : undefined}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio
                value="credit-card"
                id="payment-credit"
                isInvalid={errors.paymentMethod}
              />
              <Label htmlFor="payment-credit">Credit Card</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio
                value="paypal"
                id="payment-paypal"
                isInvalid={errors.paymentMethod}
              />
              <Label htmlFor="payment-paypal">PayPal</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio
                value="bank-transfer"
                id="payment-bank"
                isInvalid={errors.paymentMethod}
              />
              <Label htmlFor="payment-bank">Bank Transfer</Label>
            </div>
          </RadioGroup>
          {errors.paymentMethod && (
            <ValidationMessage id="payment-error" type="error">
              Please select a payment method
            </ValidationMessage>
          )}
        </Field>

        <Field>
          <Label style={{ fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>
            Shipping Speed
          </Label>
          <RadioGroup
            value={formData.shippingSpeed}
            onValueChange={(value) => handleFieldChange('shippingSpeed', value)}
            orientation="horizontal"
            aria-describedby="shipping-helper"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio value="standard" id="shipping-standard" />
              <Label htmlFor="shipping-standard">Standard (5-7 days)</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio value="express" id="shipping-express" />
              <Label htmlFor="shipping-express">Express (2-3 days)</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio value="overnight" id="shipping-overnight" />
              <Label htmlFor="shipping-overnight">Overnight</Label>
            </div>
          </RadioGroup>
          <HelperText id="shipping-helper">
            Free standard shipping on orders over $50
          </HelperText>
        </Field>

        <Field>
          <Label style={{ fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>
            Newsletter Subscription *
          </Label>
          <RadioGroup
            value={formData.newsletter}
            onValueChange={(value) => handleFieldChange('newsletter', value)}
            required
            aria-describedby={errors.newsletter ? 'newsletter-error' : 'newsletter-helper'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio
                value="weekly"
                id="newsletter-weekly"
                isInvalid={errors.newsletter}
              />
              <Label htmlFor="newsletter-weekly">Weekly newsletter</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio
                value="monthly"
                id="newsletter-monthly"
                isInvalid={errors.newsletter}
              />
              <Label htmlFor="newsletter-monthly">Monthly newsletter</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio
                value="none"
                id="newsletter-none"
                isInvalid={errors.newsletter}
              />
              <Label htmlFor="newsletter-none">No newsletter</Label>
            </div>
          </RadioGroup>
          {errors.newsletter ? (
            <ValidationMessage id="newsletter-error" type="error">
              Please select a newsletter preference
            </ValidationMessage>
          ) : (
            <HelperText id="newsletter-helper">
              Stay updated with our latest products and offers
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
          Complete Order
        </button>
      </div>
    )
  },
}