import React from 'react'
import classnames from 'classnames'
import s from './theme-switcher.module.css'

export interface ThemeSwitcherProps {
	theme: string
	setTheme: (theme: string) => void
	className?: string
}

const SunIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<circle cx="8" cy="8" r="3" fill="currentColor" />
		<path
			d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
	</svg>
)

const MoonIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<path
			d="M14 9.38A6.5 6.5 0 0 1 6.62 2 6.5 6.5 0 1 0 14 9.38Z"
			fill="currentColor"
		/>
	</svg>
)

const MonitorIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<rect
			x="1.5"
			y="2"
			width="13"
			height="9"
			rx="1.5"
			stroke="currentColor"
			strokeWidth="1.5"
		/>
		<path
			d="M5.5 14h5M8 11v3"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
	</svg>
)

const options = [
	{ value: 'light', label: 'Light', icon: SunIcon },
	{ value: 'dark', label: 'Dark', icon: MoonIcon },
	{ value: 'system', label: 'System', icon: MonitorIcon },
] as const

const ThemeSwitcher = ({ theme, setTheme, className }: ThemeSwitcherProps) => {
	return (
		<div
			className={classnames(s.root, className)}
			role="radiogroup"
			aria-label="Theme"
		>
			{options.map(({ value, label, icon: Icon }) => (
				<button
					key={value}
					type="button"
					role="radio"
					aria-checked={theme === value}
					aria-label={label}
					className={classnames(s.option, {
						[s.active]: theme === value,
					})}
					onClick={() => setTheme(value)}
				>
					<Icon />
					<span className={s.label}>{label}</span>
				</button>
			))}
		</div>
	)
}

export { ThemeSwitcher }
