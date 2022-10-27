import React from 'react';
import Link from 'next/link';
import { linkResolver } from '@utils/linkResolver';
import { styled, Badge } from 'cadence-design-system';

export const CategoryLink = ({ slug, text }) => {
	return (
		<Link href={linkResolver('category', slug)} passHref>
			{/*@ts-ignore */}
			<BadgeLink as="a" type="neutral" style="outline" size="small">
				{text}
			</BadgeLink>
		</Link>
	);
};

const BadgeLink = styled(Badge, {
	'&:hover': {
		cursor: 'pointer',
	},
});
