import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FormField, FormFieldProps } from '../form-field'
import { Input } from '../../input/input'
import { HelperText } from '../../primitives/helper-text'
import { Label } from '../../primitives/label'
import { ValidationMessage } from '../../primitives/validation-message'
import Example from './example'

const meta: Meta<typeof Example> = {
  title: 'Cadence / Components / Form / Form Field',
  component: FormField
}

export default meta;
type Story = StoryObj<typeof Example>;

const Template = (args: FormFieldProps) => (
  <FormField {...args}>
    <Label htmlFor="first-name">First name</Label>
    <HelperText>Helper text</HelperText>
    <Input type="text" placeholder="Enter text" />
    <ValidationMessage type='success'>That's correct!</ValidationMessage>
  </FormField>
);

// @ts-ignore
export const Vertical: VerticalStory = (args) => <Template {...args} />;
Vertical.args = {
  orientation: 'vertical'
};

// @ts-ignore
export const Horizontal: Story = (args) => <Template {...args} />;
Horizontal.args = {
  orientation: 'horizontal'
};