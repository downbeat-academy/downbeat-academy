interface ButtonSetProps {
	children: React.ReactNode;
	className?: string;
	direction?: 'row' | 'column';
	justify?: 'start' | 'end' | 'space-between';
	gap?: 'none' | 'x-small' | 'small' | 'default' | 'large';
}

export type { ButtonSetProps };
