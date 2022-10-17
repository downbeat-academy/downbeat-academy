import { styled } from '../../stitches.config';

export const Mega = styled('h1', {
	color: '$textPrimary',
	fontFamily: '$displayHeadline',
	fontSize: '$displayMega',
	margin: '0',
	textDecoration: 'none',
});

export const H1 = styled('h1', {
	color: '$textPrimary',
	margin: '0',
	textDecoration: 'none',
	variants: {
		context: {
			display: {
				lineHeight: '$displayHeadline',
				fontFamily: '$displayHeadline',
				fontSize: '$displayH1',
			},
			interface: {
				fontFamily: '$interfaceHeadline',
				fontSize: '$interfaceH1',
				lineHeight: '$interfaceHeadline',
			},
		},
	},
	defaultVariants: {
		context: 'display',
	},
});

export const H2 = styled('h2', {
	color: '$textPrimary',
	margin: '0',
	textDecoration: 'none',
	variants: {
		context: {
			display: {
				fontFamily: '$displayHeadline',
				fontSize: '$displayH2',
				lineHeight: '$displayHeadline',
			},
			interface: {
				fontFamily: '$interfaceHeadline',
				fontSize: '$interfaceH2',
				lineHeight: '$interfaceHeadline',
			},
		},
	},
	defaultVariants: {
		context: 'display',
	},
});

export const H3 = styled('h3', {
	color: '$textPrimary',
	margin: '0',
	textDecoration: 'none',
	variants: {
		context: {
			display: {
				fontFamily: '$displayHeadline',
				fontSize: '$displayH3',
				lineHeight: '$displayHeadline',
			},
			interface: {
				fontFamily: '$interfaceHeadline',
				fontSize: '$interfaceH3',
				lineHeight: '$interfaceHeadline',
			},
		},
	},
	defaultVariants: {
		context: 'display',
	},
});

export const H4 = styled('h4', {
	color: '$textPrimary',
	margin: '0',
	textDecoration: 'none',
	variants: {
		context: {
			display: {
				fontFamily: '$displayHeadline',
				fontSize: '$displayH4',
				lineHeight: '$displayHeadline',
			},
			interface: {
				fontFamily: '$interfaceHeadline',
				fontSize: '$interfaceH4',
				lineHeight: '$interfaceHeadline',
			},
		},
	},
	defaultVariants: {
		context: 'display',
	},
});

export const H5 = styled('h5', {
	color: '$textPrimary',
	margin: '0',
	textDecoration: 'none',
	variants: {
		context: {
			display: {
				fontFamily: '$displayHeadline',
				fontSize: '$displayH5',
				lineHeight: '$displayHeadline',
			},
			interface: {
				fontFamily: '$interfaceHeadline',
				fontSize: '$interfaceH5',
				lineHeight: '$interfaceHeadline',
			},
		},
	},
	defaultVariants: {
		context: 'display',
	},
});

export const H6 = styled('h6', {
	color: '$textPrimary',
	margin: '0',
	textDecoration: 'none',
	variants: {
		context: {
			display: {
				fontFamily: '$displayHeadline',
				fontSize: '$displayH6',
				lineHeight: '$displayHeadline',
			},
			interface: {
				fontFamily: '$interfaceHeadline',
				fontSize: '$interfaceH6',
				lineHeight: '$interfaceHeadline',
			},
		},
	},
	defaultVariants: {
		context: 'display',
	},
});
