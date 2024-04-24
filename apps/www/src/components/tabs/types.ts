interface TabsProps {
	children?: React.ReactNode
	defaultValue?: string
	value?: string
	onValueChange?: any
	orientation?: 'vertical' | 'horizontal'
	dir?: 'ltr' | 'rtl'
	activationMode?: 'automatic' | 'manual'
	isContained?: boolean
	className?: string
}

interface TabListProps {
	children?: React.ReactNode
	loop?: boolean
	isContained?: boolean
	className?: string
}

interface TabTriggerProps {
	children?: React.ReactNode
	value: string
	disabled?: boolean
	icon?: any
	className?: string
}

interface TabContentProps {
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

export type { TabsProps, TabListProps, TabTriggerProps, TabContentProps }
