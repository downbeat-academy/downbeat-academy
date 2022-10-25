import { styled } from 'cadence-design-system';

export const Toggle = ({ handleNavToggle }) => {
	return <StyledToggle onClick={handleNavToggle}>Menu</StyledToggle>;
};

const StyledToggle = styled('button', {
	fontFamily: '$interfaceBody',
	color: '$passionFruit600',
	textDecoration: 'underline',
	textDecorationThickness: '0.125rem',
	textUnderlineOffset: '4px',
	background: 'none',
	border: 'none',

	'&:hover': {
		cursor: 'pointer',
	},

	'@media (min-width: 900px)': {
		display: 'none',
	},

	'@media (max-width: 899px)': {
		display: 'block',
	},
});
