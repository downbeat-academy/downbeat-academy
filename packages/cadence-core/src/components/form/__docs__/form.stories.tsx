import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Form, FormField, Input, Textarea, Label, HelperText, ValidationMessage, HorizontalWrapper, Switch } from '../'

const meta: Meta<typeof Form> = {
  title: 'Cadence/Components/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    spacing: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
    },
    method: {
      control: 'select',
      options: ['GET', 'POST'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const BasicForm: Story = {
  args: {
    spacing: 'medium',
  },
  render: (args) => (
    <Form {...args} style={{ width: '400px' }}>
      <FormField>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Enter your name" />
        <HelperText>Please enter your full name</HelperText>
      </FormField>
      
      <FormField>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="Enter your email" />
      </FormField>
      
      <FormField>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" placeholder="Enter your message" rows={4} />
      </FormField>
    </Form>
  ),
}

export const AllInputTypes: Story = {
  args: {
    spacing: 'medium',
  },
  render: (args) => (
    <Form {...args} style={{ width: '400px' }}>
      <FormField>
        <Label htmlFor="text">Text Input</Label>
        <Input id="text" name="text" type="text" placeholder="Enter text" />
      </FormField>
      
      <FormField>
        <Label htmlFor="email">Email Input</Label>
        <Input id="email" name="email" type="email" placeholder="example@email.com" />
      </FormField>
      
      <FormField>
        <Label htmlFor="password">Password Input</Label>
        <Input id="password" name="password" type="password" placeholder="Enter password" />
      </FormField>
      
      <FormField>
        <Label htmlFor="number">Number Input</Label>
        <Input id="number" name="number" type="number" placeholder="123" />
      </FormField>
      
      <FormField>
        <Label htmlFor="tel">Telephone Input</Label>
        <Input id="tel" name="tel" type="tel" placeholder="+1 (555) 000-0000" />
      </FormField>
      
      <FormField>
        <Label htmlFor="url">URL Input</Label>
        <Input id="url" name="url" type="url" placeholder="https://example.com" />
      </FormField>
    </Form>
  ),
}

export const TextareaVariations: Story = {
  args: {
    spacing: 'medium',
  },
  render: (args) => (
    <Form {...args} style={{ width: '400px' }}>
      <FormField>
        <Label htmlFor="small-textarea">Small Textarea (3 rows)</Label>
        <Textarea id="small-textarea" name="small-textarea" placeholder="Enter short text" rows={3} />
      </FormField>
      
      <FormField>
        <Label htmlFor="medium-textarea">Medium Textarea (5 rows - default)</Label>
        <Textarea id="medium-textarea" name="medium-textarea" placeholder="Enter medium text" />
      </FormField>
      
      <FormField>
        <Label htmlFor="large-textarea">Large Textarea (10 rows)</Label>
        <Textarea id="large-textarea" name="large-textarea" placeholder="Enter long text" rows={10} />
      </FormField>
    </Form>
  ),
}

export const FormWithSwitches: Story = {
  args: {
    spacing: 'medium',
  },
  render: (args) => (
    <Form {...args} style={{ width: '400px' }}>
      <FormField>
        <Switch name="notifications" label="Enable notifications" />
        <HelperText>Receive email notifications about updates</HelperText>
      </FormField>
      
      <FormField>
        <Switch name="marketing" label="Marketing emails" checked />
        <HelperText>Receive promotional offers and newsletters</HelperText>
      </FormField>
      
      <FormField>
        <Switch name="public-profile" label="Public profile" disabled />
        <HelperText>Make your profile visible to everyone</HelperText>
      </FormField>
    </Form>
  ),
}

export const DisabledAndReadOnlyStates: Story = {
  args: {
    spacing: 'medium',
  },
  render: (args) => (
    <Form {...args} style={{ width: '400px' }}>
      <FormField>
        <Label htmlFor="disabled-input">Disabled Input</Label>
        <Input id="disabled-input" name="disabled-input" placeholder="Cannot edit" disabled />
      </FormField>
      
      <FormField>
        <Label htmlFor="readonly-input">Read-only Input</Label>
        <Input id="readonly-input" name="readonly-input" value="Read only value" readOnly />
      </FormField>
      
      <FormField>
        <Label htmlFor="disabled-textarea">Disabled Textarea</Label>
        <Textarea id="disabled-textarea" name="disabled-textarea" placeholder="Cannot edit" disabled />
      </FormField>
      
      <FormField>
        <Label htmlFor="readonly-textarea">Read-only Textarea</Label>
        <Textarea id="readonly-textarea" name="readonly-textarea" value="Read only text content" readOnly />
      </FormField>
    </Form>
  ),
}

export const FormWithValidation: Story = {
  args: {
    spacing: 'medium',
  },
  render: (args) => (
    <Form {...args} style={{ width: '400px' }}>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input id="username" name="username" placeholder="Enter username" />
        <ValidationMessage type="success">Username is available</ValidationMessage>
      </FormField>
      
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" placeholder="Enter password" />
        <ValidationMessage type="warning">Password should be stronger</ValidationMessage>
      </FormField>
      
      <FormField>
        <Label htmlFor="confirm">Confirm Password</Label>
        <Input id="confirm" name="confirm" type="password" placeholder="Confirm password" isInvalid />
        <ValidationMessage type="error">Passwords do not match</ValidationMessage>
      </FormField>
    </Form>
  ),
}

export const HorizontalLayout: Story = {
  args: {
    spacing: 'medium',
  },
  render: (args) => (
    <Form {...args} style={{ width: '600px' }}>
      <FormField orientation="horizontal">
        <Label htmlFor="firstname">First Name</Label>
        <Input id="firstname" name="firstname" placeholder="John" />
      </FormField>
      
      <FormField orientation="horizontal">
        <Label htmlFor="lastname">Last Name</Label>
        <Input id="lastname" name="lastname" placeholder="Doe" />
      </FormField>
      
      <HorizontalWrapper>
        <FormField>
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" placeholder="New York" />
        </FormField>
        <FormField>
          <Label htmlFor="state">State</Label>
          <Input id="state" name="state" placeholder="NY" />
        </FormField>
      </HorizontalWrapper>
    </Form>
  ),
}

export const CompleteFormExample: Story = {
  args: {
    spacing: 'medium',
  },
  render: (args) => (
    <Form {...args} style={{ width: '500px' }}>
      <h3 style={{ marginBottom: '16px' }}>Contact Form</h3>
      
      <HorizontalWrapper>
        <FormField>
          <Label htmlFor="first-name" required>First Name</Label>
          <Input id="first-name" name="first-name" placeholder="John" required />
        </FormField>
        <FormField>
          <Label htmlFor="last-name" required>Last Name</Label>
          <Input id="last-name" name="last-name" placeholder="Doe" required />
        </FormField>
      </HorizontalWrapper>
      
      <FormField>
        <Label htmlFor="contact-email" required>Email</Label>
        <Input id="contact-email" name="contact-email" type="email" placeholder="john.doe@example.com" required />
        <HelperText>We'll never share your email with anyone else</HelperText>
      </FormField>
      
      <FormField>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
      </FormField>
      
      <FormField>
        <Label htmlFor="subject" required>Subject</Label>
        <Input id="subject" name="subject" placeholder="How can we help?" required />
      </FormField>
      
      <FormField>
        <Label htmlFor="message-content" required>Message</Label>
        <Textarea id="message-content" name="message-content" placeholder="Tell us more..." rows={6} required />
      </FormField>
      
      <FormField>
        <Switch name="newsletter" label="Subscribe to newsletter" />
      </FormField>
      
      <FormField>
        <Switch name="terms" label="I agree to the terms and conditions" checked required />
        <ValidationMessage type="success">Thank you for agreeing to our terms</ValidationMessage>
      </FormField>
    </Form>
  ),
}

export const FormSpacing: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px' }}>
      <Form spacing="small" style={{ width: '200px' }}>
        <FormField>
          <Label>Small Spacing</Label>
          <Input placeholder="Input 1" />
        </FormField>
        <FormField>
          <Input placeholder="Input 2" />
        </FormField>
      </Form>
      
      <Form spacing="medium" style={{ width: '200px' }}>
        <FormField>
          <Label>Medium Spacing</Label>
          <Input placeholder="Input 1" />
        </FormField>
        <FormField>
          <Input placeholder="Input 2" />
        </FormField>
      </Form>
      
      <Form spacing="large" style={{ width: '200px' }}>
        <FormField>
          <Label>Large Spacing</Label>
          <Input placeholder="Input 1" />
        </FormField>
        <FormField>
          <Input placeholder="Input 2" />
        </FormField>
      </Form>
    </div>
  ),
}