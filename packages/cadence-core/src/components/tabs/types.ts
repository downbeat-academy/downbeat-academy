import React from 'react'

interface TabsProps {
	children?: React.ReactNode
	defaultValue?: string
	value?: string
	onValueChange?: (value: string) => void
	orientation?: 'vertical' | 'horizontal'
	dir?: 'ltr' | 'rtl'
	activationMode?: 'automatic' | 'manual'
	className?: string
}

interface TabsListProps {
	children?: React.ReactNode
	loop?: boolean
	isContained?: boolean
	className?: string
}

interface TabsTriggerProps {
	children?: React.ReactNode
	value: string
	disabled?: boolean
	icon?: React.ReactElement
	className?: string
	'data-testid'?: string
}

interface TabsContentProps {
	children?: React.ReactNode
	value: string
	forceMount?: boolean
	padding?:
	| 'none'
	| 'x-small'
	| 'small'
	| 'medium'
	| 'large'
	| 'x-large'
	| '2x-large'
	| '3x-large'
	background?:
	| 'primary'
	| 'faint'
	| 'high-contrast'
	| 'brand'
	| 'interactive'
	| 'success'
	| 'warning'
	| 'critical'
	className?: string
}

export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps }
