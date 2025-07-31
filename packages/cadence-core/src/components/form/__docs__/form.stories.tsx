import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Form, FormField, Input, Textarea, Label, HelperText, ValidationMessage, HorizontalWrapper } from '../'

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