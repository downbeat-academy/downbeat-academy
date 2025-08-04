import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CheckboxCardGroup, CheckboxCardItem } from '../checkbox-card'
import { Field } from '../../field'
import { Label } from '../../primitives/label'
import { HelperText } from '../../primitives/helper-text'
import { ValidationMessage } from '../../primitives/validation-message'
import { Badge } from '../../../badge'

// Mock icons for the stories
const CreditCardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
)

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const GlobeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

const ZapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
  </svg>
)

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
  render: () => (
    <CheckboxCardGroup aria-label="Choose your preferred payment methods">
      <CheckboxCardItem 
        value="credit-card" 
        title="Credit Card"
        description="Pay with Visa, Mastercard, or American Express"
        icon={<CreditCardIcon />}
      />
      <CheckboxCardItem 
        value="bank-transfer" 
        title="Bank Transfer"
        description="Direct transfer from your bank account"
        icon={<ShieldIcon />}
      />
      <CheckboxCardItem 
        value="digital-wallet" 
        title="Digital Wallet"
        description="Pay with PayPal, Apple Pay, or Google Pay"
        icon={<GlobeIcon />}
      />
    </CheckboxCardGroup>
  ),
}

export const WithDefaultValues: Story = {
  render: () => (
    <CheckboxCardGroup 
      defaultValue={['credit-card', 'digital-wallet']} 
      aria-label="Choose your preferred payment methods"
    >
      <CheckboxCardItem 
        value="credit-card" 
        title="Credit Card"
        description="Pay with Visa, Mastercard, or American Express"
        icon={<CreditCardIcon />}
      />
      <CheckboxCardItem 
        value="bank-transfer" 
        title="Bank Transfer"
        description="Direct transfer from your bank account"
        icon={<ShieldIcon />}
      />
      <CheckboxCardItem 
        value="digital-wallet" 
        title="Digital Wallet"
        description="Pay with PayPal, Apple Pay, or Google Pay"
        icon={<GlobeIcon />}
      />
    </CheckboxCardGroup>
  ),
}

export const StandaloneCard: Story = {
  render: () => (
    <CheckboxCardItem 
      value="newsletter" 
      title="Subscribe to Newsletter"
      description="Get the latest updates and exclusive offers delivered to your inbox"
      icon={<GlobeIcon />}
    />
  ),
}

export const WithBadges: Story = {
  render: () => (
    <CheckboxCardGroup aria-label="Choose your plan features" columns={2}>
      <CheckboxCardItem 
        value="basic-analytics" 
        title="Basic Analytics"
        description="View basic metrics and reports"
        icon={<ZapIcon />}
        badge={<Badge size="small" variant="success">Free</Badge>}
      />
      <CheckboxCardItem 
        value="advanced-analytics" 
        title="Advanced Analytics"
        description="Get detailed insights and custom reports"
        icon={<ZapIcon />}
        badge={<Badge size="small" variant="warning">Pro</Badge>}
      />
      <CheckboxCardItem 
        value="real-time-data" 
        title="Real-time Data"
        description="Live dashboard with instant updates"
        icon={<ZapIcon />}
        badge={<Badge size="small" variant="critical">Premium</Badge>}
      />
      <CheckboxCardItem 
        value="api-access" 
        title="API Access"
        description="Integrate with third-party applications"
        icon={<ZapIcon />}
        badge={<Badge size="small" variant="informational">Enterprise</Badge>}
      />
    </CheckboxCardGroup>
  ),
}

export const GridLayouts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4>2 Columns</h4>
        <CheckboxCardGroup aria-label="2 column layout" columns={2}>
          <CheckboxCardItem value="option1" title="Option 1" />
          <CheckboxCardItem value="option2" title="Option 2" />
          <CheckboxCardItem value="option3" title="Option 3" />
          <CheckboxCardItem value="option4" title="Option 4" />
        </CheckboxCardGroup>
      </div>
      
      <div>
        <h4>3 Columns</h4>
        <CheckboxCardGroup aria-label="3 column layout" columns={3}>
          <CheckboxCardItem value="option1" title="Option 1" />
          <CheckboxCardItem value="option2" title="Option 2" />
          <CheckboxCardItem value="option3" title="Option 3" />
          <CheckboxCardItem value="option4" title="Option 4" />
          <CheckboxCardItem value="option5" title="Option 5" />
          <CheckboxCardItem value="option6" title="Option 6" />
        </CheckboxCardGroup>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4>Small Size</h4>
        <CheckboxCardGroup aria-label="Small cards" columns={3}>
          <CheckboxCardItem 
            value="small1" 
            title="Small Card 1"
            size="small"
            icon={<ZapIcon />}
          />
          <CheckboxCardItem 
            value="small2" 
            title="Small Card 2"
            size="small"
            icon={<ZapIcon />}
          />
          <CheckboxCardItem 
            value="small3" 
            title="Small Card 3"
            size="small"
            icon={<ZapIcon />}
          />
        </CheckboxCardGroup>
      </div>
      
      <div>
        <h4>Medium Size (Default)</h4>
        <CheckboxCardGroup aria-label="Medium cards" columns={2}>
          <CheckboxCardItem 
            value="medium1" 
            title="Medium Card 1"
            description="This is a medium-sized card"
            size="medium"
            icon={<ZapIcon />}
          />
          <CheckboxCardItem 
            value="medium2" 
            title="Medium Card 2"
            description="This is a medium-sized card"
            size="medium"
            icon={<ZapIcon />}
          />
        </CheckboxCardGroup>
      </div>
      
      <div>
        <h4>Large Size</h4>
        <CheckboxCardGroup aria-label="Large cards" columns={2}>
          <CheckboxCardItem 
            value="large1" 
            title="Large Card 1"
            description="This is a large card with more space for content and descriptions that might be longer"
            size="large"
            icon={<ZapIcon />}
          />
          <CheckboxCardItem 
            value="large2" 
            title="Large Card 2"
            description="This is a large card with more space for content and descriptions that might be longer"
            size="large"
            icon={<ZapIcon />}
          />
        </CheckboxCardGroup>
      </div>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4>Default Variant</h4>
        <CheckboxCardGroup aria-label="Default variant" columns={3}>
          <CheckboxCardItem 
            value="default1" 
            title="Default Card"
            description="Standard card appearance"
            variant="default"
          />
          <CheckboxCardItem 
            value="default2" 
            title="Default Card"
            description="Standard card appearance"
            variant="default"
          />
          <CheckboxCardItem 
            value="default3" 
            title="Default Card"
            description="Standard card appearance"
            variant="default"
          />
        </CheckboxCardGroup>
      </div>
      
      <div>
        <h4>Outlined Variant</h4>
        <CheckboxCardGroup aria-label="Outlined variant" columns={3}>
          <CheckboxCardItem 
            value="outlined1" 
            title="Outlined Card"
            description="Outlined card with transparent background"
            variant="outlined"
          />
          <CheckboxCardItem 
            value="outlined2" 
            title="Outlined Card"
            description="Outlined card with transparent background"
            variant="outlined"
          />
          <CheckboxCardItem 
            value="outlined3" 
            title="Outlined Card"
            description="Outlined card with transparent background"
            variant="outlined"
          />
        </CheckboxCardGroup>
      </div>
      
      <div>
        <h4>Filled Variant</h4>
        <CheckboxCardGroup aria-label="Filled variant" columns={3}>
          <CheckboxCardItem 
            value="filled1" 
            title="Filled Card"
            description="Card with filled background"
            variant="filled"
          />
          <CheckboxCardItem 
            value="filled2" 
            title="Filled Card"
            description="Card with filled background"
            variant="filled"
          />
          <CheckboxCardItem 
            value="filled3" 
            title="Filled Card"
            description="Card with filled background"
            variant="filled"
          />
        </CheckboxCardGroup>
      </div>
    </div>
  ),
}

export const CustomContent: Story = {
  render: () => (
    <CheckboxCardGroup aria-label="Custom content cards" columns={2}>
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
  ),
}

export const Disabled: Story = {
  render: () => (
    <CheckboxCardGroup disabled aria-label="Disabled checkbox cards" columns={2}>
      <CheckboxCardItem 
        value="disabled1" 
        title="Disabled Card 1"
        description="This card is disabled"
        icon={<CreditCardIcon />}
      />
      <CheckboxCardItem 
        value="disabled2" 
        title="Disabled Card 2"
        description="This card is disabled"
        icon={<ShieldIcon />}
      />
    </CheckboxCardGroup>
  ),
}

export const IndividualDisabled: Story = {
  render: () => (
    <CheckboxCardGroup aria-label="Mixed disabled states" columns={2}>
      <CheckboxCardItem 
        value="enabled" 
        title="Enabled Card"
        description="This card is enabled"
        icon={<CreditCardIcon />}
      />
      <CheckboxCardItem 
        value="disabled" 
        title="Disabled Card"
        description="This card is disabled"
        icon={<ShieldIcon />}
        disabled
      />
    </CheckboxCardGroup>
  ),
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
              description="Track your performance"
              icon={<ZapIcon />}
              isInvalid={showError}
            />
            <CheckboxCardItem
              value="collaboration"
              title="Collaboration"
              description="Work with your team"
              icon={<GlobeIcon />}
              isInvalid={showError}
            />
            <CheckboxCardItem
              value="security"
              title="Security"
              description="Advanced security features"
              icon={<ShieldIcon />}
              isInvalid={showError}
            />
            <CheckboxCardItem
              value="automation"
              title="Automation"
              description="Automate your workflows"
              icon={<CreditCardIcon />}
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
              description="High-performance hosting with 99.9% uptime guarantee"
              icon={<GlobeIcon />}
              badge={<Badge size="small" variant="success">Essential</Badge>}
              isInvalid={errors.services}
            />
            <CheckboxCardItem
              value="database"
              title="Database"
              description="Managed database with automatic backups and scaling"
              icon={<ShieldIcon />}
              badge={<Badge size="small" variant="success">Essential</Badge>}
              isInvalid={errors.services}
            />
            <CheckboxCardItem
              value="cdn"
              title="Content Delivery Network"
              description="Global CDN for faster content delivery worldwide"
              icon={<ZapIcon />}
              badge={<Badge size="small" variant="warning">Recommended</Badge>}
              isInvalid={errors.services}
            />
            <CheckboxCardItem
              value="monitoring"
              title="Application Monitoring"
              description="Real-time monitoring and alerting for your applications"
              icon={<CreditCardIcon />}
              badge={<Badge size="small" variant="informational">Optional</Badge>}
              isInvalid={errors.services}
            />
          </CheckboxCardGroup>
          {errors.services ? (
            <ValidationMessage id="services-error" type="error">
              Please select at least one core service
            </ValidationMessage>
          ) : (
            <HelperText id="services-helper">
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
            size="small"
          >
            <CheckboxCardItem
              value="ssl"
              title="SSL Certificate"
              description="Secure your site with HTTPS"
              size="small"
            />
            <CheckboxCardItem
              value="backup"
              title="Daily Backups"
              description="Automated daily backups"
              size="small"
            />
            <CheckboxCardItem
              value="staging"
              title="Staging Environment"
              description="Test changes safely"
              size="small"
            />
            <CheckboxCardItem
              value="analytics"
              title="Analytics"
              description="Detailed visitor analytics"
              size="small"
            />
            <CheckboxCardItem
              value="support"
              title="Priority Support"
              description="24/7 priority support"
              size="small"
            />
            <CheckboxCardItem
              value="migration"
              title="Migration Service"
              description="Free site migration"
              size="small"
            />
          </CheckboxCardGroup>
          <HelperText id="addons-helper">
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
            variant="outlined"
          >
            <CheckboxCardItem
              value="email-updates"
              title="Email Updates"
              description="Receive important updates via email"
              variant="outlined"
            />
            <CheckboxCardItem
              value="sms-alerts"
              title="SMS Alerts"
              description="Get critical alerts via SMS"
              variant="outlined"
            />
            <CheckboxCardItem
              value="newsletter"
              title="Newsletter"
              description="Monthly newsletter with tips and news"
              variant="outlined"
            />
            <CheckboxCardItem
              value="promotional"
              title="Promotional Offers"
              description="Receive special offers and discounts"
              variant="outlined"
            />
          </CheckboxCardGroup>
          <HelperText id="preferences-helper">
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