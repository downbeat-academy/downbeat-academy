import React from 'react';
import { SocialIcon } from './index';

export default {
	title: 'Foundations/Icons/Social Icons',
	argTypes: {
		size: {
			options: ['extraSmall', 'small', 'medium', 'large'],
			control: { type: 'radio' },
		},
		color: 'color',
		direction: {
			options: ['up', 'down', 'left', 'right'],
			control: { type: 'radio' },
		},
	},
};

export const SocialIcons = (args) => <SocialIcon {...args} />;

SocialIcons.args = {
	icon: 'facebook',
	size: 'small',
	color: '$blackberry1000',
};
