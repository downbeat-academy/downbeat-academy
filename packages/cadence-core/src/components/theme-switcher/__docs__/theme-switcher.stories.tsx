import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSwitcher } from '../index';

const meta: Meta<typeof ThemeSwitcher> = {
	title: 'Cadence / Components / ThemeSwitcher',
	component: ThemeSwitcher,
};

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = {
	render: () => {
		const [theme, setTheme] = useState('light');
		return <ThemeSwitcher theme={theme} setTheme={setTheme} />;
	},
};

export const DarkSelected: Story = {
	render: () => {
		const [theme, setTheme] = useState('dark');
		return <ThemeSwitcher theme={theme} setTheme={setTheme} />;
	},
};

export const SystemSelected: Story = {
	render: () => {
		const [theme, setTheme] = useState('system');
		return <ThemeSwitcher theme={theme} setTheme={setTheme} />;
	},
};
