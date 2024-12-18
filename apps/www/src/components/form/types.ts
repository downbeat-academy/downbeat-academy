// Primitives

interface HelperTextProps {
	children?: React.ReactNode
	className?: string
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	htmlFor?: string
	id?: string
	children?: React.ReactNode
	className?: string
}

interface ValidationMessageProps extends React.HTMLAttributes<HTMLSpanElement> {
	children?: string | React.ReactNode
	type?: 'success' | 'warning' | 'error'
	className?: string
}

// Form

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
	name?: string
	rel?: string
	action?: any
	method?: 'POST' | 'GET'
	spacing?: 'none' | 'small' | 'medium' | 'large'
	maxWidth?: string
	onSubmmit?: any
	children?: React.ReactNode
	className?: string
}

// Form Field

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
	orientation?: 'vertical' | 'horizontal'
	children?: React.ReactNode
	className?: string
}

// Input

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	type?: 'text' | 'email' | 'number' | 'tel' | 'url' | 'password'
	name?: string
	placeholder?: string
	disabled?: boolean
	readonly?: boolean
	required?: boolean
	value?: string
	id?: string
	isInvalid?: boolean
	className?: string
	// Specific properties for react-hook-form
	register?: any
	validationSchema?: any
}

// Textarea

interface TextareaProps {
	name?: string
	placeholder?: string
	disabled?: boolean
	readonly?: boolean
	required?: boolean
	value?: string
	id?: string
	rows?: number
	className?: string
	// Specific properties for react-hook-form
	register?: any
	validationSchema?: any
}

export type {
	FormProps,
	FormFieldProps,
	InputProps,
	HelperTextProps,
	LabelProps,
	TextareaProps,
	ValidationMessageProps,
}
