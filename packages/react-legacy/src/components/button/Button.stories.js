import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { Button } from './Button';

export default {
	title: 'Components/Buttons & Links/Button',
	component: Button,
	decorators: [withDesign],
	argTypes: {
		text: 'Button text',
		variant: {
			options: [
				'primary',
				'secondary',
				'tertiary',
				'ghost',
				'destructive',
			],
			control: { type: 'select' },
		},
		size: {
			options: ['large', 'medium', 'small'],
			control: { type: 'select' },
		},
		disabled: {
			options: [true, false],
			control: { type: 'boolean' },
		},
	},
};

const Template = (args) => <Button {...args}>{args.text}</Button>;

export const Default = Template.bind({});

Default.args = {
	text: 'Button text',
	size: 'large',
	variant: 'primary',
	disabled: false,
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/zjft7NvdfMnRyEm8HTsnIX/Components-%2B-Styles?node-id=177%3A6',
	},
	a11y: {
		config: {
			rules: [
				{
					id: 'color-contrast',
					enabled: true,
				},
			],
		},
	},
};
