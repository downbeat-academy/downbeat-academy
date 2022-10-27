import React from 'react';
import { Mega, H1, H2, H3, H4, H5, H6 } from './Headlines';

export default {
	title: 'Components/Typography/Headlines',
	component: Mega,
	argTypes: {
		text: 'Downbeat Academy',
		context: {
			options: ['display', 'interface'],
			control: { type: 'select' },
		},
	},
};

export const HeadlineMega = (args) => <Mega {...args}>{args.text}</Mega>;
export const Headline1 = (args) => <H1 {...args}>{args.text}</H1>;
export const Headline2 = (args) => <H2 {...args}>{args.text}</H2>;
export const Headline3 = (args) => <H3 {...args}>{args.text}</H3>;
export const Headline4 = (args) => <H4 {...args}>{args.text}</H4>;
export const Headline5 = (args) => <H5 {...args}>{args.text}</H5>;
export const Headline6 = (args) => <H6 {...args}>{args.text}</H6>;

HeadlineMega.args = {
	text: 'Mega Headline',
};

Headline1.args = {
	text: 'Headline 1',
	context: 'display',
};

Headline2.args = {
	text: 'Headline 2',
	context: 'display',
};

Headline3.args = {
	text: 'Headline 3',
	context: 'display',
};

Headline4.args = {
	text: 'Headline 4',
	context: 'display',
};

Headline5.args = {
	text: 'Headline 5',
	context: 'display',
};

Headline6.args = {
	text: 'Headline 6',
	context: 'display',
};
