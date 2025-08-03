import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Form, Field, Input, Textarea, Label, HelperText, ValidationMessage, HorizontalWrapper, Switch } from '../'

const meta: Meta<typeof Form> = {
  title: 'Cadence/Components/Forms/Form Examples',
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
      <Field>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Enter your name" />
        <HelperText>Please enter your full name</HelperText>
      </Field>

      <Field>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="Enter your email" />
      </Field>

      <Field>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" placeholder="Enter your message" rows={4} />
      </Field>
    </Form>
  ),
}

export const AllInputTypes: Story = {
  args: {
    spacing: 'medium',
  },
  render: (args) => (
    <Form {...args} style={{ width: '400px' }}>
      <Field>
        <Label htmlFor="text">Text Input</Label>
        <Input id="text" name="text" type="text" placeholder="Enter text" />
      </Field>

      <Field>
        <Label htmlFor="email">Email Input</Label>
        <Input id="email" name="email" type="email" placeholder="example@email.com" />
      </Field>

      <Field>
        <Label htmlFor="password">Password Input</Label>
        <Input id="password" name="password" type="password" placeholder="Enter password" />
      </Field>

      <Field>
        <Label htmlFor="number">Number Input</Label>
        <Input id="number" name="number" type="number" placeholder="123" />
      </Field>

      <Field>
        <Label htmlFor="tel">Telephone Input</Label>
        <Input id="tel" name="tel" type="tel" placeholder="+1 (555) 000-0000" />
      </Field>

      <Field>
        <Label htmlFor="url">URL Input</Label>
        <Input id="url" name="url" type="url" placeholder="https://example.com" />
      </Field>
    </Form>
  ),
}

export const TextareaVariations: Story = {
  args: {
    spacing: 'medium',
  },
  render: (args) => (
    <Form {...args} style={{ width: '400px' }}>
      <Field>
        <Label htmlFor="small-textarea">Small Textarea (3 rows)</Label>
        <Textarea id="small-textarea" name="small-textarea" placeholder="Enter short text" rows={3} />
      </Field>

      <Field>
        <Label htmlFor="medium-textarea">Medium Textarea (5 rows - default)</Label>
        <Textarea id="medium-textarea" name="medium-textarea" placeholder="Enter medium text" />
      </Field>

      <Field>
        <Label htmlFor="large-textarea">Large Textarea (10 rows)</Label>
        <Textarea id="large-textarea" name="large-textarea" placeholder="Enter long text" rows={10} />
      </Field>
    </Form>
  ),
}

export const FormWithSwitches: Story = {
  args: {
    spacing: 'medium',
  },
  render: (args) => (
    <Form {...args} style={{ width: '400px' }}>
      <Field>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Switch name="notifications" id="notifications-switch" />
          <Label htmlFor="notifications-switch">Enable notifications</Label>
        </div>
        <HelperText>Receive email notifications about updates</HelperText>
      </Field>

      <Field>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Switch name="marketing" id="marketing-switch" checked />
          <Label htmlFor="marketing-switch">Marketing emails</Label>
        </div>
        <HelperText>Receive promotional offers and newsletters</HelperText>
      </Field>

      <Field>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Switch name="public-profile" id="public-profile-switch" disabled />
          <Label htmlFor="public-profile-switch">Public profile</Label>
        </div>
        <HelperText>Make your profile visible to everyone</HelperText>
      </Field>
    </Form>
  ),
}

export const DisabledAndReadOnlyStates: Story = {
  args: {
    spacing: 'medium',
  },
  render: (args) => (
    <Form {...args} style={{ width: '400px' }}>
      <Field>
        <Label htmlFor="disabled-input">Disabled Input</Label>
        <Input id="disabled-input" name="disabled-input" placeholder="Cannot edit" disabled />
      </Field>

      <Field>
        <Label htmlFor="readonly-input">Read-only Input</Label>
        <Input id="readonly-input" name="readonly-input" value="Read only value" readOnly />
      </Field>

      <Field>
        <Label htmlFor="disabled-textarea">Disabled Textarea</Label>
        <Textarea id="disabled-textarea" name="disabled-textarea" placeholder="Cannot edit" disabled />
      </Field>

      <Field>
        <Label htmlFor="readonly-textarea">Read-only Textarea</Label>
        <Textarea id="readonly-textarea" name="readonly-textarea" value="Read only text content" readOnly />
      </Field>
    </Form>
  ),
}

export const FormWithValidation: Story = {
  args: {
    spacing: 'medium',
  },
  render: (args) => (
    <Form {...args} style={{ width: '400px' }}>
      <Field>
        <Label htmlFor="username">Username</Label>
        <Input id="username" name="username" placeholder="Enter username" />
        <ValidationMessage type="success">Username is available</ValidationMessage>
      </Field>

      <Field>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" placeholder="Enter password" />
        <ValidationMessage type="warning">Password should be stronger</ValidationMessage>
      </Field>

      <Field>
        <Label htmlFor="confirm">Confirm Password</Label>
        <Input id="confirm" name="confirm" type="password" placeholder="Confirm password" isInvalid />
        <ValidationMessage type="error">Passwords do not match</ValidationMessage>
      </Field>
    </Form>
  ),
}

export const HorizontalLayout: Story = {
  args: {
    spacing: 'medium',
  },
  render: (args) => (
    <Form {...args} style={{ width: '600px' }}>
      <Field orientation="horizontal">
        <Label htmlFor="firstname">First Name</Label>
        <Input id="firstname" name="firstname" placeholder="John" />
      </Field>

      <Field orientation="horizontal">
        <Label htmlFor="lastname">Last Name</Label>
        <Input id="lastname" name="lastname" placeholder="Doe" />
      </Field>

      <HorizontalWrapper>
        <Field>
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" placeholder="New York" />
        </Field>
        <Field>
          <Label htmlFor="state">State</Label>
          <Input id="state" name="state" placeholder="NY" />
        </Field>
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
        <Field>
          <Label htmlFor="first-name">First Name</Label>
          <Input id="first-name" name="first-name" placeholder="John" required />
        </Field>
        <Field>
          <Label htmlFor="last-name">Last Name</Label>
          <Input id="last-name" name="last-name" placeholder="Doe" required />
        </Field>
      </HorizontalWrapper>

      <Field>
        <Label htmlFor="contact-email">Email</Label>
        <Input id="contact-email" name="contact-email" type="email" placeholder="john.doe@example.com" required />
        <HelperText>We'll never share your email with anyone else</HelperText>
      </Field>

      <Field>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
      </Field>

      <Field>
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" placeholder="How can we help?" required />
      </Field>

      <Field>
        <Label htmlFor="message-content">Message</Label>
        <Textarea id="message-content" name="message-content" placeholder="Tell us more..." rows={6} required />
      </Field>

      <Field>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Switch name="newsletter" id="newsletter-switch" />
          <Label htmlFor="newsletter-switch">Subscribe to newsletter</Label>
        </div>
      </Field>

      <Field>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Switch name="terms" id="terms-switch" checked required />
          <Label htmlFor="terms-switch">I agree to the terms and conditions</Label>
        </div>
        <ValidationMessage type="success">Thank you for agreeing to our terms</ValidationMessage>
      </Field>
    </Form>
  ),
}

export const FormSpacing: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px' }}>
      <Form spacing="small" style={{ width: '200px' }}>
        <Field>
          <Label>Small Spacing</Label>
          <Input placeholder="Input 1" />
        </Field>
        <Field>
          <Input placeholder="Input 2" />
        </Field>
      </Form>

      <Form spacing="medium" style={{ width: '200px' }}>
        <Field>
          <Label>Medium Spacing</Label>
          <Input placeholder="Input 1" />
        </Field>
        <Field>
          <Input placeholder="Input 2" />
        </Field>
      </Form>

      <Form spacing="large" style={{ width: '200px' }}>
        <Field>
          <Label>Large Spacing</Label>
          <Input placeholder="Input 1" />
        </Field>
        <Field>
          <Input placeholder="Input 2" />
        </Field>
      </Form>
    </div>
  ),
}