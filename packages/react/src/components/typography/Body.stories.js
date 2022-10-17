import React from 'react';
import { Paragraph } from './Body';

export default {
	title: 'Components/Typography/Body',
	component: Paragraph,
	argTypes: {
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel orci porta non pulvinar. Arcu non sodales neque sodales ut etiam sit. Etiam sit amet nisl purus in mollis nunc sed id. Eu facilisis sed odio morbi quis. Sed id semper risus in hendrerit gravida. Nisl pretium fusce id velit ut. Massa tincidunt nunc pulvinar sapien et. Libero enim sed faucibus turpis in. Tortor condimentum lacinia quis vel eros. At augue eget arcu dictum varius duis.',
		context: {
			options: ['display', 'interface'],
			control: { type: 'select' },
		},
		size: {
			options: ['extraLarge', 'large', 'base', 'small', 'extraSmall' ],
			control: { type: 'select' },
		},
	},
};

export const Default = (args) => <Paragraph {...args}>{args.text}</Paragraph>;

Default.args = {
	context: 'display',
	size: 'base',
	text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel orci porta non pulvinar. Arcu non sodales neque sodales ut etiam sit. Etiam sit amet nisl purus in mollis nunc sed id. Eu facilisis sed odio morbi quis. Sed id semper risus in hendrerit gravida. Nisl pretium fusce id velit ut. Massa tincidunt nunc pulvinar sapien et. Libero enim sed faucibus turpis in. Tortor condimentum lacinia quis vel eros. At augue eget arcu dictum varius duis.',
};
