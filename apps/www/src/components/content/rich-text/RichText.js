import React from 'react';
import { PortableText } from '@portabletext/react';
import { GridWrapper, GridInner } from '@components/layout';
import { Components } from './Components';

export const RichText = ({ value }) => {
	return (
		<GridWrapper>
			<PortableText
				value={value}
				components={Components}
				className="rich-text"
			/>
		</GridWrapper>
	);
};
