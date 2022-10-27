import React from 'react';
import { styled, Flex } from 'cadence-design-system';

export const DocumentUpload = ({ input }) => {
	return (
		<DocumentWrapper>
			<p>This is a document upload component.</p>
		</DocumentWrapper>
	);
};

const DocumentWrapper = styled(Flex, {
	gridColumn: '2',
});
